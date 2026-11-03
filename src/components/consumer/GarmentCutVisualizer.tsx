import React, { useState } from 'react';

export interface GarmentCutVisualizerProps {
  categoryCode: string;
  unit: 'in' | 'cm';
  onGuideClick?: () => void;
}

export const GarmentCutVisualizer: React.FC<GarmentCutVisualizerProps> = ({
  categoryCode,
  unit,
  onGuideClick,
}) => {
  const [activeGuideline, setActiveGuideline] = useState<'CHEST' | 'SHOULDER' | 'LENGTH'>('CHEST');

  // Category specifications
  const specs: Record<string, {
    title: string;
    cutName: string;
    easeText: string;
    description: string;
    accentColor: string;
    chestEase: string;
  }> = {
    SHIRT_CASUAL: {
      title: 'Casual Button-Down Shirt',
      cutName: 'Modern Slim / Tailored Fit',
      easeText: unit === 'in' ? '+3.0" Design Ease' : '+7.6 cm Design Ease',
      description: 'Streamlined torso with tailored waist suppression and clean armhole drape.',
      accentColor: '#6366F1',
      chestEase: unit === 'in' ? '3.0"' : '7.6 cm',
    },
    SHIRT_FORMAL: {
      title: 'Formal Dress Shirt',
      cutName: 'Classic Executive Cut',
      easeText: unit === 'in' ? '+4.0" Design Ease' : '+10.2 cm Design Ease',
      description: 'Generous room across chest and shoulder blades for unrestricted movement and tucking into trousers.',
      accentColor: '#3B82F6',
      chestEase: unit === 'in' ? '4.0"' : '10.2 cm',
    },
    TSHIRT_REGULAR: {
      title: 'Crew Neck T-Shirt',
      cutName: 'Standard Regular Fit',
      easeText: unit === 'in' ? '+2.0" Design Ease' : '+5.1 cm Design Ease',
      description: 'Comfortable stretch cotton drape resting naturally across the shoulders and upper chest.',
      accentColor: '#10B981',
      chestEase: unit === 'in' ? '2.0"' : '5.1 cm',
    },
    TSHIRT_OVERSIZED: {
      title: 'Oversized Streetwear Tee',
      cutName: 'Drop-Shoulder Boxy Silhouette',
      easeText: unit === 'in' ? '+6.0" Design Ease' : '+15.2 cm Design Ease',
      description: 'Extended shoulder drop, wider chest circumference, and relaxed drape below the waistline.',
      accentColor: '#EC4899',
      chestEase: unit === 'in' ? '6.0"' : '15.2 cm',
    },
  };

  const current = specs[categoryCode] || specs['SHIRT_CASUAL'];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3 select-none">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
            {current.cutName}
          </span>
          <h3 className="text-xs font-bold text-slate-200 mt-1">{current.title}</h3>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-1 rounded border border-emerald-800">
          {current.easeText}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
        {/* Interactive Vector Silhouette with Guideline Overlays */}
        <div className="relative w-28 h-32 flex items-center justify-center">
          <svg
            viewBox="0 0 160 180"
            className="w-full h-full"
            aria-label="Garment pattern cut with measurement guidelines"
            role="img"
          >
            <defs>
              <linearGradient id="cutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>

            {/* Garment Shape Depending on Category */}
            {categoryCode === 'TSHIRT_OVERSIZED' ? (
              // Boxy Drop-Shoulder Silhouette
              <path
                d="M 60 20 Q 80 32 100 20 L 138 32 L 158 85 L 135 96 L 126 80 L 126 160 L 34 160 L 34 80 L 25 96 L 2 85 L 22 32 Z"
                fill="url(#cutGrad)"
                stroke="#64748B"
                strokeWidth="1.5"
              />
            ) : (
              // Standard Shirt Silhouette
              <path
                d="M 60 18 Q 80 28 100 18 L 125 28 L 152 70 L 135 80 L 120 62 L 120 160 Q 80 166 40 160 L 40 62 L 25 80 L 8 70 L 35 28 Z"
                fill="url(#cutGrad)"
                stroke="#64748B"
                strokeWidth="1.5"
              />
            )}

            {/* Neck / Collar */}
            <path d="M 60 18 Q 80 32 100 18" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.2" />

            {/* Shoulder Guideline Line */}
            <line
              x1="35"
              y1="28"
              x2="125"
              y2="28"
              stroke={activeGuideline === 'SHOULDER' ? '#F59E0B' : '#475569'}
              strokeWidth={activeGuideline === 'SHOULDER' ? '2.5' : '1'}
              strokeDasharray={activeGuideline === 'SHOULDER' ? 'none' : '3 2'}
              className="cursor-pointer"
              onClick={() => setActiveGuideline('SHOULDER')}
            />

            {/* Chest Guideline Line (Primary Anchor) */}
            <line
              x1={categoryCode === 'TSHIRT_OVERSIZED' ? '34' : '40'}
              y1="82"
              x2={categoryCode === 'TSHIRT_OVERSIZED' ? '126' : '120'}
              y2="82"
              stroke={activeGuideline === 'CHEST' ? '#818CF8' : '#64748B'}
              strokeWidth={activeGuideline === 'CHEST' ? '3' : '1.5'}
              strokeDasharray={activeGuideline === 'CHEST' ? 'none' : '3 2'}
              className="cursor-pointer"
              onClick={() => setActiveGuideline('CHEST')}
            />

            {/* Chest Anchor Guideline Pins */}
            <circle
              cx={categoryCode === 'TSHIRT_OVERSIZED' ? '34' : '40'}
              cy="82"
              r="3"
              fill="#818CF8"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
            <circle
              cx={categoryCode === 'TSHIRT_OVERSIZED' ? '126' : '120'}
              cy="82"
              r="3"
              fill="#818CF8"
              stroke="#FFFFFF"
              strokeWidth="1"
            />

            {/* Garment Length Guideline Line */}
            <line
              x1="80"
              y1="25"
              x2="80"
              y2="162"
              stroke={activeGuideline === 'LENGTH' ? '#10B981' : '#475569'}
              strokeWidth={activeGuideline === 'LENGTH' ? '2.5' : '1'}
              strokeDasharray={activeGuideline === 'LENGTH' ? 'none' : '3 2'}
              className="cursor-pointer"
              onClick={() => setActiveGuideline('LENGTH')}
            />
          </svg>
        </div>

        {/* Guideline Selector & Description */}
        <div className="flex-1 space-y-2 text-[11px]">
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setActiveGuideline('CHEST')}
              className={`px-2 py-0.5 rounded font-bold transition ${
                activeGuideline === 'CHEST' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Chest Guideline
            </button>
            <button
              type="button"
              onClick={() => setActiveGuideline('SHOULDER')}
              className={`px-2 py-0.5 rounded font-bold transition ${
                activeGuideline === 'SHOULDER' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Shoulder
            </button>
            <button
              type="button"
              onClick={() => setActiveGuideline('LENGTH')}
              className={`px-2 py-0.5 rounded font-bold transition ${
                activeGuideline === 'LENGTH' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Length
            </button>
          </div>

          <p className="text-slate-300 leading-relaxed text-[11px]">
            {activeGuideline === 'CHEST' && (
              <>Primary anchor point. Incorporates <strong className="text-indigo-300">{current.chestEase}</strong> functional ease over your bare chest reading.</>
            )}
            {activeGuideline === 'SHOULDER' && (
              <>Shoulder seam span. Aligns seam points naturally with your acromion bone landmarks without pulling.</>
            )}
            {activeGuideline === 'LENGTH' && (
              <>Vertical center-back length. Tailored to hit mid-fly for clean untucked or tucked styling.</>
            )}
          </p>

          {onGuideClick && (
            <button
              type="button"
              onClick={onGuideClick}
              className="text-indigo-400 hover:text-indigo-300 font-bold underline text-[10px] flex items-center space-x-1"
            >
              <span>View full measurement illustrations &rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

