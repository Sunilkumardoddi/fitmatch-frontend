import React from 'react';

export interface BodyMeasurementVisualGuideProps {
  activeZone?: 'CHEST' | 'WAIST' | 'SHOULDER' | null;
  onZoneSelect?: (zone: 'CHEST' | 'WAIST' | 'SHOULDER') => void;
  chestVal?: number | '';
  waistVal?: number | '';
  unit: 'in' | 'cm';
  interactive?: boolean;
}

export const BodyMeasurementVisualGuide: React.FC<BodyMeasurementVisualGuideProps> = ({
  activeZone = 'CHEST',
  onZoneSelect,
  chestVal = 39.0,
  waistVal = 32.0,
  unit,
  interactive = true,
}) => {
  const displayChest = typeof chestVal === 'number' && chestVal > 0 ? `${chestVal} ${unit}` : `-- ${unit}`;
  const displayWaist = typeof waistVal === 'number' && waistVal > 0 ? `${waistVal} ${unit}` : `-- ${unit}`;

  return (
    <div className="bg-slate-900/90 text-white rounded-2xl p-4 border border-slate-700/60 shadow-inner relative overflow-hidden select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/50 mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Interactive Body Tape Guide
          </span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
          {interactive ? 'Click zone to focus' : 'Neutral anatomical guide'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
        {/* SVG Anatomical Silhouette with Guideline Overlays */}
        <div className="relative w-44 h-56 flex items-center justify-center">
          <svg
            viewBox="0 0 200 260"
            className="w-full h-full drop-shadow-md"
            aria-label="Interactive body measurement guidelines diagram"
            role="img"
          >
            <defs>
              {/* Subtle Body Gradient */}
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              {/* Glowing Tape Gradient for Chest */}
              <linearGradient id="chestTapeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>

              {/* Tape Gradient for Waist */}
              <linearGradient id="waistTapeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>

              {/* Shadow Filter */}
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Body Silhouette (Gender-Neutral, Body-Positive Upper Torso) */}
            <path
              d="M 100 24
                 C 91 24, 83 31, 83 40
                 C 83 49, 90 56, 94 60
                 C 74 65, 56 75, 46 95
                 C 40 107, 36 122, 32 142
                 C 30 152, 38 156, 44 150
                 C 49 145, 54 133, 58 122
                 C 59 133, 60 152, 62 175
                 C 63 195, 65 215, 67 240
                 C 68 245, 132 245, 133 240
                 C 135 215, 137 195, 138 175
                 C 140 152, 141 133, 142 122
                 C 146 133, 151 145, 156 150
                 C 162 156, 170 152, 168 142
                 C 164 122, 160 107, 154 95
                 C 144 75, 126 65, 106 60
                 C 110 56, 117 49, 117 40
                 C 117 31, 109 24, 100 24 Z"
              fill="url(#bodyGrad)"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Head & Neck Contour */}
            <ellipse cx="100" cy="38" rx="14" ry="17" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <path d="M 94 54 C 94 58, 106 58, 106 54" fill="none" stroke="#475569" strokeWidth="1.5" />

            {/* Clavicle / Collarbone line */}
            <path d="M 82 72 Q 100 78 118 72" fill="none" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />

            {/* ================= ZONE 1: CHEST GUIDELINE ================= */}
            <g
              className={`cursor-pointer transition-all duration-300 ${
                activeZone === 'CHEST' ? 'opacity-100 scale-100' : 'opacity-85 hover:opacity-100'
              }`}
              onClick={() => onZoneSelect && onZoneSelect('CHEST')}
            >
              {/* Outer Glow Halo when active */}
              {activeZone === 'CHEST' && (
                <ellipse
                  cx="100"
                  cy="110"
                  rx="48"
                  ry="12"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="8"
                  opacity="0.35"
                  filter="url(#glowFilter)"
                />
              )}

              {/* Tape Path Wrapping Around Fullest Chest Point */}
              <ellipse
                cx="100"
                cy="110"
                rx="44"
                ry="9"
                fill="none"
                stroke="url(#chestTapeGrad)"
                strokeWidth={activeZone === 'CHEST' ? '4.5' : '3'}
                strokeDasharray="6 3"
              />

              {/* Measurement Tape Tick Marks */}
              <ellipse
                cx="100"
                cy="110"
                rx="44"
                ry="9"
                fill="none"
                stroke="#C7D2FE"
                strokeWidth="1.5"
                strokeDasharray="1 7"
              />

              {/* Anchor Pin Left */}
              <circle cx="56" cy="110" r="3.5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Anchor Pin Right */}
              <circle cx="144" cy="110" r="3.5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Pointer Callout Bubble */}
              <g transform="translate(148, 102)">
                <rect x="0" y="0" width="46" height="16" rx="4" fill="#312E81" stroke="#818CF8" strokeWidth="1" />
                <text x="23" y="11" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">
                  Chest
                </text>
              </g>
            </g>

            {/* ================= ZONE 2: WAIST GUIDELINE ================= */}
            <g
              className={`cursor-pointer transition-all duration-300 ${
                activeZone === 'WAIST' ? 'opacity-100' : 'opacity-85 hover:opacity-100'
              }`}
              onClick={() => onZoneSelect && onZoneSelect('WAIST')}
            >
              {activeZone === 'WAIST' && (
                <ellipse
                  cx="100"
                  cy="165"
                  rx="40"
                  ry="9"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="7"
                  opacity="0.35"
                  filter="url(#glowFilter)"
                />
              )}

              <ellipse
                cx="100"
                cy="165"
                rx="37"
                ry="7.5"
                fill="none"
                stroke="url(#waistTapeGrad)"
                strokeWidth={activeZone === 'WAIST' ? '4' : '2.5'}
                strokeDasharray="5 3"
              />

              {/* Anchor Pin Left */}
              <circle cx="63" cy="165" r="3" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Anchor Pin Right */}
              <circle cx="137" cy="165" r="3" fill="#34D399" stroke="#FFFFFF" strokeWidth="1.5" />

              <g transform="translate(142, 157)">
                <rect x="0" y="0" width="44" height="16" rx="4" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
                <text x="22" y="11" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">
                  Waist
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Dynamic Measurement Guideline Cards */}
        <div className="flex-1 w-full space-y-2 text-xs">
          {/* Chest Guide Card */}
          <div
            onClick={() => onZoneSelect && onZoneSelect('CHEST')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeZone === 'CHEST'
                ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span className="font-bold text-indigo-200">Chest Guideline (Fullest Point)</span>
              </div>
              <span className="font-mono font-bold text-white bg-indigo-900/80 px-2 py-0.5 rounded border border-indigo-700">
                {displayChest}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
              Wrap horizontally under armpits across the fullest part of your chest. Keep arms relaxed at your sides with room for one finger beneath tape.
            </p>
          </div>

          {/* Waist Guide Card */}
          <div
            onClick={() => onZoneSelect && onZoneSelect('WAIST')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeZone === 'WAIST'
                ? 'bg-emerald-950/60 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-bold text-emerald-200">Waist Guideline (Natural Waist)</span>
              </div>
              <span className="font-mono font-bold text-white bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
                {displayWaist}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
              Measure around your natural waistline, typically situated 1-2 inches above your navel. Breathe normally without sucking in your abdomen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

