import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitMatch — Studio Apparel Fit Engine for Indian Fashion',
  description: 'Deterministic, pattern-calibrated clothing size recommendations for India\'s leading fashion brands.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased bg-[#FAFAF8] text-neutral-900 selection:bg-neutral-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
