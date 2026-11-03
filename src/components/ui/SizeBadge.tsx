import React from 'react';

export interface SizeBadgeProps {
  status: 'OPTIMAL' | 'SNUG' | 'ROOMY' | 'BORDERLINE' | 'UNWEARABLE';
  confidence?: number;
}

export const SizeBadge: React.FC<SizeBadgeProps> = ({ status, confidence }) => {
  const styles = {
    OPTIMAL: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    SNUG: 'bg-blue-50 text-blue-700 border-blue-200',
    ROOMY: 'bg-purple-50 text-purple-700 border-purple-200',
    BORDERLINE: 'bg-amber-50 text-amber-700 border-amber-200',
    UNWEARABLE: 'bg-rose-50 text-rose-700 border-rose-200',
  }[status];

  const labels = {
    OPTIMAL: 'Optimal Match',
    SNUG: 'Form-Fitting / Snug',
    ROOMY: 'Relaxed / Roomy',
    BORDERLINE: 'Borderline Fit',
    UNWEARABLE: 'Too Constrained',
  }[status];

  return (
    <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{labels}</span>
      {confidence !== undefined && (
        <span className="text-[10px] opacity-75 font-mono">
          ({Math.round(confidence * 100)}%)
        </span>
      )}
    </div>
  );
};

