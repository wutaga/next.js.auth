import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

export default async function EntryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const { id } = await params

  const entry = await prisma.entry.findUnique({
    where: { id },
  })

  if (!entry) notFound()

  if (entry.userId !== session.user.id) {
    redirect("/dashboard")
  }

  const moodEmoji: Record<string, string> = {
    отлично: "😄",
    хорошо: "🙂",
    нейтрально: "😐",
    плохо: "😔",
    ужасно: "😢",
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/dashboard" className="text-white/50 hover:text-white transition mb-6 inline-block">
        ← Назад
      </Link>

      <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold">{entry.title}</h1>
          {entry.mood && (
            <span className="text-4xl">{moodEmoji[entry.mood] || entry.mood}</span>
          )}
        </div>

        <p className="text-white/40 text-sm mb-6">
          {new Date(entry.createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
          {entry.content}
        </p>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Link
            href={`/diary/${entry.id}/edit`}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm"
          >
            ✏️ Редактировать
          </Link>
        </div>
      </div>
    </div>
  )
}