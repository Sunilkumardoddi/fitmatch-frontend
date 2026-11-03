import React, { useState } from 'react';

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
      // Body chest ~ Finished garment chest - 3.0" (or 7.5 cm)
      const finished = pit * 2;
      const bodyChest = unit === 'in' ? Math.max(28, finished - 3.0) : Math.max(70, finished - 7.6);
      onApplyMeasurement(Math.round(bodyChest * 10) / 10);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Approachable Onboarding
            </span>
            <h2 id="guide-title" className="text-lg font-bold text-slate-900 mt-2">
              How to Measure for an Exact Fit
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Choose the method that works best for you. No camera or photos required.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close measurement guide"
            className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('flowA')}
            className={`py-2 px-3 rounded-lg transition min-h-[44px] ${activeTab === 'flowA' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Flow A: Body Tape
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flowB')}
            className={`py-2 px-3 rounded-lg transition min-h-[44px] ${activeTab === 'flowB' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Flow B: Garment Ruler
          </button>
        </div>

        {activeTab === 'flowA' ? (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 leading-relaxed text-slate-700">
              <div className="font-bold text-slate-900 text-sm">3 Steps to Measure Your Chest with Tape:</div>
              <ol className="list-decimal pl-4 space-y-1.5 text-slate-600">
                <li><strong>Tape Level:</strong> Wrap a soft tailor's tape horizontally around the fullest part of your chest, just under your armpits.</li>
                <li><strong>Relax:</strong> Keep your arms down naturally. Do not puff out or hold your breath.</li>
                <li><strong>Finger Room:</strong> Keep the tape snug against your skin or light shirt, with room for one finger beneath.</li>
              </ol>
            </div>

            <div>
              <label htmlFor="tape-chest-input" className="block font-bold text-slate-800 mb-1">
                Enter Bare Chest Reading ({unit})
              </label>
              <div className="flex space-x-2">
                <input
                  id="tape-chest-input"
                  type="number"
                  step="0.1"
                  value={tapeVal}
                  onChange={(e) => setTapeVal(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={handleApplyFlowA}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl transition min-h-[48px] whitespace-nowrap shadow-sm"
                >
                  Apply & Match
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 leading-relaxed text-slate-700">
              <div className="font-bold text-slate-900 text-sm">Measure Your Best-Fitting Existing Shirt:</div>
              <ol className="list-decimal pl-4 space-y-1.5 text-slate-600">
                <li><strong>Lay Flat:</strong> Button up your favorite well-fitting casual shirt and lay it flat on a table or bed.</li>
                <li><strong>Pit-to-Pit:</strong> Measure straight across the chest from the lower armpit seam on the left to the lower armpit seam on the right.</li>
                <li><strong>Automatic Conversion:</strong> We double this number and subtract standard 3.0" design ease to determine your bare chest dimension.</li>
              </ol>
            </div>

            <div>
              <label htmlFor="pit-to-pit-input" className="block font-bold text-slate-800 mb-1">
                Enter Pit-to-Pit Measurement ({unit})
              </label>
              <div className="flex space-x-2">
                <input
                  id="pit-to-pit-input"
                  type="number"
                  step="0.1"
                  value={pitToPitVal}
                  onChange={(e) => setPitToPitVal(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={handleApplyFlowB}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl transition min-h-[48px] whitespace-nowrap shadow-sm"
                >
                  Convert & Apply
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 text-center border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold p-2 min-h-[44px]"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
};

