import React from 'react';

export interface MeasurementInputProps {
  id?: string;
  label: string;
  sublabel?: string;
  value: number | '';
  unit: 'in' | 'cm';
  min?: number;
  max?: number;
  onChange: (val: number | '') => void;
  onUnitToggle?: () => void;
  onOpenGuide?: () => void;
  showSlider?: boolean;
}

export const MeasurementInput: React.FC<MeasurementInputProps> = ({
  id = 'measurement-input',
  label,
  sublabel,
  value,
  unit,
  min = unit === 'in' ? 28 : 70,
  max = unit === 'in' ? 56 : 142,
  onChange,
  onUnitToggle,
  onOpenGuide,
  showSlider = true,
}) => {
  const isOutOfRange = typeof value === 'number' && (value < min || value > max);
  const numericVal = typeof value === 'number' ? value : (unit === 'in' ? 39 : 99);

  return (
    <div className="space-y-2 select-none">
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} className="text-xs font-bold text-slate-800 tracking-wide flex items-center space-x-1.5">
          <span>{label}</span>
        </label>
        <div className="flex items-center space-x-2">
          {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 focus:outline-none focus-visible:underline"
            >
              How to measure
            </button>
          )}
          {onUnitToggle && (
            <button
              type="button"
              onClick={onUnitToggle}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 focus:outline-none focus-visible:underline"
            >
              Switch to {unit === 'in' ? 'cm' : 'in'}
            </button>
          )}
        </div>
      </div>

      {sublabel && (
        <p className="text-xs text-slate-500 leading-normal">{sublabel}</p>
      )}

      {/* Dual Input: Numeric Box + Live Range Slider */}
      <div className={`relative rounded-2xl border min-h-[50px] ${isOutOfRange ? 'border-amber-400 bg-amber-50/30' : 'border-slate-300 bg-white'} focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 transition overflow-hidden flex items-center shadow-sm`}>
        <input
          id={id}
          type="number"
          step="0.5"
          min={min}
          max={max}
          value={value}
          aria-describedby={sublabel ? `${id}-help` : undefined}
          aria-invalid={isOutOfRange}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : parseFloat(e.target.value);
            onChange(isNaN(val as number) ? '' : val);
          }}
          className="w-full px-4 py-3 text-base font-black text-slate-900 outline-none bg-transparent"
          placeholder={`e.g. ${unit === 'in' ? '39.0' : '99'}`}
        />
        <div className="flex items-center space-x-2 pr-4">
          <span className="text-xs font-mono font-bold text-amber-950 bg-amber-50 border border-amber-300/80 px-2 py-0.5 rounded uppercase tracking-wider">
            {unit}
          </span>
        </div>
      </div>

      {/* Interactive Range Slider */}
      {showSlider && typeof value === 'number' && (
        <div className="space-y-1.5 pt-1 px-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-semibold">
            <span>{min} {unit}</span>
            <span className="text-amber-950 font-bold bg-amber-50 border border-amber-300/80 px-2.5 py-0.5 rounded-full text-[11px]">
              Drag to adjust: {value} {unit}
            </span>
            <span>{max} {unit}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step="0.5"
            value={numericVal}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={`${label} slider`}
          />
        </div>
      )}

      {isOutOfRange && (
        <p className="text-xs text-amber-700 font-semibold" role="alert">
          Typical adult measurements fall between {min} and {max} {unit}. Please double-check your tape reading.
        </p>
      )}
    </div>
  );
};
