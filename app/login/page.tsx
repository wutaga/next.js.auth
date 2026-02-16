"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Неверный email или пароль")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Добро пожаловать
        </h1>
        <p className="text-white/50 mb-8">Войдите в свой аккаунт</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="Ваш пароль"
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
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>

        <p className="text-center text-white/50 mt-6">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-purple-400 hover:text-purple-300 transition">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}