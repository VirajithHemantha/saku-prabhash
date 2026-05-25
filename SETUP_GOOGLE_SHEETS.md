# Google Sheets RSVP & Wishes Integration Setup

## Step 1: Add Google Apps Script to Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/17REWA48Mp72HxEqp0NWNUYz3APG64UfxAoz9QBozCZk/edit?usp=sharing

2. Click **Extensions → Apps Script**

3. Delete any existing code in the editor and paste the code from `google-apps-script.gs` file in this project

4. **Important:** Replace the SHEET_ID placeholder in the script with your actual sheet ID:
   ```javascript
   const SHEET_ID = "17REWA48Mp72HxEqp0NWNUYz3APG64UfxAoz9QBozCZk";
   ```
   (The ID is already shown above - use: `17REWA48Mp72HxEqp0NWNUYz3APG64UfxAoz9QBozCZk`)

5. Click the **Save** icon (or Ctrl+S)

## Step 2: Deploy as Web App

1. In Apps Script, click **Deploy → New Deployment**

2. Select **Type: Web app**

3. Set the following:
   - **Execute as:** Your account (the one with edit access to the sheet)
   - **Who has access:** Anyone

4. Click **Deploy**

5. Click **Authorize access** and allow the script to access your sheets

6. You'll see a deployment ID - click the copy icon next to the link to copy the deployment URL

7. The URL will look like:
   ```
   https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec
   ```

## Step 3: Update Frontend Code

In `src/App.tsx`, update the `googleScriptUrl` constant with your deployment URL:

```typescript
const googleScriptUrl = "https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec";
```

Replace `[YOUR_DEPLOYMENT_ID]` with the actual ID from your deployment.

## Step 4: Test the Integration

1. Start your dev server: `npm run dev`
2. Fill out the RSVP form - it should save to the "RSVP" sheet
3. Fill out the Wishes form - it should save to the "Wishes" sheet
4. Refresh your Google Sheet to see the data

## Sheet Structure

### RSVP Sheet
| Timestamp | Name | Guests | Dietary Notes |
|-----------|------|--------|---------------|
| 2026-06-10 09:30:45 | John Doe | 2 | Vegetarian |

### Wishes Sheet
| Timestamp | Name | Message |
|-----------|------|---------|
| 2026-06-10 09:35:20 | Jane Smith | Wishing you both happiness! |

## Troubleshooting

**Issue: "Request failed" error**
- Make sure the deployment URL is correct in App.tsx
- Check that the Apps Script is deployed as "Anyone"
- Verify the sheet ID is correct in the Apps Script

**Issue: Data not appearing in sheet**
- Check the Google Apps Script executions (Apps Script → Executions)
- Make sure you authorized the script with your account
- Check browser console for any error messages

**Issue: Sheets not auto-creating**
- If RSVP or Wishes sheets don't appear, check Apps Script logs for errors
- The script should create them automatically on first submission

## Optional: Monitor Form Submissions

You can view all Apps Script executions:
1. Open Apps Script editor
2. Click **Executions** (clock icon)
3. View all submissions and any errors

