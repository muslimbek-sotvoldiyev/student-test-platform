"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Home, Award, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<any>(null)
  const [telegramConfigured, setTelegramConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    // Get results from session storage
    const storedResults = sessionStorage.getItem("testResults")
    if (!storedResults) {
      router.push("/")
      return
    }

    setResults(JSON.parse(storedResults))

    // Check if Telegram is configured by making a simple API call
    fetch("/api/check-telegram")
      .then((res) => res.json())
      .then((data) => {
        setTelegramConfigured(data.configured)
      })
      .catch(() => {
        setTelegramConfigured(false)
      })
  }, [router])

  if (!results) {
    return <div className="container mx-auto px-4 py-12 text-center">Yuklanmoqda...</div>
  }

  // Calculate score for closed questions
  const closedQuestions = results.answers.filter((a: any) => a.type === "closed")
  const correctAnswers = closedQuestions.filter((a: any) => a.answer === a.correctAnswer)
  const score = Math.round((correctAnswers.length / closedQuestions.length) * 100)

  // Add this after the score calculation
  const totalQuestions = results.answers.length
  const openQuestions = results.answers.filter((a: any) => a.type === "open").length
  const closedQuestionsCount = results.answers.filter((a: any) => a.type === "closed").length

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-30"></div>
                <div className="relative bg-blue-100 text-blue-800 rounded-full p-4">
                  <Award className="h-12 w-12" />
                </div>
              </div>
            </motion.div>

            <CardTitle className="text-2xl">Test yakunlandi!</CardTitle>
            <CardDescription>
              Rahmat, {results.userData.firstName} {results.userData.lastName}! Sizning natijalaringiz saqlandi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {telegramConfigured === false && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Alert variant="warning" className="bg-amber-50 border-amber-200">
                  <InfoIcon className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Telegram xabarnomasi yuborilmadi</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    O'qituvchiga Telegram orqali xabar yuborish uchun tizim sozlanmagan. Natijalaringiz saqlandi, lekin
                    o'qituvchiga avtomatik yuborilmadi.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.div
              className="text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-6xl font-bold mb-2 text-blue-600">{score}%</div>
              <p className="text-gray-500">Yopiq savollardagi to'g'ri javoblar</p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="font-medium mb-2">Test statistikasi:</h3>
              <ul className="space-y-1">
                <li className="flex justify-between">
                  <span>Jami savollar:</span>
                  <span className="font-medium">{totalQuestions}</span>
                </li>
                <li className="flex justify-between">
                  <span>Yopiq savollar:</span>
                  <span className="font-medium">{closedQuestionsCount}</span>
                </li>
                <li className="flex justify-between">
                  <span>Ochiq savollar:</span>
                  <span className="font-medium">{openQuestions}</span>
                </li>
                <li className="flex justify-between">
                  <span>To'g'ri javoblar:</span>
                  <span className="font-medium">
                    {correctAnswers.length}/{closedQuestionsCount}
                  </span>
                </li>
              </ul>
            </motion.div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Test natijalari:</h3>
              <motion.ul className="space-y-4" variants={container} initial="hidden" animate="show">
                {results.answers.map((answer: any, index: number) => (
                  <motion.li key={index} className="border-b pb-3" variants={item}>
                    <p className="font-medium">
                      {index + 1}. {answer.question}
                    </p>
                    <p className="text-gray-600 mt-1">Sizning javobingiz: {answer.answer}</p>
                    {answer.type === "closed" && (
                      <p
                        className={`mt-1 flex items-center ${answer.answer === answer.correctAnswer ? "text-green-600" : "text-red-600"}`}
                      >
                        {answer.answer === answer.correctAnswer ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" /> To'g'ri
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 mr-1" /> Noto'g'ri (To'g'ri javob: {answer.correctAnswer})
                          </>
                        )}
                      </p>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <Home className="h-4 w-4" /> Bosh sahifaga qaytish
                </Button>
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
