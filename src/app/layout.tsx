import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitMatch — Privacy-First Deterministic Apparel Sizing',
  description: 'Deterministic, ease-aware clothing size recommendations for Indian fashion e-commerce.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}

