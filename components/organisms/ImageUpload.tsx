"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface ImageUploadProps {
  /** Блок устидаги ихтиёрий ёрлиқ */
  label?: string;
  /** Файл танланганда ёки олиб ташланганда чақирилади */
  onChange?: (file: File | null) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

/**
 * ImageUpload — битта расм юклаш блоки.
 * "Файл Орқали" — файл танлагич, "Камера Орқали" — камера (capture=environment).
 * Расм валидацияси: тури image/*, ҳажми ≤ 10 МБ. Превью + олиб ташлаш тугмаси.
 */
export function ImageUpload({ label, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Object URL'ни unmount'да тозалаш (memory leak олдини олиш).
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSelect = (selected: File | null) => {
    setError(null);
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Фақат расм файллари қабул қилинади");
      return;
    }
    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setError("Расм ҳажми 10 МБ дан ошмаслиги керак");
      return;
    }

    // Эски превьюни тозалаб, янгисини яратамиз.
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(selected);
    setFile(selected);
    setPreviewUrl(url);
    onChange?.(selected);
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    onChange?.(null);
  };

  return (
    <div>
      {label && (
        <span className="block text-[13px] font-semibold text-text-label mb-1.5">{label}</span>
      )}

      {/* Яширин input'лар */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleSelect(e.target.files?.[0] ?? null)}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => handleSelect(e.target.files?.[0] ?? null)}
      />

      {previewUrl && file ? (
        // ── Превью ҳолати ──
        <div className="rounded-xl border border-border-light bg-white shadow-layered-sm overflow-hidden">
          <div className="relative bg-surface/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={file.name}
              className="w-full h-44 sm:h-48 object-contain"
            />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Расмни олиб ташлаш"
              className="absolute top-2 right-2 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm border border-border-light text-danger shadow-sm hover:bg-danger hover:text-white hover:border-danger transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40"
            >
              <Icon name="trash" size={17} />
            </button>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border-light/70">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-success/10 text-success shrink-0">
              <Icon name="tick-circle" size={16} variant="Bold" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-text-primary truncate">{file.name}</p>
              <p className="text-[11px] text-text-secondary">{formatFileSize(file.size)}</p>
            </div>
          </div>
        </div>
      ) : (
        // ── Бўш ҳолат (dropzone) ──
        <div
          className={`rounded-xl border-2 border-dashed bg-gradient-to-b from-surface/50 to-white transition-colors ${
            error ? "border-danger/50" : "border-border-light"
          }`}
        >
          <div className="flex flex-col items-center justify-center px-4 py-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-navy/[0.06] text-navy mb-2.5">
              <Icon name="camera" size={24} variant="Bold" />
            </span>
            <p className="text-[13px] font-semibold text-text-primary">Расмни юкланг</p>
            <p className="text-[11px] text-text-secondary mt-0.5 text-center">
              PNG, JPG — 10 МБ гача
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 mt-4 w-full max-w-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg border border-navy/25 bg-white text-navy text-[13px] font-semibold px-3 hover:bg-navy/[0.04] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
              >
                <Icon name="document-upload" size={16} variant="Bold" />
                Файл Орқали
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg bg-navy text-white text-[13px] font-semibold px-3 shadow-[0_4px_12px_rgba(43,140,238,0.25)] hover:bg-navy-light active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/50"
              >
                <Icon name="camera" size={16} variant="Bold" />
                Камера Орқали
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-[12px] font-medium text-danger">
          <Icon name="warning" size={13} variant="Bold" />
          {error}
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
