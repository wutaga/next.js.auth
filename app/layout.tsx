import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Мой Дневник",
  description: "Приложение для ведения дневника",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <nav className="flex items-center justify-between px-8 py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            📔 Дневник
          </Link>
          <div className="flex gap-6">
            <Link href="/dashboard" className="text-white/70 hover:text-white transition">
              Мои записи
            </Link>
            <Link href="/profile" className="text-white/70 hover:text-white transition">
              Профиль
            </Link>
            <Link href="/login" className="text-white/70 hover:text-white transition">
              Войти
            </Link>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}