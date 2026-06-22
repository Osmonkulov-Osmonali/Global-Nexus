import { Suspense } from "react";
import AdminLoginForm from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="relative w-full max-w-md">
        <Suspense fallback={<div className="glass h-96 animate-pulse rounded-2xl" />}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
