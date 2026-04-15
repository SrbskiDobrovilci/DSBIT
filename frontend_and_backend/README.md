# SALO.COM — Анализатор бизнеса

## Структура проекта

```
salo-project/
├── backend/
│   ├── server.js       ← Express API (порт 3001)
│   └── package.json
└── frontend/
    └── index.html      ← Фронтенд (два экрана)
```

---

## Запуск

### 1. Бэкенд

```bash
cd backend
npm install
npm start
# Сервер запустится на http://localhost:3001
```

Для разработки с авто-перезапуском:
```bash
npm run dev
```

### 2. Фронтенд

Просто откройте `frontend/index.html` в браузере.  
Или через любой статический сервер (например):

```bash
cd frontend
npx serve .
# или
python3 -m http.server 8080
```

---

## API

### POST `/api/analyze`

**Request body:**
```json
{
  "name": "Пицца-ник",
  "specialization": "Пицца",
  "hours": 40
}
```

**Response:**
```json
{
  "score": 4,
  "comment": "«Пицца-ник» показывает хорошие результаты!..."
}
```

**Ошибки:**
```json
{ "error": "Заполните все поля." }
```

---

