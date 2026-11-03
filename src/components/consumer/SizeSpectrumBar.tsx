'use client';

import React from 'react';

export interface SizeSpectrumBarProps {
  recommendedSize: string;
  onSizeSelect?: (size: string) => void;
  brandName?: string;
  unit: 'in' | 'cm';
}

export const SizeSpectrumBar: React.FC<SizeSpectrumBarProps> = ({
  recommendedSize = 'L',
  onSizeSelect,
  brandName = 'Snitch',
  unit,
}) => {
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const recIndex = allSizes.indexOf(recommendedSize.toUpperCase());

  return (
    <div className="bg-slate-900/90 text-white rounded-2xl p-4 sm:p-5 border border-slate-700/70 shadow-sm space-y-3 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Brand Size Spectrum & Ease Curve
          </span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
          {brandName} Spectrum
        </span>
      </div>

      {/* Visual Size Spectrum Track */}
      <div className="grid grid-cols-7 gap-1.5 pt-1">
        {allSizes.map((size, idx) => {
          const isRecommended = idx === recIndex;
          const isSmaller = idx < recIndex;
          const isLarger = idx > recIndex;

          let badgeColor = 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-slate-500';
          let easeLabel = '';

          if (isRecommended) {
            badgeColor = 'bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/50 scale-105 z-10';
            easeLabel = 'Optimal';
          } else if (idx === recIndex - 1) {
            badgeColor = 'bg-blue-950/60 text-blue-300 border-blue-700/80 hover:bg-blue-900/60';
            easeLabel = 'Snug';
          } else if (idx === recIndex + 1) {
            badgeColor = 'bg-amber-950/60 text-amber-300 border-amber-700/80 hover:bg-amber-900/60';
            easeLabel = 'Roomy';
          }

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSizeSelect && onSizeSelect(size)}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all text-center ${badgeColor}`}
            >
              <span className={`font-black ${isRecommended ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}`}>
                {size}
              </span>
              {easeLabel && (
                <span className={`text-[9px] font-bold mt-0.5 uppercase tracking-tight ${
                  isRecommended ? 'text-emerald-100' : 'opacity-80'
                }`}>
                  {easeLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Snug (Close drape)</span>
        </span>
        <span className="flex items-center space-x-1.5 font-bold text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Size {recommendedSize} Recommended</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Roomy (Generous ease)</span>
        </span>
      </div>
    </div>
  );
};
