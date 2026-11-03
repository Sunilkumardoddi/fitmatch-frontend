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
}

export const MeasurementInput: React.FC<MeasurementInputProps> = ({
  id = 'measurement-input',
  label,
  sublabel,
  value,
  unit,
  min = unit === 'in' ? 24 : 60,
  max = unit === 'in' ? 65 : 165,
  onChange,
  onUnitToggle,
  onOpenGuide,
}) => {
  const isOutOfRange = typeof value === 'number' && (value < min || value > max);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} className="text-xs font-bold text-slate-800 tracking-wide">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 focus:outline-none focus-visible:underline"
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

      <div className={`relative rounded-xl border min-h-[48px] ${isOutOfRange ? 'border-amber-400 bg-amber-50/30' : 'border-slate-300 bg-white'} focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 transition overflow-hidden flex items-center`}>
        <input
          id={id}
          type="number"
          step="0.1"
          min={min}
          max={max}
          value={value}
          aria-describedby={sublabel ? `${id}-help` : undefined}
          aria-invalid={isOutOfRange}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : parseFloat(e.target.value);
            onChange(isNaN(val as number) ? '' : val);
          }}
          className="w-full px-4 py-3 text-sm font-bold text-slate-900 outline-none bg-transparent"
          placeholder={`e.g. ${unit === 'in' ? '39.0' : '99'}`}
        />
        <span className="pr-4 text-xs font-bold text-slate-400 select-none uppercase tracking-wider">
          {unit}
        </span>
      </div>

      {isOutOfRange && (
        <p className="text-xs text-amber-700 font-semibold" role="alert">
          Typical adult measurements fall between {min} and {max} {unit}. Please double-check your tape reading.
        </p>
      )}
    </div>
  );
};
