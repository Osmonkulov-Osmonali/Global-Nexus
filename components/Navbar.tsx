"use client";

import Link from "next/link";
import { Globe2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
          <Globe2 className="h-5 w-5 text-cyan-400" />
          Global Nexus
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-400">
          <a href="#nexus-wall" className="transition hover:text-white">
            Nexus Wall
          </a>
          <Link href="/admin-panel" className="transition hover:text-white">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
