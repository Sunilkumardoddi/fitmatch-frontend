import type { Metadata } from 'next';

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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">FitMatch</span>
            <span>&bull;</span>
            <span>Body-Neutral Sizing &bull; Zero Photos &bull; DPDP Act 2023 Compliant</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Deterministic Indian Apparel Fitting</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

