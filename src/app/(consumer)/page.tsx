'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient, type SizeRecommendationResponse } from '../../lib/api-client';
import { SizeBadge } from '../../components/ui/SizeBadge';
import { MeasurementInput } from '../../components/ui/MeasurementInput';
import { FitVisualizer } from '../../components/ui/FitVisualizer';
import { PrivacyDrawer } from '../../components/ui/PrivacyDrawer';

export default function ConsumerHomePage() {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [chestVal, setChestVal] = useState<number | ''>(39.0);
  const [waistVal, setWaistVal] = useState<number | ''>(32.0);
  const [selectedBrand, setSelectedBrand] = useState('snitch');
  const [selectedCategory, setSelectedCategory] = useState('SHIRT_CASUAL');
  const [preference, setPreference] = useState<'SNUG' | 'REGULAR' | 'RELAXED'>('REGULAR');
  const [recommendation, setRecommendation] = useState<SizeRecommendationResponse | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const brands = [
    { slug: 'snitch', name: 'Snitch' },
    { slug: 'the-souled-store', name: 'The Souled Store' },
    { slug: 'allen-solly', name: 'Allen Solly' },
    { slug: 'bewakoof', name: 'Bewakoof' },
    { slug: 'fabindia', name: 'Fabindia' },
  ];

  // Recalculate recommendation whenever inputs change
  useEffect(() => {
    let cancelled = false;

    async function compute() {
      if (typeof chestVal !== 'number' || chestVal <= 0) {
        setRecommendation(null);
        return;
      }

      // Convert entered unit to canonical integer millimeters
      const chestMm = unit === 'in' ? Math.round(chestVal * 25.4) : Math.round(chestVal * 10);
      const measurements: Record<string, number> = { CHEST: chestMm };
      if (typeof waistVal === 'number' && waistVal > 0) {
        measurements['WAIST_TROUSER'] = unit === 'in' ? Math.round(waistVal * 25.4) : Math.round(waistVal * 10);
      }

      const res = await apiClient.getRecommendation({
        brandSlug: selectedBrand,
        categoryCode: selectedCategory,
        fitPreference: preference,
        measurements,
      });

      if (!cancelled) {
        setRecommendation(res);
      }
    }

    compute();
    return () => { cancelled = true; };
  }, [chestVal, waistVal, unit, selectedBrand, selectedCategory, preference]);

  const toggleUnit = () => {
    if (unit === 'in') {
      setUnit('cm');
      if (typeof chestVal === 'number') setChestVal(Math.round(chestVal * 2.54));
      if (typeof waistVal === 'number') setWaistVal(Math.round(waistVal * 2.54));
    } else {
      setUnit('in');
      if (typeof chestVal === 'number') setChestVal(Math.round((chestVal / 2.54) * 10) / 10);
      if (typeof waistVal === 'number') setWaistVal(Math.round((waistVal / 2.54) * 10) / 10);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Exact Fit &bull; Zero Photos
            </span>
            <span className="text-indigo-300 text-[11px]">&bull; DPDP Act 2023 Compliant</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight mt-1">
            FitMatch Sizing Intelligence
          </h1>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl">
            Deterministic anthropometric size matching for Indian retail apparel based on garment dimension tables.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPrivacyOpen(true)}
            className="text-xs bg-indigo-700/60 hover:bg-indigo-700 text-indigo-100 font-semibold px-3 py-2 rounded-xl transition border border-indigo-400/30"
          >
            Privacy Center
          </button>
          <Link
            href="/admin"
            className="text-xs bg-white text-indigo-900 font-bold px-4 py-2 rounded-xl shadow hover:bg-indigo-50 transition"
          >
            Operator Queue &rarr;
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Input Form */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Garment & Fit Selection
            </h2>
            <button
              type="button"
              onClick={toggleUnit}
              className="text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition"
            >
              Unit: {unit.toUpperCase()} (Switch)
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Retail Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
              >
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category & Silhouette
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
              >
                <option value="SHIRT_CASUAL">Casual Shirt (Slim Fit Cut)</option>
                <option value="SHIRT_FORMAL">Formal Shirt (Classic Regular Cut)</option>
                <option value="TSHIRT_REGULAR">Crew Neck T-Shirt (Regular)</option>
                <option value="TSHIRT_OVERSIZED">Oversized T-Shirt (Drop Shoulder)</option>
              </select>
            </div>

            <MeasurementInput
              label="Chest Measurement"
              sublabel="Measured horizontally around the fullest part of your chest."
              value={chestVal}
              unit={unit}
              onChange={setChestVal}
            />

            <MeasurementInput
              label="Waist Measurement (Optional)"
              sublabel="Measured around your natural waistline."
              value={waistVal}
              unit={unit}
              onChange={setWaistVal}
            />

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Fit Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['SNUG', 'REGULAR', 'RELAXED'] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setPreference(pref)}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      preference === pref
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {pref.charAt(0) + pref.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recommendation Result */}
        <div className="space-y-4">
          {recommendation && !recommendation.isAbstention && recommendation.recommendedSize ? (
            <div className="bg-white rounded-3xl p-6 border-2 border-indigo-600 shadow-lg space-y-5">
              <div className="flex justify-between items-center">
                <SizeBadge
                  status="OPTIMAL"
                  confidence={recommendation.confidenceScore}
                />
                <span className="text-[11px] font-mono text-slate-400">
                  ID: {recommendation.recommendationId.slice(0, 14)}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">
                  Recommended Size
                </span>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-5xl font-black text-slate-900">
                    SIZE {recommendation.recommendedSize}
                  </span>
                  {recommendation.runnerUpSize && (
                    <span className="text-xs text-slate-500 font-medium">
                      (Runner-up: Size {recommendation.runnerUpSize})
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100">
                {recommendation.explanation}
              </p>

              {recommendation.primaryMargins.length > 0 && (
                <FitVisualizer
                  margin={recommendation.primaryMargins[0]}
                  unit={unit}
                />
              )}

              {/* Feedback Prompt */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {feedbackSent ? 'Thank you for your feedback!' : 'How does this recommendation feel?'}
                </span>
                {!feedbackSent && (
                  <div className="flex space-x-1.5">
                    <button
                      type="button"
                      onClick={() => setFeedbackSent(true)}
                      className="text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
                    >
                      👍 Just Right
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackSent(true)}
                      className="text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
                    >
                      👎 Needs Adjustment
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-3">
              <span className="text-3xl">📏</span>
              <h3 className="text-sm font-bold text-slate-800">
                {recommendation?.abstentionReason || 'Enter your chest measurement to compute sizing'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                FitMatch uses mathematical ease formulas based on verified manufacturer chart tables.
              </p>
            </div>
          )}

          {/* Sizing Principles Footer */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="font-bold text-slate-700">Deterministic Engine Integrity:</div>
            <div>&bull; Pure mathematical loss function with asymmetric penalty for tight garments.</div>
            <div>&bull; 100% deterministic & reproducible; zero probabilistic LLMs in decision path.</div>
          </div>
        </div>
      </div>

      {/* Privacy Drawer Modal */}
      <PrivacyDrawer
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onDataErased={() => {
          setChestVal('');
          setWaistVal('');
          setRecommendation(null);
        }}
      />
    </div>
  );
}
