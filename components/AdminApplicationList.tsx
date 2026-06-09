"use client";

import { ExternalLink, Trash2 } from "lucide-react";
import type { SpeakerApplication } from "@/lib/types";

interface AdminApplicationListProps {
  applications: SpeakerApplication[];
  onRemove: (id: string) => Promise<void>;
}

export default function AdminApplicationList({
  applications,
  onRemove,
}: AdminApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 text-center text-slate-500">
        No speaker applications yet
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Speaker applications ({applications.length})
      </h2>
      <ul className="divide-y divide-white/5">
        {applications.map((application) => (
          <li key={application.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">{application.name}</p>
              <p className="mt-0.5 text-sm text-slate-400">{application.companyRole}</p>
              <p className="mt-2 text-sm text-slate-300">{application.topic}</p>
              <a
                href={application.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
              >
                <ExternalLink className="h-3 w-3" />
                Social profile
              </a>
              <p className="mt-1 text-xs text-slate-600">
                {new Date(application.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onRemove(application.id)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
              aria-label={`Remove application from ${application.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
