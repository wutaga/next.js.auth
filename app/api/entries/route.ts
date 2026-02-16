import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Не авторизован" },
      { status: 401 }
    )
  }

  const { title, content, mood } = await req.json()

  if (!title || !content) {
    return NextResponse.json(
      { error: "Заголовок и текст обязательны" },
      { status: 400 }
    )
  }

  const entry = await prisma.entry.create({
    data: {
      title,
      content,
      mood: mood || null,
      userId: session.user.id,
    },
  })

  return NextResponse.json(entry, { status: 201 })
}