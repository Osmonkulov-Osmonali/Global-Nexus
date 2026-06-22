# Настройка Global Nexus + Supabase

## Что я могу сделать сам (уже сделано в коде)

- Интеграция Supabase в Next.js
- SQL-миграция с таблицами, RLS и 24 демо-спикерами
- Auth для `/admin-panel`
- Сохранение заявок спикеров
- Supabase CLI в проекте (`npm run setup:supabase`)
- MCP-конфиг для Cursor (`.mcp.json`)

## Что я **не могу** сделать без тебя

Supabase — это **твой** облачный аккаунт. Без входа в него никто (включая AI) не может:

- создать проект в твоём Dashboard
- получить API-ключи
- создать admin-пользователя

Это занимает **~5 минут** и делается один раз.

---

## Вариант A — самый простой (рекомендую)

### Шаг 1. Установи зависимости

```bash
npm install
```

### Шаг 2. Запусти скрипт настройки

```bash
npm run setup:supabase
```

Скрипт проведёт через:

1. Создание `.env.local`
2. Вход в Supabase через браузер (`supabase login`)
3. Привязку проекта (`supabase link`)
4. Применение миграции (`supabase db push`)

### Шаг 3. Создай admin-пользователя

В [Supabase Dashboard](https://supabase.com/dashboard) → **Authentication** → **Users** → **Add user**:

- Email: `admin@твой-домен.com`
- Password: надёжный пароль
- **Auto Confirm User**: ✅

### Шаг 4. Запусти сайт

```bash
npm run dev
```

- Главная: http://localhost:3000
- Админка: http://localhost:3000/admin-panel/login

---

## Вариант B — через Cursor + Supabase Plugin (для AI-помощи)

Если хочешь, чтобы AI в Cursor мог **сам** работать с твоей базой:

### 1. Убедись, что Supabase Plugin установлен

**Cursor Settings** → **Plugins** → найди **Supabase** → включи

### 2. Авторизуй MCP-сервер

**Cursor Settings** → **Tools & MCP** → **Supabase** → **Connect / Authenticate**

Откроется браузер — войди в Supabase. После этого AI сможет:

- выполнять SQL
- смотреть таблицы
- искать документацию

### 3. Напиши мне в чат

> «Supabase MCP подключён, project ref: XXXXX»

И я смогу сам применить миграцию и проверить базу.

---

## Вариант C — полностью вручную (без CLI)

### 1. Создай проект

https://supabase.com/dashboard → **New project**

### 2. Скопируй ключи

**Settings** → **API Keys** → в `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXX.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_XXXX
```

### 3. Выполни SQL

**SQL Editor** → вставь содержимое файла:

```
supabase/migrations/20250609000000_initial_schema.sql
```

→ **Run**

### 4. Создай admin-пользователя

**Authentication** → **Users** → **Add user** (с Auto Confirm)

### 5. Запусти

```bash
npm run dev
```

---

## Проверка

| Действие | Ожидание |
|----------|----------|
| Открыть `/` | Счётчик показывает ~24/1000 (seed data) |
| Войти в `/admin-panel/login` | Редирект в админку |
| Добавить спикера | Счётчик +1, карточка на стене |
| «Become a Speaker» → отправить | Заявка в админке |

---

## Без Supabase (локальный режим)

Если `.env.local` пустой — всё работает через **localStorage**:

- админка без пароля
- данные только в браузере

Подходит для демо, но не для продакшена.

---

## Деплой на Vercel

1. Залей код на GitHub
2. Vercel → Import project
3. Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Supabase → **Authentication** → **URL Configuration**:
   - Site URL: `https://твой-домен.vercel.app`
   - Redirect URLs: `https://твой-домен.vercel.app/**`
