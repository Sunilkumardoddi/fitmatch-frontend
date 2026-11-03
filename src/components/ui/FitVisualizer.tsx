import React from 'react';
import type { MarginDetail } from '../../lib/api-client';

export interface FitVisualizerProps {
  margin: MarginDetail;
  unit: 'in' | 'cm';
}

export const FitVisualizer: React.FC<FitVisualizerProps> = ({ margin, unit }) => {
  const displayBody = unit === 'in' 
    ? (margin.bodyMeasurementMm / 25.4).toFixed(1)
    : (margin.bodyMeasurementMm / 10).toFixed(0);
  
  const displayGarment = unit === 'in'
    ? (margin.garmentDimensionMm / 25.4).toFixed(1)
    : (margin.garmentDimensionMm / 10).toFixed(0);

  const displayEase = unit === 'in'
    ? `+${margin.easeInches}"`
    : `+${(margin.easeMm / 10).toFixed(1)} cm`;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
        <span>{margin.dimension} Ease Breakdown</span>
        <span className="font-mono text-indigo-600 font-bold">{displayEase} design ease</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Body: <strong>{displayBody} {unit}</strong></span>
          <span>Garment: <strong>{displayGarment} {unit}</strong></span>
        </div>

        {/* Visual dimensional bar */}
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex relative">
          <div 
            className="h-full bg-slate-400" 
            style={{ width: `${Math.min(85, (margin.bodyMeasurementMm / margin.garmentDimensionMm) * 100)}%` }} 
            title="Body Measurement"
          />
          <div 
            className="h-full bg-emerald-500" 
            style={{ width: `${Math.max(5, (margin.easeMm / margin.garmentDimensionMm) * 100)}%` }} 
            title="Garment Ease"
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-normal">
        Provides <strong>{margin.easeMm} mm</strong> of functional ease over your bare chest measurement for unconstrained movement.
      </p>
    </div>
  );
};

