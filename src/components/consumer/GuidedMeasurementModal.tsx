import React, { useState } from 'react';
import { BodyMeasurementVisualGuide } from './BodyMeasurementVisualGuide';
import { GarmentFlatVisualGuide } from './GarmentFlatVisualGuide';

export interface GuidedMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: 'in' | 'cm';
  onApplyMeasurement: (chestVal: number) => void;
}

export const GuidedMeasurementModal: React.FC<GuidedMeasurementModalProps> = ({
  isOpen,
  onClose,
  unit,
  onApplyMeasurement,
}) => {
  const [activeTab, setActiveTab] = useState<'flowA' | 'flowB'>('flowA');
  const [tapeVal, setTapeVal] = useState<string>(unit === 'in' ? '39.0' : '99.0');
  const [pitToPitVal, setPitToPitVal] = useState<string>(unit === 'in' ? '21.0' : '53.0');
  const [activeZone, setActiveZone] = useState<'CHEST' | 'WAIST' | 'SHOULDER'>('CHEST');

  if (!isOpen) return null;

  const handleApplyFlowA = () => {
    const num = parseFloat(tapeVal);
    if (!isNaN(num) && num > 0) {
      onApplyMeasurement(num);
      onClose();
    }
  };

  const handleApplyFlowB = () => {
    const pit = parseFloat(pitToPitVal);
    if (!isNaN(pit) && pit > 0) {
      // Pit-to-pit * 2 = Finished garment chest
      // Body chest ~ Finished garment chest - 3.0" (or 7.6 cm)
      const finished = pit * 2;
      const bodyChest = unit === 'in' ? Math.max(28, finished - 3.0) : Math.max(70, finished - 7.6);
      onApplyMeasurement(Math.round(bodyChest * 10) / 10);
      onClose();
    }
  };

  const currentTapeNum = parseFloat(tapeVal) || 0;
  const currentPitNum = parseFloat(pitToPitVal) || 0;

  // Preset measurements for fast selection
  const presetsInches = ['38.0', '39.0', '40.0', '42.0', '44.0'];
  const presetsCm = ['96.0', '99.0', '102.0', '107.0', '112.0'];
  const activePresets = unit === 'in' ? presetsInches : presetsCm;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 my-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
              Interactive Sizing Guidelines
            </span>
            <h2 id="guide-title" className="text-xl font-black text-slate-900 tracking-tight">
              Visual Measurement Guide
            </h2>
            <p className="text-xs text-slate-500 leading-normal">
              Follow the interactive visual guidelines below. No camera or personal photos required.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close measurement guide"
            className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('flowA')}
            className={`py-3 px-3 rounded-xl transition min-h-[44px] flex items-center justify-center space-x-1.5 ${
              activeTab === 'flowA'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🧍 Flow A: Body Tape Measure</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flowB')}
            className={`py-3 px-3 rounded-xl transition min-h-[44px] flex items-center justify-center space-x-1.5 ${
              activeTab === 'flowB'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👕 Flow B: Garment Pit-to-Pit</span>
          </button>
        </div>

        {/* TAB A: Interactive Body Tape Measurement */}
        {activeTab === 'flowA' ? (
          <div className="space-y-4">
            {/* Interactive Visual Illustration */}
            <BodyMeasurementVisualGuide
              activeZone={activeZone}
              onZoneSelect={setActiveZone}
              chestVal={currentTapeNum}
              waistVal={32.0}
              unit={unit}
              interactive={true}
            />

            {/* Quick Measurement Presets */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 block">
                Quick Selection Presets ({unit}):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTapeVal(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      tapeVal === preset
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset} {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Input */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <label htmlFor="tape-chest-input" className="block text-xs font-bold text-slate-800">
                Your Exact Tape Reading ({unit}):
              </label>
              <div className="flex space-x-2">
                <input
                  id="tape-chest-input"
                  type="number"
                  step="0.1"
                  value={tapeVal}
                  onChange={(e) => setTapeVal(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl font-bold text-base outline-none focus:ring-2 focus:ring-indigo-600 text-slate-900"
                  placeholder={`e.g. ${unit === 'in' ? '39.0' : '99.0'}`}
                />
                <button
                  type="button"
                  onClick={handleApplyFlowA}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition min-h-[48px] whitespace-nowrap shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  Apply & Match
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* TAB B: Interactive Garment Flat Ruler Measurement */
          <div className="space-y-4">
            {/* Interactive Visual Flat Garment Illustration */}
            <GarmentFlatVisualGuide
              pitToPitVal={currentPitNum}
              unit={unit}
              interactive={true}
            />

            {/* Direct Pit-to-Pit Input */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <label htmlFor="pit-to-pit-input" className="block text-xs font-bold text-slate-800">
                Measured Pit-to-Pit Seam Distance ({unit}):
              </label>
              <div className="flex space-x-2">
                <input
                  id="pit-to-pit-input"
                  type="number"
                  step="0.1"
                  value={pitToPitVal}
                  onChange={(e) => setPitToPitVal(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl font-bold text-base outline-none focus:ring-2 focus:ring-indigo-600 text-slate-900"
                  placeholder={`e.g. ${unit === 'in' ? '21.0' : '53.0'}`}
                />
                <button
                  type="button"
                  onClick={handleApplyFlowB}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition min-h-[48px] whitespace-nowrap shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  Calculate & Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 text-center border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            🔒 Pure mathematical mapping. Zero photos stored.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-2 min-h-[44px] rounded-lg hover:bg-slate-100 transition"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
};
