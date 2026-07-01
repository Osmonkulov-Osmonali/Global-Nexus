"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Film,
  Landmark,
  LineChart,
  Mic2,
  Target,
  Users2,
  Video,
} from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "The Mission",
    text: "Conduct and publish 1,000 in-depth interviews with founders, executives, and investors from the global IT and startup industry — one unified, public knowledge base.",
  },
  {
    icon: Mic2,
    title: "The Interviews",
    text: "Each session is a structured conversation: the guest's story, key strategic decisions, mistakes and lessons, and practical advice for the next generation of builders.",
  },
  {
    icon: LineChart,
    title: "The Outcome",
    text: "A permanent library of high-signal insights — strategy, fundraising, product, engineering, and leadership — free and accessible to everyone.",
  },
];

const formats = [
  {
    icon: Video,
    title: "Video Sessions",
    text: "Full-length recorded interviews published on the platform and social channels.",
  },
  {
    icon: Film,
    title: "Short Breakdowns",
    text: "Key takeaways from every session, condensed into short, shareable clips.",
  },
  {
    icon: Users2,
    title: "Live Events",
    text: "Public meetups and online panels where the community meets the speakers directly.",
  },
  {
    icon: ClipboardList,
    title: "Written Summaries",
    text: "Structured notes and frameworks from each conversation for quick reference.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-sm text-violet-400">
            <Landmark className="h-4 w-4" />
            About the Initiative
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Plan &amp; What to Expect
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Global Nexus is a long-term media initiative. Here is exactly what we are
            building, how it works, and what you will receive as a member of the audience.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                <step.icon className="h-5 w-5 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 mb-6 text-center text-xl font-semibold text-white"
        >
          Content Formats
        </motion.h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((format, index) => (
            <motion.div
              key={format.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass rounded-2xl p-5 transition-colors hover:border-violet-500/25"
            >
              <format.icon className="mb-3 h-5 w-5 text-blue-300" />
              <h4 className="text-sm font-semibold text-white">{format.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{format.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
