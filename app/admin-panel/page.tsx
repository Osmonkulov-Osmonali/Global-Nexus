"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Database, LayoutDashboard, LogOut } from "lucide-react";
import AdminApplicationList from "@/components/AdminApplicationList";
import AdminSpeakerForm from "@/components/AdminSpeakerForm";
import AdminSpeakerList from "@/components/AdminSpeakerList";
import { useSpeakers } from "@/contexts/SpeakersContext";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function AdminPanelPage() {
  const router = useRouter();
  const {
    speakers,
    applications,
    count,
    usesSupabase,
    addSpeaker,
    removeSpeaker,
    removeApplication,
  } = useSpeakers();

  const handleLogout = async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin-panel/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-cyan-400" />
            <div>
              <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">{count} / 1000 leaders featured</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {usesSupabase && (
              <span className="hidden items-center gap-1.5 text-xs text-emerald-400 sm:inline-flex">
                <Database className="h-3.5 w-3.5" />
                Supabase
              </span>
            )}
            {usesSupabase && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-6 py-10">
        <AdminSpeakerForm onAdd={addSpeaker} />
        <AdminSpeakerList speakers={speakers} onRemove={removeSpeaker} />
        <AdminApplicationList applications={applications} onRemove={removeApplication} />
      </main>
    </div>
  );
}
