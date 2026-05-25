# Quick Setup Checklist - Google Sheets RSVP & Wishes

## Files You Need:
- **google-apps-script.gs** - The backend script
- **src/App.tsx** - Update the `googleScriptUrl` variable
- **SETUP_GOOGLE_SHEETS.md** - Full instructions

## Quick Steps:

### 1️⃣ Deploy Google Apps Script (5 minutes)
- Open Google Sheet: https://docs.google.com/spreadsheets/d/17REWA48Mp72HxEqp0NWNUYz3APG64UfxAoz9QBozCZk/
- Click **Extensions → Apps Script**
- Paste code from `google-apps-script.gs` file
- Click **Save**
- Click **Deploy → New Deployment**
- Select **Type: Web app**
- Set: **Execute as: Your Account** | **Who has access: Anyone**
- Click **Deploy** → **Authorize** → Copy the URL

### 2️⃣ Update Frontend URL (30 seconds)
In `src/App.tsx` line ~47, replace:
```typescript
const googleScriptUrl = "https://script.google.com/macros/s/[REPLACE_WITH_YOUR_DEPLOYMENT_ID]/exec";
```

With your actual deployment URL from Step 1, e.g.:
```typescript
const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyg5F8xQ9KLpZ3m2kJ0qWrN8hVp7sT5uB2vX1Yz9/exec";
```

### 3️⃣ Test
- Run `npm run dev`
- Fill out RSVP form → should save to "RSVP" sheet
- Fill out Wishes form → should save to "Wishes" sheet
- Check Google Sheet for entries

## Deployment URL Format:
Your final URL will look like:
```
https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec
```

You can find it in Apps Script under **Deployments** → Click on the web app deployment

## Google Sheet Structure Auto-Created:

**RSVP Sheet Headers:**
- Timestamp
- Name
- Guests
- Dietary Notes

**Wishes Sheet Headers:**
- Timestamp
- Name
- Message

Both sheets will be created automatically with proper formatting on first form submission!

## Troubleshooting Quick Fixes:
| Problem | Solution |
|---------|----------|
| "Request failed" | Check deployment URL in App.tsx is correct |
| No data appearing | Check Google Sheet RSVP/Wishes tabs exist, or check Apps Script Executions for errors |
| Script won't deploy | Make sure "Execute as: Your Account" is selected |
| Data not showing | Browser might need refresh, or Google Sheet might need refresh |

## Support:
See **SETUP_GOOGLE_SHEETS.md** for detailed troubleshooting and monitoring instructions.
