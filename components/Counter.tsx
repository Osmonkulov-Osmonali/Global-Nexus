"use client";

import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { GOAL } from "@/lib/data/mappers";

interface CounterProps {
  value: number;
  isLoaded: boolean;
}

export default function Counter({ value, isLoaded }: CounterProps) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0000");

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(String(Math.round(latest)).padStart(4, "0"));
  });

  useEffect(() => {
    if (!isLoaded) return;
    const controls = animate(count, value, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, value, isLoaded]);

  return (
    <div className="relative inline-flex flex-col items-center gap-4">
      <div className="pointer-events-none absolute -inset-12 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="glass relative overflow-hidden rounded-3xl px-10 py-8 shadow-glow">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 via-blue-500/5 to-transparent" />
        <div className="relative font-mono text-4xl font-semibold tracking-tight text-gradient-accent sm:text-6xl lg:text-7xl">
          <span className="text-slate-600">[</span>
          <motion.span className="mx-2 sm:mx-3">{display}</motion.span>
          <span className="text-slate-500">/</span>
          <span className="mx-2 sm:mx-3 text-slate-400">{GOAL}</span>
          <span className="text-slate-600">]</span>
        </div>
      </div>

      <p className="text-sm tracking-wide text-slate-500 uppercase">
        leaders featured worldwide
      </p>
    </div>
  );
}
