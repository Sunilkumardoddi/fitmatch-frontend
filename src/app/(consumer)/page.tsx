'use client';

import React, { useState, useEffect } from 'react';
import { consumerApi as apiClient, type SizeRecommendationResponse } from '../../lib/api/consumer-api';
import { SizeBadge } from '../../components/ui/SizeBadge';
import { MeasurementInput } from '../../components/ui/MeasurementInput';
import { FitVisualizer } from '../../components/ui/FitVisualizer';
import { PrivacyDrawer } from '../../components/ui/PrivacyDrawer';
import { GuidedMeasurementModal } from '../../components/ui/GuidedMeasurementModal';
import { GarmentCutVisualizer } from '../../components/consumer/GarmentCutVisualizer';
import { BodyMeasurementVisualGuide } from '../../components/consumer/BodyMeasurementVisualGuide';
import { GarmentFlatVisualGuide } from '../../components/consumer/GarmentFlatVisualGuide';
import { SizeSpectrumBar } from '../../components/consumer/SizeSpectrumBar';
import { ConsumerNavbar } from '../../components/consumer/ConsumerNavbar';
import { useLanguage } from '../../lib/i18n/LanguageContext';

export default function ConsumerHomePage() {
  const { t } = useLanguage();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [chestVal, setChestVal] = useState<number | ''>(39.0);
  const [waistVal, setWaistVal] = useState<number | ''>(32.0);
  const [selectedBrand, setSelectedBrand] = useState('snitch');
  const [selectedCategory, setSelectedCategory] = useState('SHIRT_CASUAL');
  const [preference, setPreference] = useState<'SNUG' | 'REGULAR' | 'RELAXED'>('REGULAR');
  const [recommendation, setRecommendation] = useState<SizeRecommendationResponse | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [feedbackState, setFeedbackState] = useState<'NONE' | 'ADJUSTMENT_NEEDED' | 'SUBMITTED'>('NONE');
  const [adjustmentFeedback, setAdjustmentFeedback] = useState<string>('');

  const brands = [
    { slug: 'snitch', name: 'Snitch', basis: 'Garment Dimension Basis', cut: 'Modern Slim / Tailored' },
    { slug: 'the-souled-store', name: 'The Souled Store', basis: 'Garment Dimension Basis', cut: 'Relaxed & Oversized' },
    { slug: 'allen-solly', name: 'Allen Solly', basis: 'Dual Body & Garment Basis', cut: 'Classic Executive' },
    { slug: 'bewakoof', name: 'Bewakoof', basis: 'Garment Dimension Basis', cut: 'Comfort Casual' },
    { slug: 'fabindia', name: 'Fabindia', basis: 'Body Basis + 6" Ease', cut: 'Artisanal Ethnic' },
    { slug: 'rare-rabbit', name: 'Rare Rabbit', basis: 'Garment Dimension Basis', cut: 'European Tailored' },
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

  const handleApplyPreset = (chest: number) => {
    setChestVal(chest);
    const element = document.getElementById('sizing-engine');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* 1. Full-Width Sticky Top Navigation Bar */}
      <ConsumerNavbar
        unit={unit}
        onUnitToggle={toggleUnit}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* 2. Fluid Full-Viewport Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-[#0A0F1D] via-[#111827] to-[#1E1B4B] text-white py-14 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-20">
          {/* Hero Left Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t('heroBadge1')}</span>
              </span>
              <span className="text-slate-300 text-xs bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                {t('heroBadge2')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight">
              {t('heroTitlePart1')} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-emerald-300 bg-clip-text text-transparent">
                {t('heroTitlePart2')}
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#sizing-engine"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm min-h-[48px] flex items-center space-x-2"
              >
                <span>{t('heroCtaCalc')}</span>
                <span>&darr;</span>
              </a>
              <button
                type="button"
                onClick={() => setIsGuideOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl border border-white/20 transition-all text-sm min-h-[48px] flex items-center space-x-2"
              >
                <span>📏 {t('heroCtaGuide')}</span>
              </button>
            </div>
          </div>

          {/* Hero Right: Live Interactive Quick-Match Card */}
          <div className="w-full lg:w-[480px] xl:w-[540px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-2xl text-white space-y-5 flex-shrink-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                {t('heroQuickMatch')}
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full font-bold">
                Snitch Casual Shirt
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-300 block">{t('heroRecSize')}</span>
                <span className="text-6xl font-black text-white tracking-tight">
                  {recommendation?.recommendedSize || 'L'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-300 block">{t('heroYourChest')}</span>
                <span className="text-2xl font-bold font-mono text-emerald-300">
                  {typeof chestVal === 'number' ? `${chestVal} ${unit}` : `-- ${unit}`}
                </span>
              </div>
            </div>

            <div className="bg-black/30 rounded-2xl p-4 border border-white/10 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300 text-xs">
                <span>{t('heroGarmentDim')}</span>
                <span className="font-mono font-bold text-white">
                  {recommendation?.primaryMargins?.[0]
                    ? `${(recommendation.primaryMargins[0].garmentDimensionMm / (unit === 'in' ? 25.4 : 10)).toFixed(1)} ${unit}`
                    : `42.0 ${unit}`}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400 text-xs font-semibold">
                <span>{t('heroErgoEase')}</span>
                <span className="font-mono">
                  {recommendation?.primaryMargins?.[0]
                    ? `+${recommendation.primaryMargins[0].easeInches}" (${recommendation.primaryMargins[0].easeMm} mm)`
                    : `+3.0" (76 mm)`}
                </span>
              </div>
            </div>

            {/* Live Fast Presets */}
            <div className="space-y-2 pt-1">
              <span className="text-xs text-slate-300 block font-semibold">{t('heroPresetsLabel')}</span>
              <div className="grid grid-cols-4 gap-2">
                {[38.0, 39.0, 40.0, 42.0].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleApplyPreset(unit === 'in' ? val : Math.round(val * 2.54))}
                    className="py-2 px-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-center border border-white/15 transition min-h-[40px]"
                  >
                    {unit === 'in' ? `${val}"` : `${Math.round(val * 2.54)}cm`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Trust Strip */}
        <div className="w-full mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center select-none">
          <div>
            <span className="block text-2xl sm:text-4xl font-black text-white">{t('metricBrands')}</span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">{t('metricBrandsSub')}</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-4xl font-black text-emerald-400">{t('metricPhotos')}</span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">{t('metricPhotosSub')}</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-4xl font-black text-indigo-300">{t('metricEase')}</span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">{t('metricEaseSub')}</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-4xl font-black text-white">{t('metricSpeed')}</span>
            <span className="text-xs sm:text-sm text-slate-400 mt-1 block">{t('metricSpeedSub')}</span>
          </div>
        </div>
      </section>

      {/* 3. Fluid Full-Viewport Sizing Engine Canvas */}
      <main id="sizing-engine" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-full">
              {t('enginePill')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2.5">
              {t('engineTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('engineSub')}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleUnit}
            className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-5 py-2.5 rounded-xl transition min-h-[44px] flex items-center space-x-2"
          >
            <span>{t('activeUnitLabel')}</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded shadow-sm text-indigo-900 font-black">
              {unit.toUpperCase()}
            </span>
            <span>{t('clickToSwitch')}</span>
          </button>
        </div>

        {/* 12-Column Responsive Sizing Grid Spanning Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start w-full">
          {/* Left Column: Inputs & Interactive Visual Cut (5 cols) */}
          <section aria-labelledby="garment-input-heading" className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 id="garment-input-heading" className="text-xs font-bold uppercase tracking-wider text-slate-600 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>{t('step1Heading')}</span>
              <span className="text-indigo-600 font-bold">{t('inputPanel')}</span>
            </h3>

            <div className="space-y-5">
              {/* Brand Selector */}
              <div>
                <label htmlFor="brand-dropdown" className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t('selectBrandLabel')}
                </label>
                <select
                  id="brand-dropdown"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs sm:text-sm font-bold border border-slate-300 rounded-xl p-3.5 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600 min-h-[48px] transition text-slate-900"
                >
                  {brands.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} ({b.basis})
                    </option>
                  ))}
                </select>
              </div>

              {/* Garment Category & Cut */}
              <div>
                <label htmlFor="category-dropdown" className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t('selectCategoryLabel')}
                </label>
                <select
                  id="category-dropdown"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm font-bold border border-slate-300 rounded-xl p-3.5 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600 min-h-[48px] transition text-slate-900"
                >
                  <option value="SHIRT_CASUAL">Casual Shirt (Modern Slim: +3.0" Ease)</option>
                  <option value="SHIRT_FORMAL">Formal Dress Shirt (Classic Cut: +4.0" Ease)</option>
                  <option value="TSHIRT_REGULAR">Crew Neck T-Shirt (Regular Fit: +2.0" Ease)</option>
                  <option value="TSHIRT_OVERSIZED">Oversized Streetwear Tee (Drop Shoulder: +6.0" Ease)</option>
                </select>
              </div>

              {/* Interactive Vector Pattern Cut Visualizer */}
              <GarmentCutVisualizer
                categoryCode={selectedCategory}
                unit={unit}
                onGuideClick={() => setIsGuideOpen(true)}
              />

              {/* Measurement Inputs */}
              <MeasurementInput
                id="chest-measure"
                label={t('chestLabel')}
                sublabel={t('chestSub')}
                value={chestVal}
                unit={unit}
                onChange={setChestVal}
                onOpenGuide={() => setIsGuideOpen(true)}
              />

              <MeasurementInput
                id="waist-measure"
                label={t('waistLabel')}
                sublabel={t('waistSub')}
                value={waistVal}
                unit={unit}
                onChange={setWaistVal}
                onOpenGuide={() => setIsGuideOpen(true)}
              />

              {/* Fit Preference Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {t('fitPrefLabel')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['SNUG', 'REGULAR', 'RELAXED'] as const).map((pref) => {
                    const prefLabels = {
                      SNUG: t('prefSnug'),
                      REGULAR: t('prefRegular'),
                      RELAXED: t('prefRelaxed'),
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
                        {prefLabels[pref]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Sizing Recommendation Output & Visual Ease (7 cols) */}
          <section aria-labelledby="recommendation-heading" className="lg:col-span-7 space-y-6">
            {recommendation && !recommendation.isAbstention && recommendation.recommendedSize ? (
              <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-indigo-600 shadow-md space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <SizeBadge
                    status="OPTIMAL"
                    showPercentage={false}
                  />
                  <span className="text-xs text-slate-500 font-semibold">
                    {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} {t('spectrumLabel')}
                  </span>
                </div>

                <div>
                  <h3 id="recommendation-heading" className="text-xs uppercase font-bold tracking-wider text-slate-500">
                    {t('recFitHeading')}
                  </h3>
                  <div className="flex flex-wrap items-baseline gap-4 mt-2">
                    <span className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight">
                      {recommendation.recommendedSize}
                    </span>
                    <span className="text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
                      {preference} {t('fitCalibrated')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    {t('mappedAgainst')}
                  </p>
                </div>

                {/* Visual Brand Size Spectrum & Ease Curve */}
                <SizeSpectrumBar
                  recommendedSize={recommendation.recommendedSize}
                  brandName={selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}
                  unit={unit}
                />

                <div className="bg-indigo-50/80 border border-indigo-200 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1.5">
                  <div className="font-bold text-indigo-950 text-sm sm:text-base">{t('whyWeRec')} {recommendation.recommendedSize}:</div>
                  <p>{recommendation.explanation}</p>
                </div>

                {/* Torso Cross-Section & Design Ease Visualizer */}
                {recommendation.primaryMargins.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t('easeTorsoHeading')}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1 py-1"
                      >
                        <span>{showDetails ? t('hideDetails') : t('showDetails')}</span>
                      </button>
                    </div>

                    {showDetails && (
                      <FitVisualizer
                        margin={recommendation.primaryMargins[0]}
                        unit={unit}
                        dimensionLabel="Chest"
                        preference={preference}
                      />
                    )}
                  </div>
                )}

                {/* Fit Feedback Section */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-700">
                      {t('feedbackPrompt')} {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}?
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setFeedbackState('SUBMITTED')}
                        className={`text-xs font-bold px-4 py-2 rounded-xl border transition min-h-[44px] ${
                          feedbackState === 'SUBMITTED'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t('btnGoodFit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedbackState('ADJUSTMENT_NEEDED')}
                        className={`text-xs font-bold px-4 py-2 rounded-xl border transition min-h-[44px] ${
                          feedbackState === 'ADJUSTMENT_NEEDED'
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t('btnNeedsAdj')}
                      </button>
                    </div>
                  </div>

                  {feedbackState === 'ADJUSTMENT_NEEDED' && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs">
                      <label htmlFor="feedback-input" className="font-bold text-amber-900 block">
                        What felt different?
                      </label>
                      <div className="flex space-x-2">
                        <input
                          id="feedback-input"
                          type="text"
                          value={adjustmentFeedback}
                          onChange={(e) => setAdjustmentFeedback(e.target.value)}
                          placeholder="e.g., Felt tighter in shoulders than expected"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => setFeedbackState('SUBMITTED')}
                          className="bg-amber-600 text-white font-bold px-5 py-2.5 rounded-lg text-xs whitespace-nowrap min-h-[44px]"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}

                  {feedbackState === 'SUBMITTED' && (
                    <p className="text-xs text-emerald-700 font-semibold" role="status">
                      {t('feedbackThanks')}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Helpful Abstention Guidance */
              <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm space-y-5 text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mx-auto text-amber-600 text-3xl">
                  📏
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {t('abstentionPrompt')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                  {t('abstentionSub')}
                </p>
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl transition text-xs sm:text-sm shadow-sm min-h-[44px]"
                >
                  {t('heroCtaGuide')}
                </button>
              </div>
            )}
          </section>
        </div>

        {/* 4. Fluid Full-Width Interactive Visual Measurement Showcase Section */}
        <section id="visual-guides" className="w-full bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800 space-y-8">
          <div className="border-b border-slate-800 pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-3.5 py-1.5 rounded-full">
              {t('showcasePill')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
              {t('showcaseTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t('showcaseSub')}
            </p>
          </div>

          {/* Side-by-Side Dual Interactive Visual Guides on Wide Screens */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                {t('methodA')}
              </span>
              <BodyMeasurementVisualGuide
                activeZone="CHEST"
                chestVal={chestVal}
                waistVal={waistVal}
                unit={unit}
                interactive={true}
              />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                {t('methodB')}
              </span>
              <GarmentFlatVisualGuide
                pitToPitVal={unit === 'in' ? 21.0 : 53.0}
                unit={unit}
                interactive={true}
              />
            </div>
          </div>
        </section>

        {/* 5. Fluid Supported Retail Brands Directory Across Full Width */}
        <section id="supported-brands" className="w-full space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-full">
              {t('brandDirPill')}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('brandDirTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t('brandDirSub')}
            </p>
          </div>

          {/* 6-Column Grid Spanning Full Viewport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
            {brands.map((b) => {
              const isSelected = selectedBrand === b.slug;
              return (
                <div
                  key={b.slug}
                  onClick={() => {
                    setSelectedBrand(b.slug);
                    const el = document.getElementById('sizing-engine');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/90 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-black text-slate-900 text-base">{b.name}</h4>
                      {isSelected && (
                        <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                          {t('activeBrand')}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-indigo-700 bg-slate-50 border border-indigo-200 px-2.5 py-1 rounded-lg inline-block mb-2">
                      {b.basis}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {t('cutLabel')} <strong className="text-slate-700">{b.cut}</strong>
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 6. Modals & Overlays */}
      <GuidedMeasurementModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        unit={unit}
        onApplyMeasurement={(val) => {
          setChestVal(val);
          setIsGuideOpen(false);
        }}
      />

      <PrivacyDrawer
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
