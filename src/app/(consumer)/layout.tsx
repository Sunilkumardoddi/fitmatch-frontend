import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FitMatch — Privacy-First Deterministic Apparel Sizing',
  description: 'Deterministic, ease-aware clothing size recommendations for Indian fashion e-commerce.',
};

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      <div className="flex-1 w-full">{children}</div>

      {/* Comprehensive Website Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-12 select-none">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-100 text-xs">
            {/* Col 1: Brand & Mission */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  F
                </div>
                <span className="text-base font-black text-slate-900 tracking-tight">FitMatch</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Privacy-first, deterministic apparel sizing for Indian fashion e-commerce. Mapping bare tape measurements to manufacturer garment dimensions with calibrated design ease.
              </p>
              <div className="inline-flex items-center space-x-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
                <span>🛡️ DPDP Act 2023 Compliant</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Platform</h4>
              <ul className="space-y-1.5 text-slate-600">
                <li><a href="#sizing-engine" className="hover:text-indigo-600 transition">Fit Engine Calculator</a></li>
                <li><a href="#visual-guides" className="hover:text-indigo-600 transition">Interactive Visual Guides</a></li>
                <li><a href="#supported-brands" className="hover:text-indigo-600 transition">Supported Retail Brands</a></li>
                <li><Link href="/admin" className="hover:text-indigo-600 transition">Operator & Admin Portal</Link></li>
              </ul>
            </div>

            {/* Col 3: Verified Brands */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Calibrated Brands</h4>
              <ul className="space-y-1.5 text-slate-600">
                <li>Snitch (Garment Basis)</li>
                <li>The Souled Store (Relaxed)</li>
                <li>Allen Solly (Dual Basis)</li>
                <li>Bewakoof (Garment Basis)</li>
                <li>Fabindia (Body + 6" Ease)</li>
                <li>Rare Rabbit (Tailored)</li>
              </ul>
            </div>

            {/* Col 4: Privacy & Standards */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Privacy & Trust</h4>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                FitMatch never collects or stores biometric photos. We enforce deterministic mathematical models and provide immediate local data export and erasure.
              </p>
              <span className="block text-[11px] font-mono text-slate-400 pt-1">
                ADR-005 Three Independent Repositories
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} FitMatch. Built with Next.js 14, NestJS, and Drizzle ORM.
            </div>
            <div className="flex items-center space-x-4">
              <span>Zero Body Photos</span>
              <span>&bull;</span>
              <span>WCAG 2.2 AA Accessible</span>
              <span>&bull;</span>
              <span>Sub-5ms Latency</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
