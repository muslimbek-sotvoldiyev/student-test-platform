import { NextResponse } from "next/server"

export async function GET() {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
  const telegramChatId = process.env.TELEGRAM_CHAT_ID

  const configured = !!(telegramBotToken && telegramChatId)

  return NextResponse.json({ configured })
}
