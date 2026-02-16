import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const entries = await prisma.entry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  const moodEmoji: Record<string, string> = {
    отлично: "😄",
    хорошо: "🙂",
    нейтрально: "😐",
    плохо: "😔",
    ужасно: "😢",
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Мои записи
          </h1>
          <p className="text-white/50 mt-1">
            {entries.length} {entries.length === 1 ? "запись" : "записей"}
          </p>
        </div>
        <Link
          href="/diary/new"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition"
        >
          + Новая запись
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-white/50 text-xl">Записей пока нет</p>
          <p className="text-white/30 mt-2">Создайте свою первую запись!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {entries.map((entry) => (
            <Link href={`/diary/${entry.id}`} key={entry.id}>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold">{entry.title}</h2>
                  {entry.mood && (
                    <span className="text-2xl">
                      {moodEmoji[entry.mood] || entry.mood}
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-sm mb-3">
                  {entry.content.slice(0, 120)}
                  {entry.content.length > 120 ? "..." : ""}
                </p>
                <p className="text-white/30 text-xs">
                  {new Date(entry.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}