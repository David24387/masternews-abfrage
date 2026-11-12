const SHEET_ID = '1NDy1mHE-kKjM8f2R-UiFbIrSO9jqeBa7XTLxS7M104A';
const TAB = 'Antworten';
const FIELDS = ['need','frequency','value','channels','channelsOther','comment'];
const HEADERS = ['Zeitpunkt','Digitale Masternews benötigt','Gewünschter Rhythmus','Mehrwert','Informationswege','Anderer Informationsweg','Wünsche'];
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const a = data.answers || {};
    const allowedNeed = ['Ja, auf jeden Fall','Ja, aber nur für ausgewählte Themen','Nein, MasterNet reicht mir vollkommen','Ich bin mir noch unsicher'];
    if (!allowedNeed.includes(a.need)) throw new Error('Ungültige Grundsatzantwort');
    if (allowedNeed.slice(0,2).includes(a.need) && !['Monatlich','Alle zwei Monate','Vierteljährlich','Halbjährlich'].includes(a.frequency)) throw new Error('Rhythmus fehlt');
    if (!Array.isArray(a.value) || !a.value.length || !Array.isArray(a.channels) || !a.channels.length) throw new Error('Unvollständige Antwort');
    if (a.value.includes('Keinen zusätzlichen Mehrwert') && a.value.length > 1) throw new Error('Widersprüchliche Mehrwertantwort');
    if (a.channels.includes('Auf anderem Weg') && !String(a.channelsOther || '').trim()) throw new Error('Anderer Informationsweg muss erläutert werden');
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(TAB);
    if (!sheet) sheet = ss.insertSheet(TAB);
    // Alte Umfrageantworten nicht unter neue Spaltenüberschriften schreiben.
    if (sheet.getLastRow() && sheet.getRange(1,1,1,HEADERS.length).getValues()[0].join('|') !== HEADERS.join('|')) {
      sheet = ss.getSheetByName('Antworten_Digital_2026') || ss.insertSheet('Antworten_Digital_2026');
    }
    if (!sheet.getLastRow()) sheet.appendRow(HEADERS);
    const clean = v => {
      const s = Array.isArray(v) ? v.join(' | ') : String(v == null ? '' : v);
      return /^[\\s]*[=+@-]/.test(s) ? "'" + s : s;
    };
    sheet.appendRow([new Date(),...FIELDS.map(k => clean(k === 'frequency' && !allowedNeed.slice(0,2).includes(a.need) ? '' : a[k]))]);
    return ContentService.createTextOutput('OK');
  } finally { lock.releaseLock(); }
}