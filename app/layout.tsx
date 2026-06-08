import type {Metadata} from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'AutoParts Store',
  description: 'Курсовая работа: Магазин автозапчастей',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <AuthProvider>
          <Navigation />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
