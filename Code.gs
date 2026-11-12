const SHEET_ID = 'HIER_GOOGLE_SHEET_ID_EINTRAGEN';
const TAB = 'Antworten';
const FIELDS = ['printRead','printValue','frequency','length','topics'];
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const a = data.answers || {};
    if (FIELDS.some(k => !a[k])) throw new Error('Unvollständige Antwort');
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(TAB);
    if (!sheet) {
      sheet = ss.insertSheet(TAB);
      sheet.appendRow(['Zeitpunkt',...FIELDS]);
    }
    sheet.appendRow([new Date(),...FIELDS.map(k => {
      const v = Array.isArray(a[k]) ? a[k].join(' | ') : String(a[k]);
      return /^[=+@-]/.test(v) ? "'" + v : v;
    })]);
    return ContentService.createTextOutput('OK');
  } finally { lock.releaseLock(); }
}