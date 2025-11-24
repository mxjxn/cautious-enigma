import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Farcaster Tactical Game',
  description: 'Turn-based tactical game on Farcaster',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
