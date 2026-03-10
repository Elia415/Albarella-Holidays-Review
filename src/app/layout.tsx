import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Piattaforma Comunitaria Albarella",
  description: "Piattaforma per recensire professionisti e sponsorizzarsi nell'Isola di Albarella",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased bg-gray-50 text-gray-900`}
      >
        <header className="relative py-6 px-8 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" className="relative h-12 w-auto">
              <Image
                src="/Logo Albarella Holidays.png"
                alt="Albarella Holidays"
                width={200}
                height={48}
                className="object-contain h-auto"
              />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/professional-signup"
                className="border border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/10 transition-colors"
              >
                Sono un Professionista
              </a>
              <a
                href="/advisor"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Proponi Professionista
              </a>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
