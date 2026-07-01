"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import type { AdminEventInput, EventFormat } from "@/lib/types";

interface AdminEventFormProps {
  onAdd: (input: AdminEventInput) => Promise<unknown>;
}

const empty: AdminEventInput = {
  title: "",
  description: "",
  date: "",
  location: "",
  format: "online",
  link: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20";

export default function AdminEventForm({ onAdd }: AdminEventFormProps) {
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onAdd(form);
      setForm(empty);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      setError(`Could not add event. (${detail})`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">Add event</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-slate-400">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Founders Live: AMA with a Silicon Valley investor"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-slate-400">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What will happen at this event, who is the guest, what topics will be covered..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">Date</label>
          <input
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            placeholder="15 August 2026, 19:00"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">Format</label>
          <select
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value as EventFormat })}
            className={inputClass}
          >
            <option value="online" className="bg-slate-900">Online</option>
            <option value="offline" className="bg-slate-900">In person</option>
            <option value="hybrid" className="bg-slate-900">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">Location</label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Bishkek / Zoom"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">Link (optional)</label>
          <input
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        <CalendarPlus className="h-4 w-4" />
        {submitting ? "Adding…" : "Add event"}
      </button>
    </form>
  );
}
