function syncOutlineRecursive() {
  const TOKEN = 'ol_api_oRvaQBBCqsKtzCkP2jTT5Zi87LZ2OE7LF6ribV'; 
  const DRIVE_ID = '1_8SBbYKSsAK4eE2h4mtmgys9M27m_3jz';
  const API_URL = 'https://outline.wandry.com.ua/api/';
  
  // Корневые папки, с которых начинаем поиск
  const START_IDS = ['Q3mwqFKlvX', 'LXZC08T1DC', 'lAvK728mKN', 'iStqy4AfCT', 'Rv7oKt5PlC', 'keQo8BfPNq', 'jORP2gMSgk', 'WUrR4O4Xm4'];

  const headers = { 'Authorization': 'Bearer ' + TOKEN.trim(), 'Content-Type': 'application/json' };
  const rootDriveFolder = DriveApp.getFolderById(DRIVE_ID);

  // Функция для запросов к API
  function callApi(method, payload) {
    Utilities.sleep(2000); // Защита от блокировок
    const res = UrlFetchApp.fetch(API_URL + method, {
      method: 'post', headers: headers, payload: JSON.stringify(payload), muteHttpExceptions: true
    });
    return res.getResponseCode() === 200 ? JSON.parse(res.getContentText()).data : null;
  }

  // РЕКУРСИВНАЯ ФУНКЦИЯ
  function processFolder(outlineId, currentDriveFolder) {
    const info = callApi('documents.info', { id: outlineId });
    if (!info) return;

    Logger.log('Захожу в папку: ' + info.title);

    // 1. Создаем/находим папку на Диске
    let targetFolder;
    const it = currentDriveFolder.getFoldersByName(info.title);
    targetFolder = it.hasNext() ? it.next() : currentDriveFolder.createFolder(info.title);

    // 2. Получаем ВСЕ вложенные объекты (и файлы, и подпапки)
    const children = callApi('documents.list', { parentDocumentId: info.id }) || [];

    children.forEach(item => {
      // Проверяем, есть ли у этого документа свои вложенные документы
      // В API Outline подпапка — это тоже документ, у которого есть дети
      const subDocs = callApi('documents.list', { parentDocumentId: item.id }) || [];

      if (subDocs.length > 0) {
        // Если есть вложенность — запускаем функцию заново для этой подпапки
        processFolder(item.id, targetFolder);
      } else {
        // Если это просто файл — качаем его текст
        const fullDoc = callApi('documents.info', { id: item.id });
        if (fullDoc && fullDoc.text) {
          const fileName = fullDoc.title.replace(/[\\/:*?"<>|]/g, '-') + '.txt'; // Теперь .txt
          
          const fileIt = targetFolder.getFilesByName(fileName);
          if (fileIt.hasNext()) {
            fileIt.next().setContent(fullDoc.text);
            Logger.log('  Обновлен текст: ' + fileName);
          } else {
            targetFolder.createFile(fileName, fullDoc.text, MimeType.PLAIN_TEXT);
            Logger.log('  Создан текст: ' + fileName);
          }
        }
      }
    });
  }

  // Запуск процесса для каждой начальной папки
  START_IDS.forEach(id => {
    try {
      processFolder(id, rootDriveFolder);
    } catch (e) {
      Logger.log('Ошибка на ID ' + id + ': ' + e.message);
    }
  });

  Logger.log('Глубокая синхронизация завершена!');
}
