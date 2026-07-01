"use client";

import { motion } from "framer-motion";
import { Check, Copy, HeartHandshake, Wallet } from "lucide-react";
import { useState } from "react";

const SUPPORT_NUMBER = "0225211111";

export default function SupportSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable; the number is still visible on screen.
    }
  };

  return (
    <section id="support" className="relative px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-400">
              <HeartHandshake className="h-4 w-4" />
              Support the Initiative
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Help Us Reach 1,000 Interviews
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Global Nexus is an independent project. Every contribution goes directly
              into production: filming, editing, travel, and organizing live events.
              You can support the project via O!Money (O!Деньги).
            </p>

            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-emerald-400/80">
                <Wallet className="h-3.5 w-3.5" />
                O!Money transfer number
              </div>
              <p className="mt-3 font-mono text-2xl font-semibold tracking-widest text-white sm:text-3xl">
                {SUPPORT_NUMBER}
              </p>
              <button
                onClick={handleCopy}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy number
                  </>
                )}
              </button>
            </div>

            <p className="mt-6 text-xs text-slate-600">
              Thank you for helping build the world&apos;s largest founder knowledge base.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
