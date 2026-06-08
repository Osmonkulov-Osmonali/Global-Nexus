"use client";

import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import AdminSpeakerForm from "@/components/AdminSpeakerForm";
import AdminSpeakerList from "@/components/AdminSpeakerList";
import { useSpeakers } from "@/contexts/SpeakersContext";

export default function AdminPanelPage() {
  const { speakers, count, addSpeaker, removeSpeaker } = useSpeakers();

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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-6 py-10">
        <AdminSpeakerForm onAdd={addSpeaker} />
        <AdminSpeakerList speakers={speakers} onRemove={removeSpeaker} />
      </main>
    </div>
  );
}
