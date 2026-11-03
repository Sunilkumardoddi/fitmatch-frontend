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
    if (!confirm('Are you sure you want to permanently erase all your measurements and profile data under DPDP Act 2023? This action cannot be undone.')) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Indian DPDP Act 2023 Compliant
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Your Privacy & Data Rights
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 rounded-full hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <p>
            <strong>Zero Biometrics:</strong> FitMatch never captures, stores, or processes camera photos, 3D body scans, or facial biometrics.
          </p>
          <p>
            <strong>Manual Tape Only:</strong> Sizing recommendations are computed strictly from your manual tape measurements and manufacturer garment dimension tables.
          </p>
          <p>
            <strong>Zero Analytics Measure Exposure:</strong> Your numerical millimeter dimensions are never shared with advertisers or third parties.
          </p>
        </div>

        {erasedSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 text-xs font-semibold text-center">
            ✓ All profile data and measurements have been permanently hard-erased from memory and database.
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl transition"
            >
              <span>{downloading ? 'Preparing Archive...' : 'Download Personal Data Archive (Section 11)'}</span>
            </button>

            <button
              type="button"
              onClick={handleErase}
              disabled={erasing}
              className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs py-3 px-4 rounded-xl border border-rose-200 transition"
            >
              <span>{erasing ? 'Erasing...' : 'Permanent Hard Erasure (Section 12 - Right to be Forgotten)'}</span>
            </button>
          </div>
        )}

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 font-medium"
          >
            Close Privacy Center
          </button>
        </div>
      </div>
    </div>
  );
};

