import { google, sheets_v4 } from "googleapis";

let sheetsClient: sheets_v4.Sheets | null = null;

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function sanitizePrivateKey(key?: string) {
  if (!key) return undefined;
  return key.replace(/\\n/g, "\n");
}

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = sanitizePrivateKey(
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
  sheetsClient = google.sheets({ version: "v4", auth });
  return sheetsClient;
}

export function isGoogleSheetsConfigured() {
  return (
    Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) &&
    Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)
  );
}

export async function appendSheetRow(
  sheetId: string,
  range: string,
  values: (string | number | null)[]
) {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}

export async function getSheetRows(sheetId: string, range: string) {
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });
  return response.data.values ?? [];
}

