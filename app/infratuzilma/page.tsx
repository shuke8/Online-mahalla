"use client";

import { InfrastructureExplorer } from "@/components/organisms/InfrastructureExplorer";

export default function InfrastructurePage() {
  return (
    <div className="stagger-children">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-navy">Инфратузилма лойиҳалари</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Инфратузилма қурилиш объектлари мониторинги — ҳудуд бўйича кесим
        </p>
      </div>

      <InfrastructureExplorer />
    </div>
  );
}
