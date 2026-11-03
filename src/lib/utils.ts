import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMeasurement(valueMm: number, unit: 'in' | 'cm'): string {
  if (unit === 'in') {
    return `${(valueMm / 25.4).toFixed(1)}"`;
  }
  return `${(valueMm / 10).toFixed(1)} cm`;
}

