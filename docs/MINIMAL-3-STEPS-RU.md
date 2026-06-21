# Минимум действий — только 3 шага (~10 минут)

Я уже сделал за тебя:
- ✅ `.env.local` с ключами Supabase
- ✅ `supabase/SETUP.sql` — один файл, безопасно запускать повторно
- ✅ `vercel-env.txt` — готовые значения для Vercel
- ✅ `npm run verify:setup` — проверка подключения

**Я не могу без твоего входа:** зайти в Supabase Dashboard, Vercel Dashboard, создать admin user.

---

## ШАГ 1 — SQL (2 минуты)

1. Открой: https://supabase.com/dashboard/project/epldjzqnwozqqlqgnwuu/sql/new
2. Открой файл **`supabase/SETUP.sql`** в проекте
3. Ctrl+A → Ctrl+C → вставь в SQL Editor → **Run**

Должно быть **Success**.

Проверка локально:
```bash
npm run verify:setup
```

---

## ШАГ 2 — Admin user (1 минута)

1. Открой: https://supabase.com/dashboard/project/epldjzqnwozqqlqgnwuu/auth/users
2. **Add user** → email + пароль
3. **Auto Confirm User** ✅ → Create

Запиши email и пароль — для входа в админку.

---

## ШАГ 3 — Vercel env + Redirect URLs (5 минут)

### 3a. Vercel Environment Variables

1. https://vercel.com/dashboard → проект **Global-Nexus**
2. **Settings** → **Environment Variables**
3. Скопируй из файла **`vercel-env.txt`** (2 переменные)
4. **Deployments** → **Redeploy**

### 3b. Supabase Redirect URLs

1. https://supabase.com/dashboard/project/epldjzqnwozqqlqgnwuu/auth/url-configuration
2. **Site URL:**
   ```
   https://global-nexus-gr6wc7oyy-osmonkulov-osmonalis-projects.vercel.app
   ```
3. **Redirect URLs** (две строки):
   ```
   https://global-nexus-gr6wc7oyy-osmonkulov-osmonalis-projects.vercel.app/**
   https://*.vercel.app/**
   ```
4. **Save**

---

## Готово — проверь

| URL | Ожидание |
|-----|----------|
| https://global-nexus-gr6wc7oyy-osmonkulov-osmonalis-projects.vercel.app | Счётчик ~24/1000 |
| .../admin-panel/login | Вход с email/password из шага 2 |

---

## Если хочешь, чтобы AI делал больше сам

**Cursor → Settings → Tools & MCP → Supabase → Connect**

После OAuth напиши: «MCP подключён» — смогу проверять БД и SQL без ручного Editor.
