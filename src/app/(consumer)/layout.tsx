import type { Metadata } from 'next';
import Link from 'next/link';
import { LanguageProvider } from '../../lib/i18n/LanguageContext';
import { BrandLogo } from '../../components/brand/BrandLogo';

export const metadata: Metadata = {
  title: 'FitMatch — Studio Apparel Fit Engine for Indian Fashion',
  description: 'Deterministic, pattern-calibrated clothing size recommendations for India\'s leading fashion brands.',
};

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="w-full min-h-screen bg-[#FAFAF8] text-neutral-900 flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
        <div className="flex-1 w-full">{children}</div>

        {/* Minimalist Editorial Fashion Footer */}
        <footer className="w-full border-t border-neutral-200/80 bg-white py-14 select-none">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 pb-10 border-b border-neutral-100 text-xs">
              {/* Col 1: Brand & Identity */}
              <div className="space-y-4">
                <BrandLogo variant="horizontal" size="sm" />
                <p className="text-neutral-500 leading-relaxed text-xs max-w-sm">
                  Deterministic clothing size calculation for Indian fashion retail. Mapping tape readings directly to verified brand pattern cuts with calibrated functional ease.
                </p>
                <div className="inline-flex items-center space-x-2 text-xs text-neutral-800 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded font-mono">
                  <span>🛡️</span>
                  <span>DPDP Act 2023 Compliant • Zero Photos</span>
                </div>
              </div>

              {/* Col 2: Navigation */}
              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">Platform</h4>
                <ul className="space-y-2 text-neutral-600 text-xs">
                  <li><a href="#sizing-engine" className="hover:text-black transition">Sizing Calculator</a></li>
                  <li><a href="#visual-guides" className="hover:text-black transition">Visual Guidelines</a></li>
                  <li><a href="#supported-brands" className="hover:text-black transition">Verified Brands (6)</a></li>
                  <li><Link href="/admin" className="hover:text-black transition">Operator Portal</Link></li>
                </ul>
              </div>

              {/* Col 3: Calibrated Indian Labels */}
              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">Supported Brands</h4>
                <ul className="space-y-2 text-neutral-600 text-xs font-mono">
                  <li>Snitch (Garment Basis)</li>
                  <li>The Souled Store (Oversized)</li>
                  <li>Allen Solly (Dual Basis)</li>
                  <li>Bewakoof (Casual)</li>
                  <li>Fabindia (Body + 6" Ease)</li>
                  <li>Rare Rabbit (Tailored Cut)</li>
                </ul>
              </div>

              {/* Col 4: Architecture */}
              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">Technical Architecture</h4>
                <p className="text-neutral-500 leading-relaxed text-xs">
                  Pure mathematical pattern-grading and ease margin engine. Deterministic execution in &lt;5ms without generative hallucination or body imaging.
                </p>
                <div className="text-[11px] font-mono text-neutral-400">
                  Version 1.0.0 • Mumbai / Bengaluru
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
              <p>&copy; {new Date().getFullYear()} FitMatch Studio. Built for Indian Fashion E-Commerce.</p>
              <div className="flex space-x-6">
                <a href="#privacy" className="hover:text-neutral-700 transition">Privacy Policy</a>
                <a href="#terms" className="hover:text-neutral-700 transition">Sizing Standards</a>
                <a href="#contact" className="hover:text-neutral-700 transition">Atelier Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
