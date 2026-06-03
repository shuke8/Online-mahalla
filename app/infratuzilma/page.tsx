"use client";

import { InfrastructureSection } from "@/components/organisms/InfrastructureSection";

export default function InfrastructurePage() {
  return (
    <div className="stagger-children">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-navy">Инфратузилма лойиҳалари</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Инфратузилма қурилиш объектлари мониторинги
        </p>
      </div>

      <InfrastructureSection />
    </div>
  );
}
