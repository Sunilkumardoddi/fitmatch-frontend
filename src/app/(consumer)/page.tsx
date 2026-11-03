'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient, type SizeRecommendationResponse } from '../../lib/api-client';
import { SizeBadge } from '../../components/ui/SizeBadge';
import { MeasurementInput } from '../../components/ui/MeasurementInput';
import { FitVisualizer } from '../../components/ui/FitVisualizer';
import { PrivacyDrawer } from '../../components/ui/PrivacyDrawer';
import { GuidedMeasurementModal } from '../../components/ui/GuidedMeasurementModal';

export default function ConsumerHomePage() {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [chestVal, setChestVal] = useState<number | ''>(39.0);
  const [waistVal, setWaistVal] = useState<number | ''>(32.0);
  const [selectedBrand, setSelectedBrand] = useState('snitch');
  const [selectedCategory, setSelectedCategory] = useState('SHIRT_CASUAL');
  const [preference, setPreference] = useState<'SNUG' | 'REGULAR' | 'RELAXED'>('REGULAR');
  const [recommendation, setRecommendation] = useState<SizeRecommendationResponse | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'NONE' | 'ADJUSTMENT_NEEDED' | 'SUBMITTED'>('NONE');
  const [adjustmentFeedback, setAdjustmentFeedback] = useState<string>('');

  const brands = [
    { slug: 'snitch', name: 'Snitch (Garment Dimension Basis)' },
    { slug: 'the-souled-store', name: 'The Souled Store (Garment Dimension Basis)' },
    { slug: 'allen-solly', name: 'Allen Solly (Dual Body & Garment Basis)' },
    { slug: 'bewakoof', name: 'Bewakoof (Garment Dimension Basis)' },
    { slug: 'fabindia', name: 'Fabindia (Body Basis + 6" Ease)' },
    { slug: 'rare-rabbit', name: 'Rare Rabbit (Garment Dimension Basis)' },
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
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Brand Banner */}
      <header className="bg-[#172B4D] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Body-Neutral Sizing &bull; Zero Photos
            </span>
            <span className="text-slate-300 text-xs">&bull; DPDP Act 2023 Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Find your perfect fit.
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Discover the size that fits you across your favorite brands. Better fit. Less guesswork. We map your dimensions against published manufacturer garment specifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl transition border border-white/20 min-h-[48px] flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>📏 Measurement Guide</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPrivacyOpen(true)}
            className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl transition border border-white/20 min-h-[48px] flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>🔒 Privacy Center</span>
          </button>
          <Link
            href="/admin"
            className="text-xs bg-[#4263EB] hover:bg-indigo-600 text-white font-bold px-4 py-3 rounded-xl shadow-md transition min-h-[48px] flex items-center space-x-1 focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Operator Queue &rarr;</span>
          </Link>
        </div>
      </header>

      {/* Main 2-Column Responsive Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Garment & Measurement Inputs (5 cols) */}
        <section aria-labelledby="garment-input-heading" className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 id="garment-input-heading" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Garment & Measurement Input
            </h2>
            <button
              type="button"
              onClick={toggleUnit}
              className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg transition min-h-[36px]"
            >
              Unit: {unit.toUpperCase()} (Switch)
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="brand-dropdown" className="block text-xs font-bold text-slate-800 mb-1">
                Select Retail Brand
              </label>
              <select
                id="brand-dropdown"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-300 rounded-xl p-3.5 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600 min-h-[48px] transition"
              >
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category-dropdown" className="block text-xs font-bold text-slate-800 mb-1">
                Garment Category & Cut
              </label>
              <select
                id="category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-300 rounded-xl p-3.5 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600 min-h-[48px] transition"
              >
                <option value="SHIRT_CASUAL">Casual Shirt (Slim Fit: +3.0" Design Ease)</option>
                <option value="SHIRT_FORMAL">Formal Dress Shirt (Classic Cut: +4.0" Design Ease)</option>
                <option value="TSHIRT_REGULAR">Crew Neck T-Shirt (Regular: +2.0" Design Ease)</option>
                <option value="TSHIRT_OVERSIZED">Oversized T-Shirt (Drop Shoulder: +6.0" Design Ease)</option>
              </select>
            </div>

            <MeasurementInput
              id="chest-measure"
              label="Chest Measurement (Required)"
              sublabel="Measured horizontally around the fullest part of your chest with soft tape."
              value={chestVal}
              unit={unit}
              onChange={setChestVal}
              onOpenGuide={() => setIsGuideOpen(true)}
            />

            <MeasurementInput
              id="waist-measure"
              label="Waist Measurement (Optional)"
              sublabel="Measured around your natural waistline above your hip bones."
              value={waistVal}
              unit={unit}
              onChange={setWaistVal}
              onOpenGuide={() => setIsGuideOpen(true)}
            />

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Fit Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['SNUG', 'REGULAR', 'RELAXED'] as const).map((pref) => {
                  const labels = {
                    SNUG: 'Snug',
                    REGULAR: 'Regular',
                    RELAXED: 'Relaxed',
                  };
                  const isSelected = preference === pref;
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setPreference(pref)}
                      className={`py-3 px-2 text-xs font-bold rounded-xl border transition min-h-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {labels[pref]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Sizing Recommendation Output (7 cols) */}
        <section aria-labelledby="recommendation-heading" className="lg:col-span-7 space-y-5">
          {recommendation && !recommendation.isAbstention && recommendation.recommendedSize ? (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-indigo-600 shadow-md space-y-5">
              <div className="flex justify-between items-center">
                <SizeBadge
                  status="OPTIMAL"
                  showPercentage={false}
                />
                <span className="text-xs text-slate-500 font-medium">
                  {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Size Spectrum
                </span>
              </div>

              <div>
                <h2 id="recommendation-heading" className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  Your recommended size
                </h2>
                <div className="flex flex-wrap items-baseline gap-3 mt-1">
                  <span className="text-5xl font-black text-slate-900 tracking-tight">
                    {recommendation.recommendedSize}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Based on your measurements and this brand's available sizing information.
                </p>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-200/80 p-4 rounded-2xl text-xs text-slate-800 leading-relaxed space-y-1">
                <div className="font-bold text-indigo-900">Why we recommend {recommendation.recommendedSize}:</div>
                <p>{recommendation.explanation}</p>
              </div>

              {/* Progressive Disclosure Toggle (UI_UX_INTERACTION_STANDARD.md Rule 3 & §9.6) */}
              {recommendation.primaryMargins.length > 0 && (
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1 py-1 focus-visible:ring-2 focus-visible:ring-indigo-600 rounded"
                  >
                    <span>{showDetails ? 'Hide measurement details ▴' : 'View measurement details ▾'}</span>
                  </button>

                  {showDetails && (
                    <div className="animate-in fade-in duration-200 pt-1">
                      <FitVisualizer
                        margin={recommendation.primaryMargins[0]}
                        unit={unit}
                        dimensionLabel="Chest"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Fit Feedback Section (UI_UX_INTERACTION_STANDARD.md §9.8) */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-700">
                    {feedbackState === 'SUBMITTED'
                      ? '✓ Thank you! Your feedback helps calibrate future recommendations.'
                      : 'Does this size feel right?'}
                  </span>
                  {feedbackState === 'NONE' && (
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setFeedbackState('SUBMITTED')}
                        className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 transition min-h-[44px] focus-visible:ring-2 focus-visible:ring-indigo-600"
                      >
                        Looks good
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedbackState('ADJUSTMENT_NEEDED')}
                        className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 transition min-h-[44px] focus-visible:ring-2 focus-visible:ring-indigo-600"
                      >
                        Not quite
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up for "Not quite" per §9.8 */}
                {feedbackState === 'ADJUSTMENT_NEEDED' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 animate-in fade-in duration-150">
                    <span className="text-xs font-bold text-slate-800 block">Tell us what feels off:</span>
                    <div className="flex flex-wrap gap-2">
                      {['Too tight', 'Too loose', 'Too short', 'Too long', 'Something else'].map((reason) => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => {
                            setAdjustmentFeedback(reason);
                            setFeedbackState('SUBMITTED');
                          }}
                          className="text-xs bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-300 transition min-h-[36px]"
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Graceful Abstention State */
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
              <span className="text-4xl block" aria-hidden="true">📏</span>
              <h2 id="recommendation-heading" className="text-base font-bold text-slate-900">
                {recommendation?.abstentionReason || 'Please enter your chest measurement to compute sizing'}
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                FitMatch never guesses or invents sizes. We abstain gracefully when required dimensions are absent, ensuring you receive only verifiable recommendations.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition min-h-[48px]"
                >
                  Open Measurement Guide
                </button>
                <button
                  type="button"
                  onClick={() => setChestVal(39.0)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 rounded-xl transition min-h-[48px]"
                >
                  Restore 39.0" Default
                </button>
              </div>
            </div>
          )}

          {/* Honest Disclaimer Card (UI_UX_INTERACTION_STANDARD.md Principle 2) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5 leading-relaxed">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <span>ℹ️</span>
              <span>Transparent Fit Notice</span>
            </div>
            <p>
              Recommendations are computed mathematically from published brand garment specifications. Garment fit may vary based on fabric stretch, pre-wash treatment, and standard apparel manufacturing tolerances ($\pm 0.5''$).
            </p>
          </div>
        </section>
      </main>

      {/* Guided Measurement Modal (Flow A & Flow B) */}
      <GuidedMeasurementModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        unit={unit}
        onApplyMeasurement={(val) => {
          setChestVal(val);
        }}
      />

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
