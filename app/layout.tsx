import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'İşsizlik Ödeneği Maaşı Hesaplama',
  description: '4447 sayılı Sosyal Sigortalar Kanununa göre işsizlik ödeneği maaşı hesaplayıcısı',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <header className="bg-sgk-700 text-white shadow-lg py-3">
          <div className="px-3 md:px-4">
            <h1 className="text-xl md:text-2xl font-bold">İşsizlik Ödeneği</h1>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="bg-sgk-800 text-sgk-100 py-2 mt-4 text-center text-xs">
          <p>© 2026 SGK İşsizlik Ödeneği Hesaplama</p>
        </footer>
      </body>
    </html>
  );
}
