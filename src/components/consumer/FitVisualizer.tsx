import React from 'react';
import type { MarginDetail } from '../../lib/api-client';

export interface FitVisualizerProps {
  margin: MarginDetail;
  unit: 'in' | 'cm';
  dimensionLabel?: string;
  preference?: 'SNUG' | 'REGULAR' | 'RELAXED';
}

export const FitVisualizer: React.FC<FitVisualizerProps> = ({
  margin,
  unit,
  dimensionLabel = 'Chest',
  preference = 'REGULAR',
}) => {
  const displayBody = unit === 'in' 
    ? (margin.bodyMeasurementMm / 25.4).toFixed(1)
    : (margin.bodyMeasurementMm / 10).toFixed(0);
  
  const displayGarment = unit === 'in'
    ? (margin.garmentDimensionMm / 25.4).toFixed(1)
    : (margin.garmentDimensionMm / 10).toFixed(0);

  const displayEase = unit === 'in'
    ? `+${margin.easeInches}"`
    : `+${(margin.easeMm / 10).toFixed(1)} cm`;

  const bodyPct = Math.min(88, Math.max(12, Math.round((margin.bodyMeasurementMm / margin.garmentDimensionMm) * 100)));
  const easePct = 100 - bodyPct;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 select-none">
      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{dimensionLabel} Ease & Comfort Fit Diagram</span>
        </div>
        <span className="font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg font-bold">
          {displayEase} Design Ease
        </span>
      </div>

      {/* Interactive Visual Torso & Garment Cross-Section Illustration */}
      <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-44 h-32 flex items-center justify-center">
          <svg
            viewBox="0 0 200 140"
            className="w-full h-full"
            aria-label="Cross-section diagram comparing body contour and garment ease contour"
            role="img"
          >
            <defs>
              {/* Outer Garment Gradient */}
              <linearGradient id="outerGarment" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>

              {/* Inner Body Fill */}
              <linearGradient id="innerBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>

              {/* Comfort Zone Pattern */}
              <pattern id="easePattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#10B981" strokeWidth="1.5" opacity="0.3" />
              </pattern>
            </defs>

            {/* Outer Garment Boundary (Circumference) */}
            <rect
              x="20"
              y="20"
              width="160"
              height="100"
              rx="50"
              fill="url(#easePattern)"
              stroke="url(#outerGarment)"
              strokeWidth="2.5"
            />

            {/* Ease Zone Shading */}
            <rect
              x="20"
              y="20"
              width="160"
              height="100"
              rx="50"
              fill="#D1FAE5"
              opacity="0.35"
            />

            {/* Inner Body Torso Contour */}
            <ellipse
              cx="100"
              cy="70"
              rx="62"
              ry="36"
              fill="url(#innerBody)"
              stroke="#64748B"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Body Label */}
            <text x="100" y="66" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="bold">
              Your Body
            </text>
            <text x="100" y="78" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">
              {displayBody} {unit}
            </text>

            {/* Ease Clearance Guidelines & Arrows */}
            {/* Left Clearance Indicator */}
            <line x1="20" y1="70" x2="38" y2="70" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* Right Clearance Indicator */}
            <line x1="162" y1="70" x2="180" y2="70" stroke="#059669" strokeWidth="1.5" markerStart="url(#arrow)" />

            {/* Garment Tag Outside */}
            <g transform="translate(100, 10)">
              <rect x="-42" y="0" width="84" height="15" rx="3" fill="#312E81" stroke="#818CF8" strokeWidth="0.8" />
              <text x="0" y="10.5" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                Garment: {displayGarment} {unit}
              </text>
            </g>

            {/* Ease Callout Bottom */}
            <g transform="translate(100, 122)">
              <rect x="-40" y="0" width="80" height="14" rx="3" fill="#064E3B" stroke="#34D399" strokeWidth="0.8" />
              <text x="0" y="10" textAnchor="middle" fill="#A7F3D0" fontSize="7.5" fontWeight="bold">
                Ease: {displayEase}
              </text>
            </g>
          </svg>
        </div>

        {/* Visual Guideline Explanation */}
        <div className="flex-1 space-y-2 text-xs">
          <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200">
            <span className="font-bold text-emerald-900 block text-[11px]">
              Breathable Movement Clearance
            </span>
            <p className="text-[11px] text-emerald-800 leading-normal mt-0.5">
              The outer line represents the finished garment circumference. The inner dashed line is your body contour. The shaded gap provides <strong>{displayEase}</strong> of ergonomic breathing and movement ease.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-600">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Optimal range for a tailored drape without tension or billowing.</span>
          </div>
        </div>
      </div>

      {/* Accessible Text Equivalent Table (WCAG 2.2 AA) */}
      <div className="grid grid-cols-3 gap-2 text-xs text-center border-y border-slate-200/80 py-2.5">
        <div className="bg-white rounded-lg p-2.5 border border-slate-200">
          <span className="text-slate-500 block text-xs">Your Measurement</span>
          <span className="font-bold text-slate-900 text-sm">{displayBody} {unit}</span>
          <span className="text-slate-400 block font-mono text-[10px]">({margin.bodyMeasurementMm} mm)</span>
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-slate-200">
          <span className="text-slate-500 block text-xs">Garment Size</span>
          <span className="font-bold text-slate-900 text-sm">{displayGarment} {unit}</span>
          <span className="text-slate-400 block font-mono text-[10px]">({margin.garmentDimensionMm} mm)</span>
        </div>
        <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200">
          <span className="text-emerald-800 block text-xs font-semibold">Planned Ease</span>
          <span className="font-bold text-emerald-800 text-sm">{displayEase}</span>
          <span className="text-emerald-700 block font-mono text-[10px]">(+{margin.easeMm} mm)</span>
        </div>
      </div>

      {/* Dimensional Visualization Bar */}
      <div className="space-y-1">
        <div
          role="img"
          aria-label={`Visual ease ratio: Your measurement ${bodyPct}%, Ease ${easePct}%`}
          className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden flex relative"
        >
          <div 
            className="h-full bg-slate-500 transition-all duration-300" 
            style={{ width: `${bodyPct}%` }} 
            title="Your Measurement"
          />
          <div 
            className="h-full bg-emerald-500 transition-all duration-300" 
            style={{ width: `${easePct}%` }} 
            title="Garment Ease"
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 px-0.5">
          <span>Body: {displayBody} {unit} ({bodyPct}%)</span>
          <span>Garment: {displayGarment} {unit} (+{easePct}%)</span>
        </div>
      </div>
    </div>
  );
};
