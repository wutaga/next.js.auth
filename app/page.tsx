import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="mb-8 text-8xl">📔</div>
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
        Мой Дневник
      </h1>
      <p className="text-xl text-white/60 mb-12 max-w-md">
        Сохраняй свои мысли, эмоции и воспоминания каждый день
      </p>
      <div className="flex gap-4">
        <Link
          href="/register"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition"
        >
          Начать бесплатно
        </Link>
        <Link
          href="/login"
          className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 font-semibold transition"
        >
          Войти
        </Link>
      </div>
    </div>
  )
}