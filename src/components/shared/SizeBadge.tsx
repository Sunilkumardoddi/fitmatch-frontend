'use client';

import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface SizeBadgeProps {
  size?: string | null;
  status?: string;
  confidenceScore?: number;
  showPercentage?: boolean; // Default to false in consumer mode per §10
  className?: string;
}

export function SizeBadge({
  size,
  status = 'OPTIMAL',
  confidenceScore = 0.95,
  showPercentage = false,
  className = '',
}: SizeBadgeProps) {
  if (!size && !status) {
    return (
      <div
        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 ${className}`}
      >
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Additional Measurements Needed</span>
      </div>
    );
  }

  const label = size ? `Size ${size}` : 'Body-Neutral Fit';

  return (
    <div
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold shadow-sm ${className}`}
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      <span className="text-sm font-black tracking-wide">{label}</span>
      {showPercentage && confidenceScore > 0 && (
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-medium">
          {Math.round(confidenceScore * 100)}% Match
        </span>
      )}
    </div>
  );
}
