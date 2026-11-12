const SHEET_ID = '1NDy1mHE-kKjM8f2R-UiFbIrSO9jqeBa7XTLxS7M104A';
const TAB = 'Antworten';
const FIELDS = ['printRead','printValue','frequency','length','topics','topicsOther'];
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const a = data.answers || {};
    if (FIELDS.slice(0,5).some(k => !a[k] || (Array.isArray(a[k]) && !a[k].length))) throw new Error('Unvollständige Antwort');
    if (Array.isArray(a.topics) && a.topics.includes('Sonstiges') && !String(a.topicsOther || '').trim()) throw new Error('Sonstiges muss erläutert werden');
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