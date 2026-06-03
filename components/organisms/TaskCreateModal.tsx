"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface TaskCreateModalProps {
  open: boolean;
  onClose: () => void;
  mfyName: string;
  tumanName?: string;
  hokimYordamchisi?: { fio: string; phone: string };
  onSubmit?: (data: TaskCreateForm) => void;
}

export interface TaskCreateForm {
  mfyName: string;
  hokimFio: string;
  hokimPhone: string;
  visitorFio: string;
  visitorPosition: string;
  visitorPhone: string;
  visitDate: string;
  commentCategory: string;
  commentStatus: string;
  commentText: string;
}

const COMMENT_CATEGORIES = [
  "Қарор ижроси",
  "Камбағалликни қисқартириш",
  "Микролойиҳалар",
  "Тадбиркорлик",
  "Хонадон даромади",
  "Субсидия",
  "Легаллаштириш",
  "Бошқа",
];

const COMMENT_STATUSES = [
  "Ижобий",
  "Салбий",
  "Бетараф",
  "Кўриб чиқилмоқда",
];

export function TaskCreateModal({
  open,
  onClose,
  mfyName,
  tumanName = "Жиззах шаҳри",
  hokimYordamchisi,
  onSubmit,
}: TaskCreateModalProps) {
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState<TaskCreateForm>({
    mfyName,
    hokimFio: hokimYordamchisi?.fio ?? "",
    hokimPhone: hokimYordamchisi?.phone ?? "",
    visitorFio: "",
    visitorPosition: "",
    visitorPhone: "",
    visitDate: today,
    commentCategory: COMMENT_CATEGORIES[0],
    commentStatus: COMMENT_STATUSES[0],
    commentText: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setForm((f) => ({
        ...f,
        mfyName,
        hokimFio: hokimYordamchisi?.fio ?? f.hokimFio,
        hokimPhone: hokimYordamchisi?.phone ?? f.hokimPhone,
      }));
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mfyName, hokimYordamchisi]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const update = <K extends keyof TaskCreateForm>(key: K, value: TaskCreateForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
    onClose();
  };

  return createPortal(
    <div
      className="retro-root fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0f2b4d]/45 animate-[fadeIn_0.15s_ease-out]" />

      {/* Window */}
      <div
        className="relative bg-white w-full max-w-3xl max-h-[92vh] flex flex-col animate-[scaleIn_0.18s_ease-out] overflow-hidden"
        style={{
          border: "1.5px solid #2b8cee",
          boxShadow: "5px 5px 0 0 rgba(43,140,238,0.75)",
          borderRadius: "10px",
        }}
      >
        {/* Corner pattern — top-right */}
        <div
          aria-hidden
          className="site-bg-pattern pointer-events-none absolute top-0 right-0 z-[1]"
          style={{
            width: 200,
            height: 200,
            WebkitMaskImage:
              "radial-gradient(circle at top right, #000 0%, #000 35%, transparent 80%)",
            maskImage:
              "radial-gradient(circle at top right, #000 0%, #000 35%, transparent 80%)",
            opacity: 0.9,
          }}
        />

        {/* Corner pattern — bottom-left */}
        <div
          aria-hidden
          className="site-bg-pattern pointer-events-none absolute bottom-0 left-0 z-[1]"
          style={{
            width: 200,
            height: 200,
            WebkitMaskImage:
              "radial-gradient(circle at bottom left, #000 0%, #000 35%, transparent 80%)",
            maskImage:
              "radial-gradient(circle at bottom left, #000 0%, #000 35%, transparent 80%)",
            opacity: 0.9,
          }}
        />

        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-2.5 py-2 shrink-0 relative bg-white"
          style={{
            borderBottom: "1.5px solid #2b8cee",
            borderRadius: "8px 8px 0 0",
          }}
        >
          {/* Close box */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Ёпиш"
            className="shrink-0 w-[18px] h-[18px] bg-white border-[1.5px] border-[#2b8cee] hover:bg-[#2b8cee] hover:text-white flex items-center justify-center rounded-md transition-colors"
            style={{ lineHeight: 0 }}
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" />
            </svg>
          </button>

          {/* Title */}
          <div className="flex-1 flex items-center justify-center">
            <span
              className="bg-white px-3.5 py-1 text-[11px] font-semibold tracking-[0.18em] border-[1.5px] border-[#2b8cee] rounded-md text-[#2b8cee]"
              style={{ fontFamily: "var(--retro-mono, 'SFMono-Regular', 'Menlo', monospace)" }}
            >
              Topshiriq · Monitoring
            </span>
          </div>

          {/* Right spacer to balance close box */}
          <div className="shrink-0 w-[18px] h-[18px]" />
        </div>

        {/* Header info bar */}
        <div className="px-6 py-4 shrink-0 bg-white border-b-[1.5px] border-[#2b8cee]/25">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#2b8cee]/55"
            style={{ fontFamily: "var(--retro-mono, 'SFMono-Regular', monospace)" }}
          >
            ◆ Hujjat №001 / {new Date().getFullYear()}
          </p>
          <h2
            className="mt-1.5 text-[15px] sm:text-[17px] font-semibold text-[#2b8cee] leading-snug tracking-tight"
            style={{
              fontFamily:
                "var(--font-sans, 'Inter', 'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif)",
            }}
          >
            {tumanName}, {mfyName} ҳоким ёрдамчиси томонидан амалга оширилган
            ишлар МОНИТОРИНГИ
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden bg-white">
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
            {/* Section 1 */}
            <RetroSection num="01" title="МАҲАЛЛА МАЪЛУМОТЛАРИ">
              <RetroField label="МФЙ номи">
                <input
                  type="text"
                  value={form.mfyName}
                  readOnly
                  className="retro-input retro-input--locked"
                />
              </RetroField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RetroField label="Ҳоким ёрдамчиси Ф.И.О">
                  <input
                    type="text"
                    value={form.hokimFio}
                    onChange={(e) => update("hokimFio", e.target.value)}
                    className="retro-input"
                    required
                  />
                </RetroField>
                <RetroField label="Телефон рақами">
                  <input
                    type="tel"
                    value={form.hokimPhone}
                    onChange={(e) => update("hokimPhone", e.target.value)}
                    placeholder="+998 __ ___ __ __"
                    className="retro-input"
                    required
                  />
                </RetroField>
              </div>
            </RetroSection>

            {/* Section 2 */}
            <RetroSection num="02" title="ТАШРИФ БУЮРГАН ШАХС">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RetroField label="Ф.И.О.си">
                  <input
                    type="text"
                    value={form.visitorFio}
                    onChange={(e) => update("visitorFio", e.target.value)}
                    placeholder="Ф.И.О киритинг"
                    className="retro-input"
                    required
                  />
                </RetroField>
                <RetroField label="Лавозими">
                  <input
                    type="text"
                    value={form.visitorPosition}
                    onChange={(e) => update("visitorPosition", e.target.value)}
                    placeholder="Лавозимини киритинг"
                    className="retro-input"
                  />
                </RetroField>
                <RetroField label="Телефон рақами">
                  <input
                    type="tel"
                    value={form.visitorPhone}
                    onChange={(e) => update("visitorPhone", e.target.value)}
                    placeholder="+998 __ ___ __ __"
                    className="retro-input"
                  />
                </RetroField>
                <RetroField label="Ташриф санаси">
                  <input
                    type="date"
                    value={form.visitDate}
                    onChange={(e) => update("visitDate", e.target.value)}
                    className="retro-input"
                    required
                  />
                </RetroField>
              </div>
            </RetroSection>

            {/* Section 3 */}
            <RetroSection num="03" title="ИЗОҲ ВА ХУЛОСА">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RetroField label="Изоҳ туркуми">
                  <select
                    value={form.commentCategory}
                    onChange={(e) => update("commentCategory", e.target.value)}
                    className="retro-input retro-input--select"
                    required
                  >
                    {COMMENT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </RetroField>
                <RetroField label="Изоҳ ҳолати">
                  <select
                    value={form.commentStatus}
                    onChange={(e) => update("commentStatus", e.target.value)}
                    className="retro-input retro-input--select"
                    required
                  >
                    {COMMENT_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </RetroField>
              </div>
              <RetroField label="Изоҳ матни">
                <textarea
                  value={form.commentText}
                  onChange={(e) => update("commentText", e.target.value)}
                  rows={4}
                  placeholder="Изоҳ матнини киритинг..."
                  className="retro-input retro-textarea"
                  required
                />
              </RetroField>
            </RetroSection>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-6 py-3.5 border-t-[1.5px] border-[#2b8cee]/25 bg-white shrink-0">
            <span
              className="text-[10px] tracking-[0.18em] text-[#2b8cee]/45 hidden sm:inline"
              style={{ fontFamily: "var(--retro-mono, 'SFMono-Regular', monospace)" }}
            >
              [ Press ESC to close ]
            </span>
            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="retro-btn"
              >
                Бекор
              </button>
              <button
                type="submit"
                className="retro-btn retro-btn--primary"
              >
                ► Юбориш
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function RetroSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-8 h-8 bg-[#2b8cee] text-white text-[13px] font-bold rounded-lg shadow-sm"
          style={{
            fontFamily:
              "var(--font-sans, 'Inter', 'Geist', system-ui, -apple-system, sans-serif)",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
          }}
        >
          {num}
        </span>
        <h3
          className="text-[13px] font-semibold tracking-[0.08em] text-[#2b8cee] uppercase"
          style={{
            fontFamily:
              "var(--font-sans, 'Inter', 'Geist', system-ui, -apple-system, sans-serif)",
          }}
        >
          {title}
        </h3>
        <span className="flex-1 h-px bg-[#2b8cee]/25" />
      </div>
      <div className="space-y-4 pl-0 sm:pl-10">{children}</div>
    </section>
  );
}

function RetroField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="block text-[10.5px] font-medium text-[#2b8cee]/75 tracking-[0.12em] mb-1.5"
        style={{ fontFamily: "var(--retro-mono, 'SFMono-Regular', monospace)" }}
      >
        » {label}
      </span>
      {children}
    </label>
  );
}
