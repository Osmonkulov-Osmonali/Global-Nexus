# Деплой Global Nexus на Vercel

## Быстрый путь (5–10 минут)

### 1. Зайди на Vercel

https://vercel.com → **Sign Up / Log In** (удобнее через **GitHub**)

### 2. Импортируй проект

1. **Add New…** → **Project**
2. Выбери репозиторий: **Osmonkulov-Osmonali/Global-Nexus**
3. Framework: **Next.js** (определится автоматически)
4. **Не нажимай Deploy сразу** — сначала добавь переменные окружения

### 3. Environment Variables

На странице импорта нажми **Environment Variables** и добавь:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://epldjzqnwozqqlqgnwuu.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_FBn2oEzPH_82uaTHqpQSyw_DFtYX5nY` |

Для каждой переменной включи окружения: **Production**, **Preview**, **Development**.

### 4. Deploy

Нажми **Deploy** и подожди 1–3 минуты.

После деплоя получишь URL вида:

```
https://global-nexus-xxxx.vercel.app
```

---

## 5. Настрой Supabase для продакшена (обязательно для админки)

Без этого логин в `/admin-panel` на Vercel не будет работать.

1. Открой:  
   https://supabase.com/dashboard/project/epldjzqnwozqqlqgnwuu/auth/url-configuration

2. Заполни:

| Поле | Значение |
|------|----------|
| **Site URL** | `https://ТВОЙ-ДОМЕН.vercel.app` |
| **Redirect URLs** | `https://ТВОЙ-ДОМЕН.vercel.app/**` |

Пример:

```
Site URL:       https://global-nexus.vercel.app
Redirect URLs:  https://global-nexus.vercel.app/**
```

3. **Save**

---

## 6. Проверка после деплоя

| URL | Ожидание |
|-----|----------|
| `https://твой-домен.vercel.app` | Главная, счётчик ~24/1000 |
| `https://твой-домен.vercel.app/admin-panel/login` | Форма входа |
| Логин admin | Редирект в админку |

---

## Автодеплой при каждом push

Vercel делает это сам после первого импорта:

- push в `main` → **Production** деплой
- push в другую ветку → **Preview** деплой

---

## Если что-то не работает

### Сайт открывается, но данные не грузятся

- Проверь Environment Variables в Vercel → **Settings** → **Environment Variables**
- После добавления переменных: **Deployments** → последний деплой → **Redeploy**

### Ошибка при логине в админку

- Проверь **Site URL** и **Redirect URLs** в Supabase (шаг 5)
- URL должен совпадать с доменом Vercel **без** лишнего `/` в конце Site URL

### Build failed на Vercel

- Локально: `npm run build`
- Если локально OK — смотри лог деплоя в Vercel Dashboard

### Таблицы пустые / ошибки БД

- Выполни SQL-миграцию в Supabase SQL Editor  
  (файл `supabase/migrations/20250609000000_initial_schema.sql`)

---

## Свой домен (опционально)

Vercel → Project → **Settings** → **Domains** → добавь домен.

После этого обнови **Site URL** и **Redirect URLs** в Supabase на новый домен.

---

## CLI-деплой (альтернатива)

```bash
npm i -g vercel
vercel login
vercel --prod
```

При запросе env vars укажи те же `NEXT_PUBLIC_SUPABASE_*` значения.
