"use client";

interface RadialGaugeProps {
  pct: number;
  count: number;
  countSuffix?: string;
  label: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

export function RadialGauge({
  pct,
  count,
  countSuffix = "та объект",
  label,
  color,
  gradientFrom,
  gradientTo,
}: RadialGaugeProps) {
  const safePct = Math.min(Math.max(pct, 0), 100);
  // Arc geometry: semicircle from (12, 90) to (148, 90), radius 70
  const arcLength = Math.PI * 70; // ~219.9
  const dashOffset = arcLength * (1 - safePct / 100);
  const gradId = `gauge-grad-${gradientFrom.replace("#", "")}-${gradientTo.replace("#", "")}`;
  const glowId = `gauge-glow-${gradientTo.replace("#", "")}`;

  return (
    <div className="bg-surface rounded-xl p-3.5 sm:p-4">
      {/* Label header */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-[10px] sm:text-[11px] font-medium text-text-secondary uppercase tracking-wider leading-tight">
          {label}
        </span>
      </div>

      {/* Semicircle gauge SVG */}
      <div className="relative flex justify-center">
        <svg viewBox="0 0 160 105" className="w-full max-w-[220px] overflow-visible" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <path
            d="M 14 90 A 66 66 0 0 1 146 90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <path
            d="M 14 90 A 66 66 0 0 1 146 90"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={dashOffset}
            filter={`url(#${glowId})`}
          />

          {/* Tick marks at 0%, 50%, 100% */}
          <circle cx="14" cy="90" r="2.5" fill="#cbd5e1" />
          <circle cx="80" cy="24" r="2.5" fill="#cbd5e1" />
          <circle cx="146" cy="90" r="2.5" fill="#cbd5e1" />

          {/* Center percentage value */}
          <text
            x="80"
            y="78"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill={color}
            style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
          >
            {pct.toFixed(1)}%
          </text>
          <text
            x="80"
            y="95"
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            fill="#64748b"
            style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            бажарилиш
          </text>
        </svg>
      </div>

      {/* Count below */}
      <div className="flex items-baseline justify-center gap-1.5 mt-1">
        <p className="text-xl sm:text-2xl font-bold text-navy tabular-nums leading-none tracking-tight">
          {count.toLocaleString("en-US")}
        </p>
        <p className="text-[11px] font-medium text-text-secondary whitespace-nowrap">{countSuffix}</p>
      </div>
    </div>
  );
}
