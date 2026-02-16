"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push("/login")
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Создать аккаунт
        </h1>
        <p className="text-white/50 mb-8">Начните вести дневник уже сегодня</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm">Имя</label>
            <input
              name="name"
              type="text"
              placeholder="Ваше имя"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              required
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm">Пароль</label>
            <input
              name="password"
              type="password"
              placeholder="Минимум 8 символов"
              required
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 px-4 py-2 rounded-xl">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition disabled:opacity-50"
          >
            {loading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-white/50 mt-6">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 transition">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}