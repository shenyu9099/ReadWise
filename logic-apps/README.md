# Logic Apps Configuration Guide

This directory contains the JSON definitions for the backend Logic Apps.

## How to Deploy

1. **Create the Logic App** in Azure Portal (Consumption Plan).
2. **Go to "Logic app code view"** in the left menu.
3. **Paste the content** of the corresponding JSON file.
4. **Save**.
5. **Fix Connections**:
   - Go to "Designer" view.
   - If you see connection errors (⚠️ symbols), click them.
   - Select "Change connection" and choose your `sql`, `cosmosdb` or `azureblob` connection created earlier.
   - Save again.

## File Mapping

### User Authentication (SQL)
- `01-register-user.json`
- `02-login-user.json`

### Journal Management (Cosmos DB)
- `03-create-journal.json`
- `04-update-journal.json`
- `05-delete-journal.json`
- `06-get-journals.json`
- `07-get-journal-by-id.json` (Returns Journal + Reviews)

### Review Management (Cosmos DB)
- `08-create-review.json`
- `09-get-user-reviews.json`
- `10-update-review.json`
- `11-delete-review.json`

### Utilities (Blob)
- `12-upload-media.json`: Generates a SAS URL that allows the frontend to upload a file directly to Blob Storage.

## Testing

Use Postman or the provided Frontend application.
Update `frontend/js/config.js` with the HTTP POST URL from the Logic App "Overview" page (Trigger History -> Callback URL).
