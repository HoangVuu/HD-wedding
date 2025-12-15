import { NextResponse } from "next/server";
import {
  appendSheetRow,
  getSheetRows,
  isGoogleSheetsConfigured,
} from "@/lib/googleSheets";

export const runtime = "nodejs";

const SHEET_ID = process.env.GOOGLE_SHEETS_CONGRATS_ID;
const SHEET_RANGE =
  process.env.GOOGLE_SHEETS_CONGRATS_RANGE ?? "Blessings!A:C";
const SHEETS_WEBHOOK_URL =
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_SHEETDB_URL ||
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ||
  "https://sheetdb.io/api/v1/c6eefggtbyk8s";

const fallbackMessages = [
  {
    name: "Henry",
    message: "Chúc hai bạn sống trong ngọt ngào và bình yên mãi mãi!",
    timestamp: new Date().toISOString(),
  },
  {
    name: "Team NYC",
    message:
      "Ngày vui đang đếm ngược, tụi mình luôn ở đây cổ vũ Quốc Hoàng & Ngọc Đăng.",
    timestamp: new Date().toISOString(),
  },
];

async function readMessagesFromSheet() {
  const webhookMessages = await fetchMessagesFromWebhook();
  if (webhookMessages.length) {
    return webhookMessages;
  }

  if (!SHEET_ID || !isGoogleSheetsConfigured()) {
    return fallbackMessages;
  }
  const rows = await getSheetRows(SHEET_ID, SHEET_RANGE);
  return rows
    .map((row) => ({
      name: (row[0] as string) || "Bạn ẩn danh",
      message: (row[1] as string) || "",
      timestamp: row[2] as string | undefined,
    }))
    .filter((item) => item.message);
}

async function fetchMessagesFromWebhook() {
  if (!SHEETS_WEBHOOK_URL) return [];
  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }
    const payload = await response.json();
    const raw =
      (Array.isArray(payload)
        ? payload
        : Array.isArray(payload.data)
        ? payload.data
        : Array.isArray(payload.messages)
        ? payload.messages
        : []) || [];

    return raw
      .map((entry: unknown) => {
        if (Array.isArray(entry)) {
          const [name, attend, message, timestamp] = entry;
          return {
            name: (name as string) || "Bạn ẩn danh",
            message: [attend, message].filter(Boolean).join(" · "),
            timestamp: timestamp as string | undefined,
          };
        }
        if (typeof entry === "object" && entry !== null) {
          const obj = entry as Record<string, unknown>;
          const name =
            (obj.name as string) ||
            (obj.Name as string) ||
            (obj.attendee as string) ||
            "Bạn ẩn danh";
          const message =
            (obj.message as string) ||
            (obj.Message as string) ||
            (obj.note as string) ||
            "";
          const attend = (obj.attend as string) || (obj.Attend as string) || "";
          const timestamp =
            (obj.timestamp as string) ||
            (obj.Date as string) ||
            (obj.date as string) ||
            undefined;
          return {
            name: name.trim() || "Bạn ẩn danh",
            message: [attend, message].filter(Boolean).join(" · "),
            timestamp,
          };
        }
        return null;
      })
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any): item is { name: string; message: string; timestamp?: string } =>
          !!item && !!item.message
      );
  } catch (error) {
    console.warn("Failed to fetch messages from webhook", error);
    return [];
  }
}

export async function GET() {
  try {
    const messages = await readMessagesFromSheet();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/messages error", error);
    return NextResponse.json(
      { messages: fallbackMessages, error: "Failed to load messages" },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const safeName =
      typeof name === "string" && name.trim().length > 0
        ? name.trim()
        : "Bạn ẩn danh";
    const safeMessage = message.trim();

    if (SHEET_ID && isGoogleSheetsConfigured()) {
      await appendSheetRow(SHEET_ID, SHEET_RANGE, [
        safeName,
        safeMessage,
        new Date().toISOString(),
      ]);
    } else {
      console.warn("Google Sheets is not configured. Message not persisted.");
    }

    if (SHEETS_WEBHOOK_URL) {
      fetch(SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              Name: safeName,
              Message: safeMessage,
              Attend: "",
              Date: new Date().toISOString(),
            },
          ],
        }),
      }).catch((error) => {
        console.warn("SheetDB message sync failed:", error);
      });
    }

    const messages = await readMessagesFromSheet();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("POST /api/messages error", error);
    return NextResponse.json(
      { error: "Unable to send blessing" },
      { status: 500 }
    );
  }
}

