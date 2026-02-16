"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function EditEntryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")

  useEffect(() => {
    fetch(`/api/entries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title)
        setContent(data.content)
        setMood(data.mood || "")
        setFetching(false)
      })
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch(`/api/entries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, mood }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push(`/diary/${id}`)
  }

  async function handleDelete() {
    if (!confirm("Удалить запись?")) return

    const res = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    })

    if (res.ok) router.push("/dashboard")
  }

  if (fetching) return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <p className="text-white/50">Загрузка...</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <Link href={`/diary/${id}`} className="text-white/50 hover:text-white transition mb-6 inline-block">
        ← Назад
      </Link>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Редактировать
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Заголовок</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm">Настроение</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition disabled:opacity-50"
          >
            {loading ? "Сохранение..." : "Сохранить"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition"
          >
            🗑️ Удалить
          </button>
        </div>
      </form>
    </div>
  )
}