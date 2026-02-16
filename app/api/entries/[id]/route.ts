import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
  }

  const { id } = await params
  const entry = await prisma.entry.findUnique({ where: { id } })

  if (!entry || entry.userId !== session.user.id) {
    return NextResponse.json({ error: "Не найдено" }, { status: 404 })
  }

  return NextResponse.json(entry)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
  }

  const { id } = await params
  const { title, content, mood } = await req.json()

  const entry = await prisma.entry.findUnique({ where: { id } })

  if (!entry || entry.userId !== session.user.id) {
    return NextResponse.json({ error: "Не найдено" }, { status: 404 })
  }

  const updated = await prisma.entry.update({
    where: { id },
    data: { title, content, mood: mood || null },
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
  }

  const { id } = await params
  const entry = await prisma.entry.findUnique({ where: { id } })

  if (!entry || entry.userId !== session.user.id) {
    return NextResponse.json({ error: "Не найдено" }, { status: 404 })
  }

  await prisma.entry.delete({ where: { id } })

  return NextResponse.json({ success: true })
}