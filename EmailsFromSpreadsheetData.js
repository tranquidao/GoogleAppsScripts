function emailFromSpreadsheet() {

  // Set up the email to be sent later
  // The actual body text of the email, in which you can use HTML
  var emailText = "<p>FILLINTEXTOFEMAIL</p>";

  // The email subject
  var emailSubject = "FILLINEMAILSUBJECTTEXT";

  // Get the contents of the spreadshet
  var ss = SpreadsheetApp.openById('FILLINSPREADSHEETIDHERE');
  var ss_sheet = ss.getSheetByName('FILLINSPREADSHEETNAMEHERE');
  var range = ss_sheet.getDataRange();
  var values = range.getValues();
  
  // Loop through rows, but skip the first (0) row, which is the header row
  for (i = 1; i < values.length; i++) {
    // Set the first column to be the email recipient
    var emailRecipient = values[i][0];
    
    // Append the second and third columns to be part of the email text
    emailText += values[i][1] + '<br />' + values[i][2];
    
    // Send the email
    GmailApp.sendEmail(emailRecipient, emailSubject, emailText, {htmlBody: emailText, name: "FILLINHOWYOUWANTYOURSENDERNAMETOAPPEAR"});
    
  }
   
}

function getHiddenAndFilteredRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var d = 0; d < data.length; d++) {
    // Row Index starts from 1
    if (sheet.isRowHiddenByFilter(d + 1)) {
      Logger.log('Row #' + d + ' is filtered - value: ' + data[d][0]);
      continue;
    }
    // Row Index starts from 1
    if (sheet.isRowHiddenByUser(d + 1)) {
      Logger.log('Row #' + d + ' is hidden - value: ' + data[d][0]);
      continue;
    }
    // processRow(d)
  }
}
