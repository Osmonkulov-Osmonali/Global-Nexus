#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

step() { echo -e "\n${BLUE}==>${NC} $1"; }
ok() { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}!${NC} $1"; }

step "Global Nexus — Supabase setup"
echo ""
echo "This script helps connect your project to Supabase."
echo "You will need a free account at https://supabase.com"
echo ""

# 1. .env.local
if [[ ! -f .env.local ]]; then
  step "Creating .env.local from template"
  cp .env.example .env.local
  ok "Created .env.local — fill in your Supabase URL and key"
else
  ok ".env.local already exists"
fi

# 2. Check env vars
source_env() {
  if [[ -f .env.local ]]; then
    set -a
    # shellcheck disable=SC1091
    source .env.local 2>/dev/null || true
    set +a
  fi
}
source_env

if [[ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" || "${NEXT_PUBLIC_SUPABASE_URL}" == *"your-project"* ]]; then
  warn "NEXT_PUBLIC_SUPABASE_URL is not set in .env.local"
  echo ""
  echo "  1. Open https://supabase.com/dashboard"
  echo "  2. Create a project (or open existing)"
  echo "  3. Go to Settings → API Keys"
  echo "  4. Copy Project URL and Publishable key into .env.local"
  echo ""
  read -r -p "Press Enter when .env.local is filled in..."
  source_env
fi

# 3. Supabase CLI login
step "Supabase CLI login"
warn "A browser window will open — sign in to your Supabase account"
npx supabase login

# 4. Link project
step "Link to Supabase project"
echo "Find your Project Ref in Dashboard → Settings → General"
echo "(the short ID in your project URL, e.g. abcdefghijklmnop)"
echo ""
read -r -p "Enter your Project Ref: " PROJECT_REF

if [[ -n "$PROJECT_REF" ]]; then
  npx supabase link --project-ref "$PROJECT_REF"
  ok "Project linked"
fi

# 5. Push migration
step "Applying database migration"
npx supabase db push
ok "Migration applied (speakers + speaker_applications + RLS + seed data)"

# 6. Admin user reminder
step "Create admin user (manual step in Dashboard)"
echo ""
echo "  1. Open Supabase Dashboard → Authentication → Users"
echo "  2. Click 'Add user' → 'Create new user'"
echo "  3. Enter email + password"
echo "  4. Enable 'Auto Confirm User'"
echo "  5. Use these credentials at http://localhost:3000/admin-panel/login"
echo ""

# 7. Start dev server
step "Done!"
ok "Run: npm run dev"
ok "Site:  http://localhost:3000"
ok "Admin: http://localhost:3000/admin-panel/login"
