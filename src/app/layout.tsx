import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ScapeTools',
  openGraph: {
    title: 'ScapeTools',
    description:
      'ScapeTools Arch Journal - An all-in-one tool for tracking your Archaeology progress',
    url: 'https://scape.tools',
    images: 'https://scape.tools/assets/Archaeology.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>{children}</body>
      <GoogleAnalytics gaId="G-THXNPBP1V5" />
    </html>
  );
}
