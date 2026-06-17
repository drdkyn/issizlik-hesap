import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SGK İşsizlik Ödeneği Hesaplama',
  description: '4447 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanununa göre işsizlik ödeneği hesaplayıcısı',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <header className="bg-sgk-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold">SGK İşsizlik Ödeneği Hesaplama</h1>
            <p className="text-sgk-200 text-sm mt-1">4447 sayılı Kanun - Madde 50</p>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-sgk-800 text-sgk-100 mt-16 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>© 2026 - SGK İşsizlik Ödeneği Hesaplama Aracı</p>
            <p className="text-sgk-300 mt-2">Madde 50, 51 ve 52 - 4447 sayılı Kanun</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
