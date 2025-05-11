"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react"

// Sample test questions
const questions = [
  // O'zgaruvchilar, ma'lumot turlari, operatorlar (1-10)
  {
    id: 1,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Quyidagi kod natijasini toping: x = 5; y = '5'; print(x + int(y))",
    options: ["5", "10", "55", "TypeError"],
    correctAnswer: "10",
  },
  {
    id: 2,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Quyidagilardan qaysi biri Python'da to'g'ri o'zgaruvchi nomi hisoblanadi?",
    options: ["2value", "value_2", "value-2", "value 2"],
    correctAnswer: "value_2",
  },
  {
    id: 3,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Python'da type([]) funksiyasi qanday natija qaytaradi?",
    options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
    correctAnswer: "<class 'list'>",
  },
  {
    id: 4,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Bu ifodaning natijasi nima: len(\"python\"[::2])",
    options: ["3", "6", "2", "4"],
    correctAnswer: "3",
  },
  {
    id: 5,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "not (True and False) ifodasi qanday natija beradi?",
    options: ["True", "False", "None", "Error"],
    correctAnswer: "True",
  },
  {
    id: 6,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Quyidagilardan qaysi biri Python'da set (to'plam) yaratadi?",
    options: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "{'a': 1}"],
    correctAnswer: "{1, 2, 3}",
  },
  {
    id: 7,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "print(10 // 3) ifodasi ekranga qanday qiymat chiqaradi?",
    options: ["3", "3.33", "3.0", "4"],
    correctAnswer: "3",
  },
  {
    id: 8,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Quyidagi kodning natijasini toping: x = 3; x *= 2 + 1",
    options: ["9", "6", "7", "8"],
    correctAnswer: "9",
  },
  {
    id: 9,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Bu kodning natijasi nima bo'ladi: my_tuple = (1, 2, 3); my_tuple[0] = 4",
    options: ["TypeError: 'tuple' object does not support item assignment", "(4, 2, 3)", "SyntaxError", "IndexError"],
    correctAnswer: "TypeError: 'tuple' object does not support item assignment",
  },
  {
    id: 10,
    category: "O'zgaruvchilar, ma'lumot turlari, operatorlar",
    type: "closed",
    question: "Bu kodda qanday xatolik bor? x = '5'; print(x + 2)",
    options: ['TypeError: can only concatenate str (not "int") to str', "SyntaxError", "NameError", "Xatolik yo'q"],
    correctAnswer: 'TypeError: can only concatenate str (not "int") to str',
  },

  // Shart operatorlari, sikllar, range(), enumerate() (11-20)
  {
    id: 11,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "Quyidagi kod qanday natija beradi: for i in range(1, 5): print(i)",
    options: ["1 2 3 4", "1 2 3 4 5", "0 1 2 3 4", "1 2 3"],
    correctAnswer: "1 2 3 4",
  },
  {
    id: 12,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "Python'da 'if 0:' shart bloki bajariladimi?",
    options: ["Ha", "Yo'q", "Xatolik beradi", "Python versiyasiga bog'liq"],
    correctAnswer: "Yo'q",
  },
  {
    id: 13,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "range(2, 10, 3) funksiyasi nechta qiymat beradi?",
    options: ["3", "2", "4", "8"],
    correctAnswer: "3",
  },
  {
    id: 14,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "1 dan 100 gacha bo'lgan oraliqda 10 ga bo'linadigan sonlar ro'yxatini qaysi funksiya beradi?",
    options: ["range(10, 101, 10)", "range(1, 101, 10)", "range(0, 100, 10)", "range(10, 100, 10)"],
    correctAnswer: "range(10, 101, 10)",
  },
  {
    id: 15,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "for i, val in enumerate(['a', 'b', 'c']): print(i, val) kodi qanday natija beradi?",
    options: ["0 a\n1 b\n2 c", "1 a\n2 b\n3 c", "a 0\nb 1\nc 2", "a\nb\nc"],
    correctAnswer: "0 a\n1 b\n2 c",
  },
  {
    id: 16,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "Quyidagi kod natijasi nima? i = 0; while i < 3: print(i); i += 1",
    options: ["0\n1\n2", "1\n2\n3", "0\n1\n2\n3", "Cheksiz sikl"],
    correctAnswer: "0\n1\n2",
  },
  {
    id: 17,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "Quyidagi kodda cheksiz sikl (infinite loop) xatoligi bormi? while True: break",
    options: [
      "Ha, break buyruq'i ishlamaydi",
      "Yo'q, break buyrug'i sikl bajarilishini to'xtatadi",
      "Ha, True har doim rost bo'lgani uchun",
      "Yo'q, lekin kod xato yozilgan",
    ],
    correctAnswer: "Yo'q, break buyrug'i sikl bajarilishini to'xtatadi",
  },
  {
    id: 18,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "if 3 > 2 and 1 < 4: shart ifodasi bajariladimi?",
    options: ["Ha", "Yo'q", "Xatolik beradi", "Python versiyasiga bog'liq"],
    correctAnswer: "Ha",
  },
  {
    id: 19,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "Bu kodda xato bormi? x = 5; if x != 5: print(\"Wrong\") else: print(\"Right\")",
    options: ["Ha, sintaksis xato", "Yo'q, kod to'g'ri yozilgan", "Ha, else ishlatilishi mumkin emas", "Ha, x != 5 noto'g'ri yozilgan"],
    correctAnswer: "Yo'q, kod to'g'ri yozilgan",
  },
  {
    id: 20,
    category: "Shart operatorlari va sikllar",
    type: "closed",
    question: "while False: buyrug'i bajarilishi mumkinmi?",
    options: ["Ha", "Yo'q", "Xatolik beradi", "Python versiyasiga bog'liq"],
    correctAnswer: "Yo'q",
  },

  // Funksiya, argument, return, *args, **kwargs (21-30)
  {
    id: 21,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "Ikki sonni qo'shadigan funksiyani yozish uchun qaysi kod to'g'ri?",
    options: [
      "def add(x, y):\n    return x + y",
      "function add(x, y):\n    return x + y",
      "def add(x, y):\n    print(x + y)",
      "def add(x + y):\n    return x + y",
    ],
    correctAnswer: "def add(x, y):\n    return x + y",
  },
  {
    id: 22,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "Bu kodning natijasi nima bo'ladi? def f(x): return x * x; print(f(3))",
    options: ["9", "6", "3", "Error"],
    correctAnswer: "9",
  },
  {
    id: 23,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "def f(x=5): print(x) funksiyasi f() ko'rinishida chaqirilsa nima natija beradi?",
    options: ["5", "None", "Error", "0"],
    correctAnswer: "5",
  },
  {
    id: 24,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "Python'da *args va **kwargs nima uchun ishlatiladi?",
    options: [
      "O'zgaruvchan miqdordagi positional va kalit so'z argumentlarini qabul qilish uchun",
      "Faqat global o'zgaruvchilar bilan ishlash uchun",
      "Funksiyani tezroq ishlashi uchun",
      "Faqat klasslar ichida ishlatish uchun",
    ],
    correctAnswer: "O'zgaruvchan miqdordagi positional va kalit so'z argumentlarini qabul qilish uchun",
  },
  {
    id: 25,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "def f(*args): print(args) funksiyasi f(1, 2, 3) ko'rinishida chaqirilsa natija nima bo'ladi?",
    options: ["(1, 2, 3)", "[1, 2, 3]", "1 2 3", "Error"],
    correctAnswer: "(1, 2, 3)",
  },
  {
    id: 26,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "Bu kodning natijasi nima bo'ladi? def say_hello(): return \"Hello\"; print(say_hello())",
    options: ["Hello", "None", '\"Hello\"', "Error"],
    correctAnswer: "Hello",
  },
  {
    id: 27,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "Uchta sonning eng kattasini qaytaruvchi funksiyani qaysi ko'd to'g'ri ifodalaydi?",
    options: [
      "def max_of_three(a, b, c):\n    return max(a, b, c)",
      "def max_of_three(a, b, c):\n    return a if a > b and a > c else b if b > c else c",
      "def max_of_three(a, b, c):\n    if a > b and a > c: return a\n    elif b > c: return b\n    else: return c",
      "Barcha javoblar to'g'ri",
    ],
    correctAnswer: "Barcha javoblar to'g'ri",
  },
  {
    id: 28,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "Python'da global kalit so'zi nima uchun ishlatiladi?",
    options: [
      "Funksiya ichida global o'zgaruvchilarga kirish va ularni o'zgartirish uchun",
      "Funksiyani global qilish uchun",
      "Global o'zgaruvchilarni o'chirish uchun",
      "Funksiyani tezroq ishlashi uchun",
    ],
    correctAnswer: "Funksiya ichida global o'zgaruvchilarga kirish va ularni o'zgartirish uchun",
  },
  {
    id: 29,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "Bu kodda qanday xatolik bor? def test(x, y): return x + y; print(test(3))",
    options: [
      "TypeError: test() missing 1 required positional argument: 'y'",
      "SyntaxError",
      "NameError",
      "Xatolik yo'q",
    ],
    correctAnswer: "TypeError: test() missing 1 required positional argument: 'y'",
  },
  {
    id: 30,
    category: "Funksiyalar va argumentlar",
    type: "closed",
    question: "lambda x: x * 2 anonim funksiyani oddiy funksiya ko'rinishida qaysi javob to'g'ri ifodalaydi?",
    options: [
      "def multiply_by_two(x):\n    return x * 2",
      "def lambda(x):\n    return x * 2",
      "def x():\n    return x * 2",
      "def multiply_by_two(x):\n    print(x * 2)",
    ],
    correctAnswer: "def multiply_by_two(x):\n    return x * 2",
  },

  // String, split(), join(), map(), filter(), lambda (31-40)
  {
    id: 31,
    category: "String va funksiyalar",
    type: "closed",
    question: "\"python\".upper() metodining natijasi nima bo'ladi?",
    options: ["PYTHON", "Python", "PythOn", "python"],
    correctAnswer: "PYTHON",
  },
  {
    id: 32,
    category: "String va funksiyalar",
    type: "closed",
    question: "\"hello world\".split() metodining natijasi nima bo'ladi?",
    options: [
      "['hello', 'world']",
      "['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']",
      "['hello world']",
      "['helloworld']",
    ],
    correctAnswer: "['hello', 'world']",
  },
  {
    id: 33,
    category: "String va funksiyalar",
    type: "closed",
    question: "\".\".join(['a', 'b', 'c']) metodining natijasi nima bo'ladi?",
    options: ["a.b.c", "abc", "a,b,c", ".a.b.c"],
    correctAnswer: "a.b.c",
  },
  {
    id: 34,
    category: "String va funksiyalar",
    type: "closed",
    question: "list(map(lambda x: x+1, [1,2,3])) ifodasi qanday natija beradi?",
    options: ["[2, 3, 4]", "[1, 2, 3, 1]", "[1, 2, 3]", "[1, 2, 3, 4]"],
    correctAnswer: "[2, 3, 4]",
  },
  {
    id: 35,
    category: "String va funksiyalar",
    type: "closed",
    question: "Python'da filter() funksiyasi qanday ishlaydi?",
    options: [
      "Birinchi argumenti sifatida berilgan funksiya True qaytaradigan ikkinchi argument elementlari kollektsiyasini qaytaradi",
      "Kolleksiyadagi barcha elementlarni filtrlaydi va o'zgartiradi",
      "Faqat raqamli qiymatlarni filtrlaydi",
      "Faqat matn tipidagi ma'lumotlarni filtrlaydi",
    ],
    correctAnswer:
      "Birinchi argumenti sifatida berilgan funksiya True qaytaradigan ikkinchi argument elementlari kollektsiyasini qaytaradi",
  },
  {
    id: 36,
    category: "String va funksiyalar",
    type: "closed",
    question: "list(filter(lambda x: x%2==0, range(5))) ifodasi qanday natija beradi?",
    options: ["[0, 2, 4]", "[0, 2]", "[2, 4]", "[1, 3]"],
    correctAnswer: "[0, 2, 4]",
  },
  {
    id: 37,
    category: "String va funksiyalar",
    type: "closed",
    question: "Bu kodning natijasi nima bo'ladi? x = list(\"abc\"); x[0] = 'z'; print(x)",
    options: ["['z', 'b', 'c']", "['a', 'b', 'c']", "['z', 'a', 'b', 'c']", "Error"],
    correctAnswer: "['z', 'b', 'c']",
  },
  {
    id: 38,
    category: "String va funksiyalar",
    type: "closed",
    question: "\"Abc\".lower().capitalize() metodlarini ketma-ket qo'llaganda qanday natija hosil bo'ladi?",
    options: ["Abc", "abc", "ABC", "aBC"],
    correctAnswer: "Abc",
  },
  {
    id: 39,
    category: "String va funksiyalar",
    type: "closed",
    question: "name = \"Ali\" bo'lganda, f\"Hello, {name}!\" ifodasi qanday natija beradi?",
    options: ["Hello, Ali!", "Hello, name!", "Hello, {name}!", "Error"],
    correctAnswer: "Hello, Ali!",
  },
  {
    id: 40,
    category: "String va funksiyalar",
    type: "closed",
    question: "lambda x: x if x > 0 else -x anonim funksiyasi qanday vazifani bajaradi?",
    options: [
      "Sonning absolyut qiymatini qaytaruvchi funksiya (abs)",
      "Sonni ikkilantiruvchi funksiya",
      "Faqat musbat sonlarni qaytaruvchi funksiya",
      "Faqat manfiy sonlarni qaytaruvchi funksiya",
    ],
    correctAnswer: "Sonning absolyut qiymatini qaytaruvchi funksiya (abs)",
  },
];

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    // Check if user data exists
    const storedUserData = sessionStorage.getItem("userData")
    if (!storedUserData) {
      router.push("/register")
      return
    }

    setUserData(JSON.parse(storedUserData))

    // Animate progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100
    const duration = 500 // ms
    const interval = 10 // ms
    const step = progress / (duration / interval)

    let currentProgress = 0
    const timer = setInterval(() => {
      currentProgress += step
      if (currentProgress >= progress) {
        currentProgress = progress
        clearInterval(timer)
      }
      setProgressValue(currentProgress)
    }, interval)

    return () => clearInterval(timer)
  }, [router, currentQuestion])

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredQuestions = questions.filter((q) => !answers[q.id])

    if (unansweredQuestions.length > 0) {
      toast({
        title: "Barcha savollarga javob bering",
        description: `${unansweredQuestions.length} ta savol javobsiz qoldi`,
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Calculate statistics
      const closedQuestions = questions.filter((q) => q.type === "closed")
      const correctAnswers = closedQuestions.filter((q) => answers[q.id] === q.correctAnswer).length
      const score = Math.round((correctAnswers / closedQuestions.length) * 100)

      // Prepare data for submission
      const submissionData = {
        userData,
        answers: questions.map((q) => ({
          questionId: q.id,
          question: q.question,
          answer: answers[q.id],
          type: q.type,
          correctAnswer: q.type === "closed" ? q.correctAnswer : null,
        })),
      }

      // Create a result object with additional statistics
      const resultData = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        userData,
        answers: submissionData.answers,
        score,
        totalQuestions: questions.length,
        correctAnswers,
      }

      // Store in localStorage for admin panel
      const existingResults = localStorage.getItem("testResults")
      let allResults = []

      if (existingResults) {
        try {
          allResults = JSON.parse(existingResults)
        } catch (e) {
          console.error("Error parsing existing results:", e)
          allResults = []
        }
      }

      allResults.push(resultData)
      localStorage.setItem("testResults", JSON.stringify(allResults))

      // Send data to API
      const response = await fetch("/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submissionData,
          score,
          totalQuestions: questions.length,
          correctAnswers,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Natijalarni yuborishda xatolik yuz berdi")
      }

      // Show success message
      toast({
        title: "Test yakunlandi",
        description: "Natijalaringiz muvaffaqiyatli yuborildi!",
        variant: "default",
      })

      // Store results in session storage for results page
      sessionStorage.setItem(
        "testResults",
        JSON.stringify({
          ...submissionData,
          score,
          totalQuestions: questions.length,
          correctAnswers,
        }),
      )

      // Navigate to results page
      router.push("/results")
    } catch (error) {
      console.error(error)
      toast({
        title: "Xatolik",
        description: "Natijalarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  {currentQuestion + 1}
                </span>
                <span>/ {questions.length}</span>
              </CardTitle>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {userData.firstName} {userData.lastName}
              </span>
            </div>
            <Progress value={progressValue} className="h-2" />
            <CardDescription className="mt-6 text-lg font-medium text-gray-800">{currentQ.question}</CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentQ.type === "closed" ? (
                  <RadioGroup
                    value={answers[currentQ.id] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-3"
                  >
                    {currentQ.options?.map((option, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Textarea
                    placeholder="Javobingizni shu yerga yozing..."
                    className="min-h-[150px] focus:border-blue-400"
                    value={answers[currentQ.id] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Oldingi
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-1" /> Yuklanmoqda...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" /> Testni yakunlash
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
                  Keyingi <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
