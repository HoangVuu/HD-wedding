## Environment Variables

Create a `.env.local` file with the following keys so that Google Sheets can be used as the data store in Vercel or locally:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

GOOGLE_SHEETS_CONGRATS_ID=
GOOGLE_SHEETS_CONGRATS_RANGE=Blessings!A:C

GOOGLE_SHEETS_RSVP_ID=
GOOGLE_SHEETS_RSVP_RANGE=RSVP!A:C
```

> Replace the `...` with the actual private key content from your Google Cloud service account. Remember to escape line breaks as `\n` or wrap the entire key in quotes as shown above.

