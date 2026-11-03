import React from 'react';

export interface GarmentFlatVisualGuideProps {
  pitToPitVal?: number | '';
  unit: 'in' | 'cm';
  onPitChange?: (val: number) => void;
  interactive?: boolean;
}

export const GarmentFlatVisualGuide: React.FC<GarmentFlatVisualGuideProps> = ({
  pitToPitVal = 21.0,
  unit,
  onPitChange,
  interactive = true,
}) => {
  const pit = typeof pitToPitVal === 'number' && pitToPitVal > 0 ? pitToPitVal : (unit === 'in' ? 21.0 : 53.0);
  const finishedGarment = Math.round(pit * 2 * 10) / 10;
  const bodyChest = unit === 'in' 
    ? Math.max(28, Math.round((finishedGarment - 3.0) * 10) / 10) 
    : Math.max(70, Math.round((finishedGarment - 7.6) * 10) / 10);

  return (
    <div className="bg-slate-900/90 text-white rounded-2xl p-4 border border-slate-700/60 shadow-inner relative overflow-hidden select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/50 mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Interactive Garment Flat Ruler Guide
          </span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
          Pit-to-Pit Seam Measurement
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
        {/* SVG Vector Garment Laid Flat */}
        <div className="relative w-48 h-56 flex items-center justify-center">
          <svg
            viewBox="0 0 220 250"
            className="w-full h-full drop-shadow-md"
            aria-label="Illustration of a casual shirt laid flat with seam-to-seam measurement tape"
            role="img"
          >
            <defs>
              <linearGradient id="shirtFabric" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* High Contrast Tailor's Yellow Ruler Gradient */}
              <linearGradient id="rulerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              <filter id="rulerGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Flat Garment Outer Silhouette (Button-Down Shirt with Collar & Sleeves) */}
            <path
              d="M 85 24
                 L 110 36
                 L 135 24
                 L 165 42
                 L 205 85
                 L 182 105
                 L 155 78
                 L 155 105
                 L 152 225
                 Q 110 232 68 225
                 L 65 105
                 L 38 78
                 L 15 105
                 L 55 42 Z"
              fill="url(#shirtFabric)"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Collar Contour */}
            <path d="M 85 24 Q 110 42 135 24" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
            <path d="M 95 28 L 104 55 L 110 40 L 116 55 L 125 28" fill="#1E293B" stroke="#64748B" strokeWidth="1.2" />

            {/* Center Placket / Buttons */}
            <line x1="110" y1="40" x2="110" y2="228" stroke="#334155" strokeWidth="6" />
            <line x1="110" y1="40" x2="110" y2="228" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
            {/* Buttons */}
            <circle cx="110" cy="70" r="2" fill="#E2E8F0" />
            <circle cx="110" cy="105" r="2" fill="#E2E8F0" />
            <circle cx="110" cy="140" r="2" fill="#E2E8F0" />
            <circle cx="110" cy="175" r="2" fill="#E2E8F0" />
            <circle cx="110" cy="210" r="2" fill="#E2E8F0" />

            {/* Armhole Seam Curves */}
            <path d="M 55 42 Q 72 75 65 105" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 165 42 Q 148 75 155 105" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* ================= PIT-TO-PIT RULER GUIDELINE ================= */}
            {/* Pulsing Guide Line */}
            <line
              x1="55"
              y1="105"
              x2="165"
              y2="105"
              stroke="#F59E0B"
              strokeWidth="10"
              opacity="0.3"
              filter="url(#rulerGlow)"
            />

            {/* Tailor's Measuring Tape Ribbon */}
            <rect
              x="62"
              y="100"
              width="96"
              height="10"
              rx="2"
              fill="url(#rulerGrad)"
              stroke="#B45309"
              strokeWidth="0.8"
            />

            {/* Ruler Inches Tick Marks */}
            <line x1="72" y1="100" x2="72" y2="104" stroke="#78350F" strokeWidth="1" />
            <line x1="82" y1="100" x2="82" y2="106" stroke="#78350F" strokeWidth="1.2" />
            <line x1="92" y1="100" x2="92" y2="104" stroke="#78350F" strokeWidth="1" />
            <line x1="102" y1="100" x2="102" y2="106" stroke="#78350F" strokeWidth="1.2" />
            <line x1="112" y1="100" x2="112" y2="104" stroke="#78350F" strokeWidth="1" />
            <line x1="122" y1="100" x2="122" y2="106" stroke="#78350F" strokeWidth="1.2" />
            <line x1="132" y1="100" x2="132" y2="104" stroke="#78350F" strokeWidth="1" />
            <line x1="142" y1="100" x2="142" y2="106" stroke="#78350F" strokeWidth="1.2" />

            {/* Seam Intersection Left Pin */}
            <circle cx="65" cy="105" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="65" cy="105" r="8" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.6" className="animate-ping" />

            {/* Seam Intersection Right Pin */}
            <circle cx="155" cy="105" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="155" cy="105" r="8" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.6" className="animate-ping" />

            {/* Dimension Label Tag */}
            <g transform="translate(85, 115)">
              <rect x="0" y="0" width="50" height="18" rx="4" fill="#78350F" stroke="#FBBF24" strokeWidth="1" />
              <text x="25" y="12.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                {pit} {unit}
              </text>
            </g>
          </svg>
        </div>

        {/* Dynamic Formula & Measurement Conversion Card */}
        <div className="flex-1 w-full space-y-2 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">Measured Pit-to-Pit:</span>
              <span className="font-mono font-bold text-white bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600">
                {pit} {unit}
              </span>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700 space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-slate-300">
                <span>&times; 2 (Front + Back):</span>
                <span className="font-bold text-white">{finishedGarment} {unit}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>- Standard Casual Ease:</span>
                <span className="text-amber-300">{unit === 'in' ? '-3.0 in' : '-7.6 cm'}</span>
              </div>
              <div className="pt-1 border-t border-slate-800 flex justify-between text-emerald-400 font-bold">
                <span>Estimated Body Chest:</span>
                <span>{bodyChest} {unit}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Measure flat across the lower armpit seams. Lay the garment completely flat without stretching the fabric.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

