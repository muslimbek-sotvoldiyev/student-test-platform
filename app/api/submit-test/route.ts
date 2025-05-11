import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Extract user data and answers
    const { userData, answers, score, totalQuestions, correctAnswers } = data

    // Format message for Telegram
    let message = `🎓 *YANGI TEST NATIJASI*\n\n`
    message += `*O'quvchi ma'lumotlari:*\n`
    message += `👤 Ism-familiya: ${userData.firstName} ${userData.lastName}\n`
    message += `📱 Telefon: ${userData.phone}\n\n`

    message += `*Test statistikasi:*\n`
    message += `📊 Jami savollar soni: ${totalQuestions}\n`
    message += `✅ To'g'ri javoblar: ${correctAnswers}/${answers.filter((a) => a.type === "closed").length}\n`
    message += `📝 Ochiq savollar: ${answers.filter((a) => a.type === "open").length}\n`
    message += `🏆 Umumiy ball: ${score}%\n\n`

    message += `*Savollar va javoblar:*\n`

    answers.forEach((answer, index) => {
      message += `\n${index + 1}. ${answer.question}\n`
      message += `💬 Javob: ${answer.answer}\n`

      if (answer.type === "closed" && answer.correctAnswer) {
        const isCorrect = answer.answer === answer.correctAnswer
        message += isCorrect ? "✅ To'g'ri\n" : `❌ Noto'g'ri (To'g'ri javob: ${answer.correctAnswer})\n`
      }
    })

    // Get Telegram credentials
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    // Try to send to Telegram if credentials are available
    let telegramSent = false

    if (telegramBotToken && telegramChatId) {
      try {
        console.log("Sending to Telegram...")

        const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        })

        const telegramData = await telegramResponse.json()

        if (!telegramResponse.ok) {
          console.error("Telegram API error:", telegramData)
        } else {
          console.log("Message sent to Telegram successfully")
          telegramSent = true
        }
      } catch (error) {
        console.error("Error sending to Telegram:", error)
      }
    } else {
      console.log("Telegram credentials not configured, skipping notification")
    }

    // Return success regardless of Telegram status
    return NextResponse.json({
      success: true,
      telegramSent,
      message: "Test results saved successfully",
    })
  } catch (error) {
    console.error("Error processing test submission:", error)
    return NextResponse.json({ error: "Failed to process test submission", details: String(error) }, { status: 500 })
  }
}
