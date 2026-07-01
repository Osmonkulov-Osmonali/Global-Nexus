"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { AdminSpeakerInput } from "@/lib/types";

interface AdminSpeakerFormProps {
  onAdd: (input: AdminSpeakerInput) => Promise<unknown>;
}

const empty: AdminSpeakerInput = {
  name: "",
  role: "",
  company: "",
  topic: "",
  photoUrl: "",
  country: "",
  status: "featured",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20";

export default function AdminSpeakerForm({ onAdd }: AdminSpeakerFormProps) {
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
      setError(`Could not add speaker. (${detail})`);
    } finally {
      setSubmitting(false);
    }
  };

  const fields: { key: Exclude<keyof AdminSpeakerInput, "status">; label: string; placeholder: string; required?: boolean }[] = [
    { key: "name", label: "Name", placeholder: "Sarah Chen" },
    { key: "role", label: "Role", placeholder: "CEO" },
    { key: "company", label: "Company", placeholder: "NovaStack" },
    { key: "country", label: "Country code", placeholder: "US" },
    { key: "topic", label: "Talk topic", placeholder: "Scaling AI products globally" },
    { key: "photoUrl", label: "Photo URL", placeholder: "https://...", required: false },
  ];

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">Add speaker</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label, placeholder, required = true }) => (
          <div key={key} className={key === "topic" ? "sm:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm text-slate-400">{label}</label>
            <input
              required={required}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              className={inputClass}
            />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value === "upcoming" ? "upcoming" : "featured" })
            }
            className={inputClass}
          >
            <option value="featured" className="bg-slate-900">Featured (session published)</option>
            <option value="upcoming" className="bg-slate-900">Upcoming (expected guest)</option>
          </select>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        <Plus className="h-4 w-4" />
        {submitting ? "Adding…" : "Add speaker"}
      </button>
    </form>
  );
}
