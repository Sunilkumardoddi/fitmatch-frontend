import React from 'react';

export interface SizeBadgeProps {
  status: 'OPTIMAL' | 'SNUG' | 'ROOMY' | 'BORDERLINE' | 'UNWEARABLE';
  confidence?: number;
}

export const SizeBadge: React.FC<SizeBadgeProps> = ({ status, confidence }) => {
  const styles = {
    OPTIMAL: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    SNUG: 'bg-blue-50 text-blue-800 border-blue-300',
    ROOMY: 'bg-indigo-50 text-indigo-800 border-indigo-300',
    BORDERLINE: 'bg-amber-50 text-amber-800 border-amber-300',
    UNWEARABLE: 'bg-rose-50 text-rose-800 border-rose-300',
  }[status];

  const icons = {
    OPTIMAL: '✓',
    SNUG: '◆',
    ROOMY: '◇',
    BORDERLINE: '⚠',
    UNWEARABLE: '✕',
  }[status];

  const labels = {
    OPTIMAL: 'Optimal Match',
    SNUG: 'Form-Fitting / Snug',
    ROOMY: 'Relaxed / Roomy',
    BORDERLINE: 'Borderline Fit',
    UNWEARABLE: 'Too Constrained',
  }[status];

  return (
    <div
      role="status"
      aria-label={`${labels}${confidence !== undefined ? `, Confidence: ${Math.round(confidence * 100)}%` : ''}`}
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles} select-none`}
    >
      <span aria-hidden="true" className="font-mono text-xs">{icons}</span>
      <span>{labels}</span>
      {confidence !== undefined && (
        <span className="text-xs font-semibold opacity-80 font-mono">
          ({Math.round(confidence * 100)}%)
        </span>
      )}
    </div>
  );
};
