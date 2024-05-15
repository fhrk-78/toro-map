function doGet(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();
  var data = {};

  for (var i = 0; i < sheets.length; i++) {
    var sheetName = sheets[i].getName();
    data[sheetName] = sheets[i].getDataRange().getValues();
  }
  
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  var postData = JSON.parse(e.postData.contents);

  var sheetName = postData.target;
  var data = postData.data;

  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  sheet.appendRow(data);

  return ContentService.createTextOutput(JSON.stringify({status: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
