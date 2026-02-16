import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json()

  // Валидация
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email и пароль обязательны" },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Пароль должен быть минимум 8 символов" },
      { status: 400 }
    )
  }

  // Проверяем что пользователь не существует
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json(
      { error: "Пользователь с таким email уже существует" },
      { status: 400 }
    )
  }

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 12)

  // Создаём пользователя
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}