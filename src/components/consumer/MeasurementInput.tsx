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
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 flex items-center space-x-1.5">
          <span>{label}</span>
        </label>
        <div className="flex items-center space-x-3 text-xs">
          {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="font-medium text-neutral-600 hover:text-black underline underline-offset-2 transition"
            >
              How to measure
            </button>
          )}
          {onUnitToggle && (
            <button
              type="button"
              onClick={onUnitToggle}
              className="font-medium text-neutral-500 hover:text-black transition"
            >
              Switch to {unit === 'in' ? 'cm' : 'in'}
            </button>
          )}
        </div>
      </div>

      {sublabel && (
        <p className="text-xs text-neutral-500 leading-normal">{sublabel}</p>
      )}

      {/* Dual Input: Numeric Box + Live Range Slider */}
      <div className={`relative rounded-xl border min-h-[48px] ${isOutOfRange ? 'border-amber-400 bg-amber-50/30' : 'border-neutral-300 bg-white'} focus-within:border-black focus-within:ring-1 focus-within:ring-black transition overflow-hidden flex items-center shadow-sm`}>
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
          className="w-full px-4 py-2.5 text-base font-bold text-neutral-900 outline-none bg-transparent"
          placeholder={`e.g. ${unit === 'in' ? '39.0' : '99'}`}
        />
        <div className="flex items-center space-x-2 pr-4">
          <span className="text-xs font-mono font-medium text-neutral-600 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded uppercase">
            {unit}
          </span>
        </div>
      </div>

      {/* Interactive Range Slider — Tailor Tape Style */}
      {showSlider && typeof value === 'number' && (
        <div className="space-y-1.5 pt-1 px-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
            <span>{min} {unit}</span>
            <span className="text-black font-semibold bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-full text-[11px]">
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
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black focus:outline-none"
            aria-label={`${label} slider`}
          />
        </div>
      )}

      {isOutOfRange && (
        <p className="text-xs text-amber-700 font-medium" role="alert">
          Typical adult measurements fall between {min} and {max} {unit}. Please double-check your tape reading.
        </p>
      )}
    </div>
  );
};
