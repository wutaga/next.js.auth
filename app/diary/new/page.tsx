"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewEntryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const mood = formData.get("mood") as string

    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, mood }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/dashboard" className="text-white/50 hover:text-white transition mb-6 inline-block">
        ← Назад
      </Link>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Новая запись
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Заголовок</label>
          <input
            name="title"
            type="text"
            placeholder="Как прошёл день?"
            required
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Настроение</label>
          <select
            name="mood"
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400 transition"
          >
            <option value="" className="bg-gray-800">Не указывать</option>
            <option value="отлично" className="bg-gray-800">😄 Отлично</option>
            <option value="хорошо" className="bg-gray-800">🙂 Хорошо</option>
            <option value="нейтрально" className="bg-gray-800">😐 Нейтрально</option>
            <option value="плохо" className="bg-gray-800">😔 Плохо</option>
            <option value="ужасно" className="bg-gray-800">😢 Ужасно</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Запись</label>
          <textarea
            name="content"
            placeholder="Что произошло сегодня?"
            rows={10}
            required
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition resize-none"
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
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition disabled:opacity-50"
        >
          {loading ? "Сохранение..." : "Сохранить запись"}
        </button>
      </form>
    </div>
  )
}