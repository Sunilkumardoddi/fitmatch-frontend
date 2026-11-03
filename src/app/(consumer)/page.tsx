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
      const measurements: Record<string, number> = { CHECH: chestMm, CHEST: chestMm };
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
    <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col text-neutral-900">
      {/* 1. Sticky Navigation Bar */}
      <ConsumerNavbar
        unit={unit}
        onUnitToggle={toggleUnit}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 01: HERO & LIVE TRUST LEDGER
          Function in Background: Anatomical Tape Anchor & Pure Math Calibration
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative w-full bg-atelier-hero py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none border-b border-neutral-200/80">
        {/* Background Functional Watermark: Anchor Objective */}
        <div className="absolute right-4 -bottom-6 text-[14vw] font-black font-mono text-neutral-900/[0.018] select-none pointer-events-none tracking-tighter leading-none">
          01 // TAPE ANCHOR
        </div>

        {/* Top Function Objective Stamp */}
        <div className="absolute top-4 right-4 sm:right-8 lg:right-16 hidden md:flex items-center space-x-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest border border-dashed border-neutral-300/80 px-2.5 py-1 rounded bg-white/60">
          <span>OBJECTIVE: BIOMETRIC-FREE ANATOMICAL MAPPING</span>
          <span>•</span>
          <span>DPDP COMPLIANT</span>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 xl:gap-20 relative z-10">
          {/* Hero Left Content — Editorial Typography */}
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-medium tracking-wider text-neutral-600 bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 rounded-md">
              <span className="font-bold text-neutral-900">01 /</span>
              <span>{t('heroBadge1')}</span>
              <span className="text-neutral-400">•</span>
              <span>{t('heroBadge2')}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-neutral-900 leading-[1.06]">
                {t('heroTitlePart1')}
              </h1>
              <p className="font-editorial italic text-2xl sm:text-4xl text-neutral-600 font-normal leading-snug">
                {t('heroTitlePart2')}
              </p>
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#sizing-engine"
                className="bg-black hover:bg-neutral-800 text-white font-medium px-8 py-4 rounded-xl text-sm transition shadow-sm flex items-center space-x-2 min-h-[48px]"
              >
                <span>{t('heroCtaCalc')}</span>
                <span>&darr;</span>
              </a>
              <button
                type="button"
                onClick={() => setIsGuideOpen(true)}
                className="bg-white hover:bg-neutral-50 text-neutral-900 font-medium px-6 py-4 rounded-xl border border-neutral-300 hover:border-black text-sm transition min-h-[48px] flex items-center space-x-2"
              >
                <span>📏 {t('heroCtaGuide')}</span>
              </button>
            </div>
          </div>

          {/* Hero Right: Tactile Garment Spec Sheet */}
          <div className="w-full lg:w-[460px] xl:w-[500px] bg-white border border-neutral-200/90 rounded-2xl p-7 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] text-neutral-900 space-y-6 flex-shrink-0">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                {t('heroQuickMatch')}
              </span>
              <span className="text-xs bg-neutral-100 text-neutral-800 border border-neutral-200 px-3 py-1 rounded-full font-mono font-medium">
                Snitch Casual Shirt
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">{t('heroRecSize')}</span>
                <span className="text-6xl font-black text-neutral-900 tracking-tight">
                  {recommendation?.recommendedSize || 'L'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">{t('heroYourChest')}</span>
                <span className="text-2xl font-mono font-bold text-neutral-900">
                  {typeof chestVal === 'number' ? `${chestVal} ${unit}` : `-- ${unit}`}
                </span>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/80 text-xs space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>{t('heroGarmentDim')}</span>
                <span className="font-mono font-bold text-neutral-900">
                  {recommendation?.primaryMargins?.[0]
                    ? `${(recommendation.primaryMargins[0].garmentDimensionMm / (unit === 'in' ? 25.4 : 10)).toFixed(1)} ${unit}`
                    : `42.0 ${unit}`}
                </span>
              </div>
              <div className="flex justify-between text-neutral-900 font-semibold">
                <span>{t('heroErgoEase')}</span>
                <span className="font-mono text-emerald-800">
                  {recommendation?.primaryMargins?.[0]
                    ? `+${recommendation.primaryMargins[0].easeInches}" (${recommendation.primaryMargins[0].easeMm} mm)`
                    : `+3.0" (76 mm)`}
                </span>
              </div>
            </div>

            {/* Tactile Fabric Swatch Presets */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block font-semibold">{t('heroPresetsLabel')}</span>
              <div className="grid grid-cols-4 gap-2">
                {[38.0, 39.0, 40.0, 42.0].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleApplyPreset(unit === 'in' ? val : Math.round(val * 2.54))}
                    className="py-2.5 px-2 bg-white hover:bg-black hover:text-white rounded-lg text-xs font-mono font-medium text-center border border-neutral-200 transition min-h-[38px]"
                  >
                    {unit === 'in' ? `${val}"` : `${Math.round(val * 2.54)}cm`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Trust Strip */}
        <div className="w-full mt-16 pt-10 border-t border-neutral-200/80 grid grid-cols-2 md:grid-cols-4 gap-8 text-left select-none relative z-10">
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-400 block">01 / RETAIL</span>
            <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">{t('metricBrands')}</span>
            <span className="text-xs text-neutral-500 block">{t('metricBrandsSub')}</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-400 block">02 / PRIVACY</span>
            <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">{t('metricPhotos')}</span>
            <span className="text-xs text-neutral-500 block">{t('metricPhotosSub')}</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-400 block">03 / CALIBRATION</span>
            <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">{t('metricEase')}</span>
            <span className="text-xs text-neutral-500 block">{t('metricEaseSub')}</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-400 block">04 / LATENCY</span>
            <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">{t('metricSpeed')}</span>
            <span className="text-xs text-neutral-500 block">{t('metricSpeedSub')}</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          CHAPTER RIBBON DIVIDER: SECTION 01 → SECTION 02
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-neutral-100/90 border-y border-neutral-200 py-3.5 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between text-xs font-mono text-neutral-500 select-none">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-neutral-900 rounded-full" />
          <span className="font-bold text-neutral-900">CHAPTER II</span>
          <span className="text-neutral-300">/</span>
          <span className="hidden sm:inline">DETERMINISTIC SIZING ENGINE</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="hidden md:inline text-neutral-400">CALIBRATED MARGIN MATRIX</span>
          <span className="hidden md:inline text-neutral-300">•</span>
          <span className="text-neutral-900 font-semibold">[ DRAFTING BENCH ]</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 02: SIZING CALCULATOR & EASE ENGINE
          Function in Background: Pattern-Maker's Cutting Mat & Drafting Table Grid
      ────────────────────────────────────────────────────────────────────────── */}
      <main id="sizing-engine" className="relative w-full bg-drafting-mat py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-neutral-200/80 space-y-12 overflow-hidden">
        {/* Background Cutting Mat Watermark: Objective Identifiers */}
        <div className="absolute left-6 top-8 text-[12vw] font-black font-mono text-neutral-900/[0.018] select-none pointer-events-none tracking-tight leading-none">
          02 // PATTERN BENCH
        </div>

        {/* Cutting Mat Calibration Ruler Strip on Top Edge */}
        <div className="absolute top-0 left-0 right-0 h-4 border-b border-neutral-200/60 hidden sm:flex items-end justify-between px-6 text-[8px] font-mono text-neutral-400 select-none pointer-events-none bg-neutral-50/70">
          <span>| 00 CM</span>
          <span>| 10</span>
          <span>| 20</span>
          <span>| 30</span>
          <span>| 40</span>
          <span>| 50 (DATUM CENTER)</span>
          <span>| 60</span>
          <span>| 70</span>
          <span>| 80</span>
          <span>| 90</span>
          <span>| 100 CM |</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-neutral-200 pb-6 relative z-10 pt-2">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-medium tracking-wider text-neutral-600 mb-2">
              <span className="font-bold text-neutral-900">02 /</span>
              <span>{t('enginePill')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              {t('engineTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
              {t('engineSub')}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Functional Purpose Stamp */}
            <div className="hidden lg:flex items-center space-x-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest border border-dashed border-neutral-300 px-3 py-2 rounded bg-white/90">
              <span>STATION: DRAFTING MAT</span>
              <span>•</span>
              <span>+2.0" TO +6.0" EASE MATRIX</span>
            </div>

            <button
              type="button"
              onClick={toggleUnit}
              className="text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black px-4 py-2.5 rounded-lg transition min-h-[40px] flex items-center space-x-2 shadow-sm"
            >
              <span>{t('activeUnitLabel')}</span>
              <span className="font-mono bg-neutral-100 px-2 py-0.5 rounded text-black font-bold">
                {unit.toUpperCase()}
              </span>
              <span className="text-neutral-400">{t('clickToSwitch')}</span>
            </button>
          </div>
        </div>

        {/* 12-Column Responsive Sizing Grid Spanning Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start w-full relative z-10">
          {/* Left Column: Inputs & Interactive Visual Cut (5 cols) */}
          <section aria-labelledby="garment-input-heading" className="lg:col-span-5 bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <h3 id="garment-input-heading" className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 pb-3 border-b border-neutral-100 flex items-center justify-between">
              <span>{t('step1Heading')}</span>
              <span className="text-neutral-900 font-bold">{t('inputPanel')}</span>
            </h3>

            <div className="space-y-5">
              {/* Brand Selector */}
              <div>
                <label htmlFor="brand-dropdown" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                  {t('selectBrandLabel')}
                </label>
                <select
                  id="brand-dropdown"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium border border-neutral-300 rounded-xl p-3.5 bg-white focus:border-black focus:ring-1 focus:ring-black outline-none min-h-[48px] transition text-neutral-900"
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
                <label htmlFor="category-dropdown" className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                  {t('selectCategoryLabel')}
                </label>
                <select
                  id="category-dropdown"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium border border-neutral-300 rounded-xl p-3.5 bg-white focus:border-black focus:ring-1 focus:ring-black outline-none min-h-[48px] transition text-neutral-900"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                  {t('fitPrefLabel')}
                </label>
                <div className="grid grid-cols-3 gap-2 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
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
                        className={`py-2.5 px-2 text-xs font-medium rounded-lg transition min-h-[40px] flex items-center justify-center ${
                          isSelected
                            ? 'bg-black text-white font-bold shadow-sm'
                            : 'text-neutral-700 hover:text-black'
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
              <div className="bg-white rounded-2xl p-7 sm:p-9 border-2 border-neutral-900 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                  <SizeBadge
                    status="OPTIMAL"
                    showPercentage={false}
                  />
                  <span className="text-xs font-mono text-neutral-500 font-medium">
                    {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} {t('spectrumLabel')}
                  </span>
                </div>

                <div>
                  <h3 id="recommendation-heading" className="text-xs uppercase font-mono font-semibold tracking-wider text-neutral-400">
                    {t('recFitHeading')}
                  </h3>
                  <div className="flex flex-wrap items-baseline gap-4 mt-2">
                    <span className="text-6xl sm:text-7xl font-black text-neutral-900 tracking-tight">
                      {recommendation.recommendedSize}
                    </span>
                    <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                      {preference} {t('fitCalibrated')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1.5">
                    {t('mappedAgainst')}
                  </p>
                </div>

                {/* Visual Brand Size Spectrum & Ease Curve */}
                <SizeSpectrumBar
                  recommendedSize={recommendation.recommendedSize}
                  brandName={selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}
                  unit={unit}
                />

                <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-xl text-xs sm:text-sm text-neutral-800 leading-relaxed space-y-1.5">
                  <div className="font-bold text-neutral-900 text-sm sm:text-base">{t('whyWeRec')} {recommendation.recommendedSize}:</div>
                  <p>{recommendation.explanation}</p>
                </div>

                {/* Torso Cross-Section & Design Ease Visualizer */}
                {recommendation.primaryMargins.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        {t('easeTorsoHeading')}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-xs font-medium text-neutral-600 hover:text-black flex items-center space-x-1 py-1 underline"
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
                <div className="pt-4 border-t border-neutral-200 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs font-medium text-neutral-700">
                      {t('feedbackPrompt')} {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}?
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setFeedbackState('SUBMITTED')}
                        className={`text-xs font-medium px-4 py-2 rounded-lg border transition min-h-[40px] ${
                          feedbackState === 'SUBMITTED'
                            ? 'bg-black text-white border-black font-semibold'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                        }`}
                      >
                        {t('btnGoodFit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedbackState('ADJUSTMENT_NEEDED')}
                        className={`text-xs font-medium px-4 py-2 rounded-lg border transition min-h-[40px] ${
                          feedbackState === 'ADJUSTMENT_NEEDED'
                            ? 'bg-neutral-900 text-white border-black font-semibold'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                        }`}
                      >
                        {t('btnNeedsAdj')}
                      </button>
                    </div>
                  </div>

                  {feedbackState === 'ADJUSTMENT_NEEDED' && (
                    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2 text-xs">
                      <label htmlFor="feedback-input" className="font-semibold text-neutral-900 block">
                        What felt different?
                      </label>
                      <div className="flex space-x-2">
                        <input
                          id="feedback-input"
                          type="text"
                          value={adjustmentFeedback}
                          onChange={(e) => setAdjustmentFeedback(e.target.value)}
                          placeholder="e.g., Felt tighter in shoulders than expected"
                          className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-xs outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setFeedbackState('SUBMITTED')}
                          className="bg-black hover:bg-neutral-800 text-white font-medium px-5 py-2.5 rounded-lg text-xs whitespace-nowrap min-h-[40px]"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}

                  {feedbackState === 'SUBMITTED' && (
                    <p className="text-xs text-emerald-800 font-medium" role="status">
                      {t('feedbackThanks')}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Helpful Abstention Guidance */
              <div className="bg-white rounded-2xl p-10 border border-neutral-200 shadow-sm space-y-5 text-center">
                <div className="w-14 h-14 bg-neutral-100 rounded-xl border border-neutral-200 flex items-center justify-center mx-auto text-neutral-800 text-2xl">
                  📏
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {t('abstentionPrompt')}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
                  {t('abstentionSub')}
                </p>
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="bg-black hover:bg-neutral-800 text-white font-medium px-6 py-3.5 rounded-xl transition text-xs sm:text-sm shadow-sm min-h-[44px]"
                >
                  {t('heroCtaGuide')}
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ──────────────────────────────────────────────────────────────────────────
          CHAPTER RIBBON DIVIDER: SECTION 02 → SECTION 03 (Studio Dark Transition)
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#18191E] border-y border-neutral-800 py-4 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between text-xs font-mono text-neutral-400 select-none">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-emerald-400 rounded-full" />
          <span className="font-bold text-white">CHAPTER III</span>
          <span className="text-neutral-600">/</span>
          <span>VISUAL MEASUREMENT MASTERCLASSES</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="hidden md:inline text-neutral-400">DUAL-METHOD ANCHORS</span>
          <span className="hidden md:inline text-neutral-600">•</span>
          <span className="text-white font-semibold">[ MASTERCLASS BLUEPRINT ]</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 03: VISUAL GUIDELINES
          Function in Background: Anatomical Silhouette Blueprint & Garment Flat Drafting
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="visual-guides" className="relative w-full bg-blueprint-dark text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-neutral-800 space-y-10 overflow-hidden">
        {/* Background Blueprint Watermark: Objective Identifiers */}
        <div className="absolute right-6 top-8 text-[11vw] font-black font-mono text-white/[0.02] select-none pointer-events-none tracking-tight leading-none">
          03 // BLUEPRINT
        </div>

        <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-medium tracking-wider text-neutral-400 mb-2">
              <span className="text-white font-bold">03 /</span>
              <span>{t('showcasePill')}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {t('showcaseTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              {t('showcaseSub')}
            </p>
          </div>

          {/* Blueprint Function Purpose Stamp */}
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest border border-dashed border-neutral-800 px-3 py-2 rounded bg-black/40">
            <span>OBJECTIVE: TAILORING TAPE VS FLAT RULER MASTERCLASS</span>
          </div>
        </div>

        {/* Side-by-Side Dual Interactive Visual Guides on Wide Screens */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full relative z-10">
          <div className="space-y-3 bg-[#13141A]/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold pb-2 border-b border-neutral-800">
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

          <div className="space-y-3 bg-[#13141A]/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold pb-2 border-b border-neutral-800">
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

      {/* ──────────────────────────────────────────────────────────────────────────
          CHAPTER RIBBON DIVIDER: SECTION 03 → SECTION 04 (Return to Light Archive)
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-neutral-200/90 border-y border-neutral-300 py-3.5 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between text-xs font-mono text-neutral-600 select-none">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-neutral-900 rounded-full" />
          <span className="font-bold text-neutral-900">CHAPTER IV</span>
          <span className="text-neutral-400">/</span>
          <span>INDIAN FASHION DIRECTORY</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="hidden md:inline text-neutral-500">SIX CALIBRATED LABELS</span>
          <span className="hidden md:inline text-neutral-300">•</span>
          <span className="text-neutral-900 font-semibold">[ RETAIL ARCHIVE ]</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 04: SUPPORTED RETAIL BRANDS
          Function in Background: Fashion House Swatch Archive & Specification Directory
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="supported-brands" className="relative w-full bg-archive-ledger py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-neutral-200/80 space-y-10 overflow-hidden">
        {/* Background Archive Watermark: Objective Identifiers */}
        <div className="absolute left-8 bottom-6 text-[12vw] font-black font-mono text-neutral-900/[0.018] select-none pointer-events-none tracking-tight leading-none">
          04 // RETAIL ARCHIVE
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-medium tracking-wider text-neutral-600 mb-1">
            <span className="font-bold text-neutral-900">04 /</span>
            <span>{t('brandDirPill')}</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            {t('brandDirTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500">
            {t('brandDirSub')}
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest border border-dashed border-neutral-300 px-3 py-1 rounded bg-white/70">
              <span>ARCHIVE: 6 VERIFIED INDIAN FASHION HOUSES</span>
              <span>•</span>
              <span>GARMENT VS BODY BASIS</span>
            </div>
          </div>
        </div>

        {/* 6-Column Grid Spanning Full Viewport */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 w-full relative z-10">
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
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-black shadow-md ring-2 ring-black'
                    : 'bg-white/80 border-neutral-200 hover:border-neutral-400 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-neutral-900 text-base">{b.name}</h4>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-semibold bg-black text-white px-2 py-0.5 rounded">
                        {t('activeBrand')}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-medium text-neutral-700 bg-neutral-100 border border-neutral-200 px-2 py-1 rounded inline-block mb-2">
                    {b.basis}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  {t('cutLabel')} <strong className="text-neutral-800 font-medium">{b.cut}</strong>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 05: DPDP ACT PRIVACY VAULT & TRUST STANDARDS
          Function in Background: Cryptographic On-Device Computation & Zero Biometric Storage
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-privacy-vault py-12 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-neutral-200 select-none overflow-hidden">
        {/* Background Privacy Vault Watermark: Objective Identifiers */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[9vw] font-black font-mono text-neutral-900/[0.018] select-none pointer-events-none tracking-tight leading-none">
          05 // PRIVACY VAULT
        </div>

        <div className="w-full relative z-10 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
              TECHNICAL SECURITY & DPDP ACT COMPLIANCE VAULT
            </span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
              ON-DEVICE CLIENT-SIDE COMPUTATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex items-start space-x-3.5 bg-white/70 p-4 rounded-xl border border-neutral-200/80">
              <span className="text-xl">🛡️</span>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900">DPDP Act 2023 Compliant</h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Zero photo uploads or body scans. Only raw tailor tape measurements are computed locally.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 bg-white/70 p-4 rounded-xl border border-neutral-200/80">
              <span className="text-xl">📐</span>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900">Deterministic Design Ease</h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Calibrated to verified pattern-maker tables with functional breathing ease from +2.0" to +6.0".
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 bg-white/70 p-4 rounded-xl border border-neutral-200/80">
              <span className="text-xl">⚡</span>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900">Sub-5ms Execution</h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Pure arithmetic algorithms without generative latency, hallucination, or sizing drift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
