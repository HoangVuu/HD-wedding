import { NextResponse } from "next/server";
import {
  appendSheetRow,
  isGoogleSheetsConfigured,
} from "@/lib/googleSheets";

export const runtime = "nodejs";

const SHEET_ID = process.env.GOOGLE_SHEETS_RSVP_ID;
const SHEET_RANGE = process.env.GOOGLE_SHEETS_RSVP_RANGE ?? "RSVP!A:C";

export async function POST(request: Request) {
  try {
    const { name, joinAt } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(joinAt) || joinAt.length === 0) {
      return NextResponse.json(
        { error: "At least one party must be selected" },
        { status: 400 }
      );
    }

    if (SHEET_ID && isGoogleSheetsConfigured()) {
      await appendSheetRow(SHEET_ID, SHEET_RANGE, [
        name.trim(),
        joinAt.join(", "),
        new Date().toISOString(),
      ]);
    } else {
      console.warn("Google Sheets is not configured. RSVP not persisted.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/rsvp error", error);
    return NextResponse.json(
      { error: "Unable to save RSVP" },
      { status: 500 }
    );
  }
}

