// Google Apps Script for handling RSVP and Wishes
// Deploy as web app with "Execute as: Me" and "Who has access: Anyone"

const SHEET_ID = "17REWA48Mp72HxEqp0NWNUYz3APG64UfxAoz9QBozCZk"; // Replace with your sheet ID

function doGet(e) {
  return HtmlService.createHtmlOutput("Wedding RSVP & Wishes API - POST requests only");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    const payload = e.postData.contents;
    const params = parsePayload(payload);
    
    if (params.action === "rsvp") {
      return handleRSVP(sheet, params);
    } else if (params.action === "wish") {
      return handleWish(sheet, params);
    } else {
      return createResponse("error", "Invalid action");
    }
  } catch (error) {
    return createResponse("error", error.toString());
  }
}

function handleRSVP(sheet, params) {
  try {
    // Get or create RSVP sheet
    let rsvpSheet = sheet.getSheetByName("RSVP");
    if (!rsvpSheet) {
      rsvpSheet = sheet.insertSheet("RSVP", 0);
      initializeRSVPSheet(rsvpSheet);
    }

    // Add headers if empty
    if (rsvpSheet.getLastRow() === 0) {
      initializeRSVPSheet(rsvpSheet);
    }

    // Get next row
    const nextRow = rsvpSheet.getLastRow() + 1;
    
    // Prepare data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      params.name || "",
      params.guests || "1",
      params.dietaryNotes || "",
    ];

    // Add row to sheet
    rsvpSheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Format timestamp
    rsvpSheet.getRange(nextRow, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");

    return createResponse("success", "RSVP recorded successfully");
  } catch (error) {
    return createResponse("error", error.toString());
  }
}

function handleWish(sheet, params) {
  try {
    // Get or create Wishes sheet
    let wishSheet = sheet.getSheetByName("Wishes");
    if (!wishSheet) {
      wishSheet = sheet.insertSheet("Wishes", 1);
      initializeWishSheet(wishSheet);
    }

    // Add headers if empty
    if (wishSheet.getLastRow() === 0) {
      initializeWishSheet(wishSheet);
    }

    // Get next row
    const nextRow = wishSheet.getLastRow() + 1;
    
    // Prepare data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      params.name || "",
      params.message || "",
    ];

    // Add row to sheet
    wishSheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Format timestamp
    wishSheet.getRange(nextRow, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");

    return createResponse("success", "Wish recorded successfully");
  } catch (error) {
    return createResponse("error", error.toString());
  }
}

function initializeRSVPSheet(sheet) {
  const headers = ["Timestamp", "Name", "Guests", "Dietary Notes"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#d53f8c");
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  
  // Set column widths
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 150);
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

function initializeWishSheet(sheet) {
  const headers = ["Timestamp", "Name", "Message"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#ed64a6");
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  
  // Set column widths
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 400);
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

function parsePayload(payload) {
  const params = {};
  const pairs = payload.split("&");
  
  for (let pair of pairs) {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  
  return params;
}

function createResponse(status, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ status, message }))
    .setMimeType(ContentService.MimeType.JSON);
}
