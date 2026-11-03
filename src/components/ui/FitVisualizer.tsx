import React from 'react';
import type { MarginDetail } from '../../lib/api-client';

export interface FitVisualizerProps {
  margin: MarginDetail;
  unit: 'in' | 'cm';
  dimensionLabel?: string;
}

export const FitVisualizer: React.FC<FitVisualizerProps> = ({
  margin,
  unit,
  dimensionLabel = 'Chest',
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
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
        <span>{dimensionLabel} Dimensional Ease Breakdown</span>
        <span className="font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-lg">
          {displayEase} Functional Ease
        </span>
      </div>

      {/* Accessible Text Equivalent Table (WCAG 2.2 AA) */}
      <div className="grid grid-cols-3 gap-2 text-xs text-center border-y border-slate-200/80 py-2">
        <div className="bg-white rounded-lg p-2 border border-slate-200">
          <span className="text-slate-500 block text-xs">Body Dimension</span>
          <span className="font-bold text-slate-900">{displayBody} {unit}</span>
          <span className="text-slate-400 block font-mono text-xs">({margin.bodyMeasurementMm} mm)</span>
        </div>
        <div className="bg-white rounded-lg p-2 border border-slate-200">
          <span className="text-slate-500 block text-xs">Garment Dimension</span>
          <span className="font-bold text-slate-900">{displayGarment} {unit}</span>
          <span className="text-slate-400 block font-mono text-xs">({margin.garmentDimensionMm} mm)</span>
        </div>
        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-200">
          <span className="text-emerald-800 block text-xs font-semibold">Design Ease</span>
          <span className="font-bold text-emerald-800">{displayEase}</span>
          <span className="text-emerald-700 block font-mono text-xs">(+{margin.easeMm} mm)</span>
        </div>
      </div>

      {/* Dimensional Visualization Bar */}
      <div className="space-y-1">
        <div
          role="img"
          aria-label={`Visual ease ratio: Body ${bodyPct}%, Ease ${easePct}%`}
          className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden flex relative"
        >
          <div 
            className="h-full bg-slate-500 transition-all duration-300" 
            style={{ width: `${bodyPct}%` }} 
            title="Body Measurement"
          />
          <div 
            className="h-full bg-emerald-500 transition-all duration-300" 
            style={{ width: `${easePct}%` }} 
            title="Garment Ease"
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 px-0.5">
          <span>Bare Body: {displayBody} {unit}</span>
          <span>Finished Garment: {displayGarment} {unit}</span>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-normal">
        Provides <strong>{margin.easeMm} mm</strong> of functional design ease over your body measurement, allowing natural arm movement and breathing room without excess bunching.
      </p>
    </div>
  );
};
