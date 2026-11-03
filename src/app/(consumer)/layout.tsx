import type { Metadata } from 'next';
import Link from 'next/link';
import { LanguageProvider } from '../../lib/i18n/LanguageContext';

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
    <LanguageProvider>
      <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
        <div className="flex-1 w-full">{children}</div>

        {/* Comprehensive Website Footer — Fluid Edge-to-Edge */}
        <footer className="w-full border-t border-slate-200 bg-white py-12 select-none">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-100 text-xs">
              {/* Col 1: Brand & Mission */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                    F
                  </div>
                  <span className="text-lg font-black text-slate-900 tracking-tight">FitMatch</span>
                </div>
                <p className="text-slate-500 leading-relaxed text-xs">
                  Privacy-first, deterministic apparel sizing for Indian fashion e-commerce. Mapping bare tape measurements to manufacturer garment dimensions with calibrated design ease.
                </p>
                <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                  <span>🛡️ DPDP Act 2023 Compliant</span>
                </div>
              </div>

              {/* Col 2: Navigation */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Platform Links</h4>
                <ul className="space-y-2 text-slate-600 text-xs">
                  <li><a href="#sizing-engine" className="hover:text-indigo-600 transition">Fit Engine Calculator</a></li>
                  <li><a href="#visual-guides" className="hover:text-indigo-600 transition">Interactive Visual Guides</a></li>
                  <li><a href="#supported-brands" className="hover:text-indigo-600 transition">Supported Retail Brands</a></li>
                  <li><Link href="/admin" className="hover:text-indigo-600 transition">Operator & Admin Portal</Link></li>
                </ul>
              </div>

              {/* Col 3: Verified Brands */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Calibrated Brands</h4>
                <ul className="space-y-2 text-slate-600 text-xs">
                  <li>Snitch (Garment Basis)</li>
                  <li>The Souled Store (Relaxed Fit)</li>
                  <li>Allen Solly (Dual Basis)</li>
                  <li>Bewakoof (Casual & Tees)</li>
                  <li>Fabindia (Body + 6" Ease)</li>
                  <li>Rare Rabbit (Tailored Cut)</li>
                </ul>
              </div>

              {/* Col 4: Privacy & Standards */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Privacy & Standards</h4>
                <p className="text-slate-500 leading-relaxed text-xs">
                  FitMatch never collects or stores biometric photos. We enforce deterministic mathematical models and provide immediate local data export and erasure under Indian data privacy law.
                </p>
                <span className="block text-[11px] font-mono text-slate-400 pt-1">
                  ADR-005 Three Independent Repositories
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
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
    </LanguageProvider>
  );
}
