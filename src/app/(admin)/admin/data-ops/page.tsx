'use client';

import React, { useState } from 'react';
import { adminApi, CsvImportResult } from '../../../../lib/api/admin-api';
import { AdminHeader } from '../../../../components/admin/AdminHeader';
import { UploadCloud, CheckCircle2, AlertTriangle, FileText, Sparkles } from 'lucide-react';

export default function AdminDataOpsPage() {
  const [csvText, setCsvText] = useState<string>(
    `brand,category,size,chest_mm,waist_mm,length_mm\nSnitch,SHIRT_CASUAL,S,965,813,711\nSnitch,SHIRT_CASUAL,M,1016,864,724\nSnitch,SHIRT_CASUAL,L,1067,914,737\nSnitch,SHIRT_CASUAL,XL,1118,965,749`
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CsvImportResult | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleImport = async () => {
    if (!csvText.trim()) return;
    setIsProcessing(true);
    try {
      const res = await adminApi.importCsv(csvText);
      setResult(res);
      setNotification(`Processed ${res.totalRows} rows: ${res.validRows} valid.`);
    } catch (err: any) {
      setNotification(`Import failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Data Operations & Size Chart Ingestion"
        subtitle="Upload supplier CSVs or process automated extraction drafts with strict provenance and validation (DATA-002)."
      />

      {notification && (
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-indigo-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
          <button type="button" onClick={() => setNotification(null)} className="text-indigo-700">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CSV Ingestion Editor (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-black text-slate-900">CSV Matrix Importer</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">RFC 4180 Compliant</span>
          </div>

          <p className="text-xs text-slate-600">
            Paste raw tabular CSV data containing finished garment or bare body dimensions in millimeters.
          </p>

          <textarea
            rows={10}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl font-mono text-xs text-slate-800 outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <button
            type="button"
            onClick={handleImport}
            disabled={isProcessing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition disabled:opacity-50 min-h-[44px]"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isProcessing ? 'Validating CSV Rows...' : 'Validate & Import Batch'}</span>
          </button>
        </div>

        {/* Validation & AI Draft Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Validation Result Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900">Batch Inspection Summary</h3>

            {result ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="text-lg font-black text-slate-900">{result.totalRows}</div>
                    <div className="text-xs text-slate-500">Total Rows</div>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <div className="text-lg font-black text-emerald-700">{result.validRows}</div>
                    <div className="text-xs text-emerald-600">Valid</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <div className="text-lg font-black text-amber-700">{result.errorRows}</div>
                    <div className="text-xs text-amber-600">Errors</div>
                  </div>
                </div>

                {result.errors.length > 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-mono space-y-1">
                    {result.errors.map((err, i) => (
                      <div key={i}>&bull; {err}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-4 text-center">
                Submit a batch on the left to review validation diagnostics.
              </p>
            )}
          </div>

          {/* AI Extraction Protocol Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">AI Extraction Policy (ADR-016)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              AI extraction can suggest a draft size chart from supplier HTML or PDFs, but cannot publish it directly. A qualified operator must manually inspect monotonic increments and approve publication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

