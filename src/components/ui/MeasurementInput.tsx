import React from 'react';

export interface MeasurementInputProps {
  label: string;
  sublabel?: string;
  value: number | '';
  unit: 'in' | 'cm';
  min?: number;
  max?: number;
  onChange: (val: number | '') => void;
  onUnitToggle?: () => void;
}

export const MeasurementInput: React.FC<MeasurementInputProps> = ({
  label,
  sublabel,
  value,
  unit,
  min = unit === 'in' ? 20 : 50,
  max = unit === 'in' ? 70 : 180,
  onChange,
  onUnitToggle,
}) => {
  const isOutOfRange = typeof value === 'number' && (value < min || value > max);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-bold text-slate-700 tracking-wide">
          {label}
        </label>
        {onUnitToggle && (
          <button
            type="button"
            onClick={onUnitToggle}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 focus:outline-none"
          >
            Switch to {unit === 'in' ? 'Centimeters (cm)' : 'Inches (in)'}
          </button>
        )}
      </div>

      {sublabel && (
        <p className="text-[11px] text-slate-500">{sublabel}</p>
      )}

      <div className="relative rounded-xl border border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition bg-white overflow-hidden flex items-center">
        <input
          type="number"
          step="0.1"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : parseFloat(e.target.value);
            onChange(isNaN(val as number) ? '' : val);
          }}
          className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none bg-transparent"
          placeholder={`e.g. ${unit === 'in' ? '39.0' : '99'}`}
        />
        <span className="pr-3.5 text-xs font-bold text-slate-400 select-none uppercase">
          {unit}
        </span>
      </div>

      {isOutOfRange && (
        <p className="text-[11px] text-amber-600 font-medium">
          Note: Typical adult values range between {min} and {max} {unit}.
        </p>
      )}
    </div>
  );
};

