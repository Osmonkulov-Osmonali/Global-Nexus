#!/usr/bin/env node
/**
 * Checks Supabase connection and setup status.
 * Run: npm run verify:setup
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_PATH = resolve(ROOT, ".env.local");

function loadEnv() {
  if (!existsSync(ENV_PATH)) return {};
  const lines = readFileSync(ENV_PATH, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

const env = { ...process.env, ...loadEnv() };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("\n🔍 Global Nexus — Setup Verification\n");

if (!url || url.includes("your-project")) {
  console.log("❌ NEXT_PUBLIC_SUPABASE_URL not configured in .env.local");
  process.exit(1);
}
if (!key || key.includes("your-publishable")) {
  console.log("❌ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY not configured in .env.local");
  process.exit(1);
}

console.log("✅ .env.local configured");
console.log(`   URL: ${url}`);

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
};

async function check() {
  try {
    const res = await fetch(`${url}/rest/v1/speakers?select=id&limit=1`, { headers });
    if (res.status === 404 || res.status === 406) {
      console.log("\n❌ Table 'speakers' not found");
      console.log("   → Run supabase/SETUP.sql in SQL Editor:");
      console.log("   https://supabase.com/dashboard/project/epldjzqnwozqqlqgnwuu/sql/new");
      return false;
    }
    if (!res.ok) {
      const text = await res.text();
      console.log(`\n❌ Supabase error (${res.status}): ${text.slice(0, 200)}`);
      return false;
    }

    const countRes = await fetch(`${url}/rest/v1/speakers?select=id`, {
      headers: { ...headers, Prefer: "count=exact" },
    });
    const count = countRes.headers.get("content-range")?.match(/\/(\d+)/)?.[1] ?? "?";

    console.log(`\n✅ Supabase connected`);
    console.log(`✅ Table 'speakers' exists (${count} rows)`);

    const appRes = await fetch(`${url}/rest/v1/speaker_applications?select=id&limit=1`, {
      headers,
    });
    if (appRes.ok) {
      console.log("✅ Table 'speaker_applications' exists");
    } else {
      console.log("❌ Table 'speaker_applications' missing — run SETUP.sql");
      return false;
    }

    console.log("\n📋 Still manual (cannot automate without your login):");
    console.log("   1. Vercel env vars → see vercel-env.txt");
    console.log("   2. Supabase admin user → Auth → Users → Add user");
    console.log("   3. Supabase redirect URLs → see docs/MINIMAL-3-STEPS-RU.md");
    console.log("\n🌐 Your site: https://global-nexus-gr6wc7oyy-osmonkulov-osmonalis-projects.vercel.app\n");
    return true;
  } catch (err) {
    console.log(`\n❌ Network error: ${err.message}`);
    console.log("   Check internet connection and Supabase URL");
    return false;
  }
}

check().then((ok) => process.exit(ok ? 0 : 1));
