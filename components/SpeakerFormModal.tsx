"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Modal from "./Modal";
import { useSpeakers } from "@/contexts/SpeakersContext";
import type { SpeakerApplicationInput } from "@/lib/types";

interface SpeakerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const empty: SpeakerApplicationInput = {
  name: "",
  companyRole: "",
  socialLink: "",
  topic: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20";

export default function SpeakerFormModal({ isOpen, onClose }: SpeakerFormModalProps) {
  const { submitSpeakerApplication } = useSpeakers();
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitSpeakerApplication(form);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm(empty);
        onClose();
      }, 2200);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      setError(`Could not submit your application. (${detail})`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Become a Speaker">
      {submitted ? (
        <p className="py-8 text-center text-slate-300">
          Application received. We&apos;ll be in touch soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {(
            [
              ["name", "Name", "Jane Doe"],
              ["companyRole", "Company / Role", "CEO at NovaStack"],
              ["socialLink", "Social Link", "https://linkedin.com/in/..."],
              ["topic", "Proposed Topic", "Scaling AI products globally"],
            ] as const
          ).map(([key, label, placeholder]) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm text-slate-400">{label}</label>
              <input
                required
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className={inputClass}
              />
            </div>
          ))}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Submitting…" : "Submit application"}
          </button>
        </form>
      )}
    </Modal>
  );
}
