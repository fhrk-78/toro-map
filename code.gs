function doGet(e) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    var sheets = spreadsheet.getSheets()
    var data = {}

    for (var i = 0; i < sheets.length; i++) {
        var sheetName = sheets[i].getName()
        data[sheetName] = sheets[i].getDataRange().getValues()
    }

    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}
