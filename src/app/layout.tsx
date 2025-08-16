import './globals.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ArtefactProvider, ContextMenuProvider, GlobalStateProvider, SettingsProvider } from '@/data/providers';
import { Header } from '@/components';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ScapeTools',
  openGraph: {
    title: 'ScapeTools',
    description: 'ScapeTools Arch Journal - An all-in-one tool for tracking your Archaeology progress',
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
      <body className={`${raleway.variable} antialiased`}>
        <ContextMenuProvider>
          <GlobalStateProvider>
            <ArtefactProvider>
              <SettingsProvider>
                <div className="h-full min-h-screen w-full bg-gray-900!">
                  <Header />
                  <div className="h-full w-full p-6 md:px-12 lg:px-16">{children}</div>
                </div>
              </SettingsProvider>
            </ArtefactProvider>
          </GlobalStateProvider>
        </ContextMenuProvider>
      </body>
      <GoogleAnalytics gaId="G-THXNPBP1V5" />
    </html>
  );
}
