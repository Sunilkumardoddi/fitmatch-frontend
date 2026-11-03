import React, { useState } from 'react';
import { apiClient } from '../../lib/api-client';

export interface PrivacyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onDataErased?: () => void;
}

export const PrivacyDrawer: React.FC<PrivacyDrawerProps> = ({
  isOpen,
  onClose,
  userId = 'guest_user_local',
  onDataErased,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [erasedSuccess, setErasedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const data = await apiClient.exportPersonalData(userId);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fitmatch_data_archive_${userId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const handleErase = async () => {
    if (!confirm('Under Section 12 of the Indian DPDP Act 2023, this will immediately hard-delete all your measurements and profile records from memory and database. This action cannot be undone. Do you wish to continue?')) {
      return;
    }
    setErasing(true);
    try {
      await apiClient.erasePersonalData(userId);
      setErasedSuccess(true);
      if (onDataErased) onDataErased();
    } finally {
      setErasing(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-center-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Indian DPDP Act 2023 Compliant
            </span>
            <h2 id="privacy-center-title" className="text-lg font-bold text-slate-900 mt-2">
              Your Privacy & Data Rights
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">We collect only what is strictly necessary to calculate your clothing fit.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy center"
            className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <p>
            <strong className="text-slate-900">Zero Biometrics:</strong> FitMatch never captures, stores, or processes camera photos, 3D body scans, or facial biometrics.
          </p>
          <p>
            <strong className="text-slate-900">Manual Tape Only:</strong> Sizing recommendations are computed strictly from your manual tape measurements and manufacturer garment dimension tables.
          </p>
          <p>
            <strong className="text-slate-900">Zero Measurement Telemetry:</strong> Your numerical millimeter dimensions are never shared with advertisers, analytics providers, or third parties.
          </p>
        </div>

        {erasedSuccess ? (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-800 text-xs font-bold text-center space-y-1">
            <span className="text-base block">✓</span>
            <div>All profile data and body measurements have been permanently hard-erased from memory and database.</div>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-600 text-slate-900 font-bold text-xs py-3.5 px-4 rounded-xl transition min-h-[48px]"
            >
              <span>{downloading ? 'Preparing Archive...' : '📥 Download Personal Data Archive (Section 11)'}</span>
            </button>

            <button
              type="button"
              onClick={handleErase}
              disabled={erasing}
              className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100 focus-visible:ring-2 focus-visible:ring-rose-600 text-rose-700 font-bold text-xs py-3.5 px-4 rounded-xl border border-rose-200 transition min-h-[48px]"
            >
              <span>{erasing ? 'Erasing...' : '🗑️ Permanent Hard Erasure (Section 12 - Right to be Forgotten)'}</span>
            </button>
          </div>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold p-2 min-h-[44px]"
          >
            Close Privacy Center
          </button>
        </div>
      </div>
    </div>
  );
};
