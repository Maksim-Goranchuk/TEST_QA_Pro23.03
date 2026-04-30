function syncSlowAndSteady() {
  const TOKEN = 'ol_api_KkZN5akcMlbJS3tAGMg0t9EhO5Ck2nHI3kkkmr'; 
  const DRIVE_ID = '1_8SBbYKSsAK4eE2h4mtmgys9M27m_3jz';
  const API_URL = 'https://outline.wandry.com.ua/api/';
  const IDS = ['Q3mwqFKlvX', 'LXZC08T1DC', 'lAvK728mKN', 'iStqy4AfCT', 'Rv7oKt5PlC', 'keQo8BfPNq', 'jORP2gMSgk', 'WUrR4O4Xm4'];

  const headers = { 'Authorization': 'Bearer ' + TOKEN.trim(), 'Content-Type': 'application/json' };
  
  try {
    // Проверка доступа к папке
    const root = DriveApp.getFolderById(DRIVE_ID);
    Logger.log('Связь с Google Диском установлена.');

    IDS.forEach(id => {
      Utilities.sleep(5000); // Пауза между папками.
      try {
        const res = UrlFetchApp.fetch(API_URL + 'documents.info', {
          method: 'post', headers: headers, payload: JSON.stringify({id: id}), muteHttpExceptions: true
        });
        console.log(res.getContent)
        return true

        if (res.getResponseCode() === 200) {
          const p = JSON.parse(res.getContentText()).data;
          Logger.log('Папка: ' + p.title);
          
          let f = root.getFoldersByName(p.title).hasNext() ? root.getFoldersByName(p.title).next() : root.createFolder(p.title);
          
          const listRes = UrlFetchApp.fetch(API_URL + 'documents.list', {
            method: 'post', headers: headers, payload: JSON.stringify({parentDocumentId: p.id})
          });
          
          const docs = JSON.parse(listRes.getContentText()).data;
          docs.forEach(d => {
            Utilities.sleep(3000); // Пауза между файлами
            const dInfo = UrlFetchApp.fetch(API_URL + 'documents.info', {
              method: 'post', headers: headers, payload: JSON.stringify({id: d.id})
            });
            const full = JSON.parse(dInfo.getContentText()).data;
            const name = full.title.replace(/[\\/:*?"<>|]/g, '-') + '.md';
            
            const fIt = f.getFilesByName(name);
            if (fIt.hasNext()) {
              fIt.next().setContent(full.text);
              Logger.log('  Обновлен: ' + name);
            } else {
              f.createFile(name, full.text);
              Logger.log('  Создан: ' + name);
            }
          });
        } else {
          Logger.log('Ошибка сервера ' + res.getResponseCode() + ' для ID ' + id);
        }
      } catch (e) {
        Logger.log('Ошибка при обработке папки ' + id + ': ' + e.message);
      }
    });
  } catch (err) {
    Logger.log('Ошибка доступа к Диску: ' + err.message + '. Попробуйте запустить через 15 минут.');
  }
}
