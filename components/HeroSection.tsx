"use client";

import { motion } from "framer-motion";
import { ArrowDown, Globe2, Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import Counter from "./Counter";
import SpeakerFormModal from "./SpeakerFormModal";

interface HeroSectionProps {
  count: number;
  isLoaded: boolean;
}

export default function HeroSection({ count, isLoaded }: HeroSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[140px]" />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Global Nexus
            <span className="text-cyan-500/50">·</span>
            <Globe2 className="h-3.5 w-3.5" />
            Media Challenge
          </motion.div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-gradient sm:text-6xl lg:text-7xl">
            1,000 Insights from 1,000 Global Leaders in IT &amp; Business
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            A reality challenge building the ultimate knowledge hub. High-level strategy,
            tech trends, and startup breakdowns from worldwide founders and investors.
          </p>

          <div className="mt-14">
            <Counter value={count} isLoaded={isLoaded} />
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#nexus-wall"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-600 px-7 py-3.5 text-sm font-medium text-white shadow-glow transition hover:opacity-90"
            >
              <ArrowDown className="h-4 w-4" />
              Watch Sessions
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white transition hover:border-violet-500/30 hover:bg-white/[0.06]"
            >
              <UserPlus className="h-4 w-4" />
              Become a Speaker
            </button>
          </div>
        </motion.div>
      </section>

      <SpeakerFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
