# Outline → Google Docs

Этот проект содержит чистый Node.js скрипт, который получает документы из Outline и сохраняет их в Google Docs.

## Структура проекта
- `outline-to-gdocs.js` — основная логика
- `package.json` — зависимости и скрипты
- `credentials.json` — Google OAuth / service account credentials (не храните в git)
- `token.json` — OAuth токен после первой авторизации
- `.gitignore` — исключает `node_modules`, `credentials.json` и `token.json`

## Установка

```powershell
cd C:\Test\TEST_QA_Pro23.03\WANDRY\MAKS_QA
npm install
```

## Настройки

1. Создайте Google Cloud проект
2. Включите API:
   - Google Drive API
   - Google Docs API
3. Создайте OAuth client или service account и скачайте `credentials.json`
4. Сохраните `credentials.json` в папке `WANDRY/MAKS_QA`

## Переменные окружения

Установите значения перед запуском:

- `OUTLINE_TOKEN` — ваш Outline API токен
- `DRIVE_FOLDER_ID` — ID Google Drive папки, куда сохранять документы
- `OUTLINE_IDS` — через запятую список ID документов Outline
- либо `OUTLINE_PARENT_ID` — ID родительского Outline документа

### Пример PowerShell

```powershell
$env:OUTLINE_TOKEN = 'ol_api_xxx'
$env:DRIVE_FOLDER_ID = '1abc...'
$env:OUTLINE_IDS = 'Q3mwqFKlvX,LXZC08T1DC'
node outline-to-gdocs.js
```

## Запуск

```powershell
npm start
```

Если вы хотите, можно также запустить напрямую:

```powershell
node outline-to-gdocs.js
```

Если используется OAuth и `token.json` отсутствует, скрипт запросит авторизацию и сохранит токен.

## Примечания

- Если вы используете `service_account`, поделитесь целевой папкой с email этого аккаунта.
- Если документ с таким названием уже существует, он будет обновлён.
- Вставляется только текст, без форматирования Markdown.
