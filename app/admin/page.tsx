"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Search, User, Users, LogOut, BarChart } from "lucide-react"
import { motion } from "framer-motion"

// Define types for our data
interface UserData {
  firstName: string
  lastName: string
  phone: string
}

interface Answer {
  questionId: number
  question: string
  answer: string
  type: "open" | "closed"
  correctAnswer: string | null
}

interface TestResult {
  id: string
  timestamp: number
  userData: UserData
  answers: Answer[]
  score: number
  totalQuestions: number
  correctAnswers: number
}

export default function AdminPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [filteredResults, setFilteredResults] = useState<TestResult[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Load test results from localStorage
  useEffect(() => {
    const storedResults = localStorage.getItem("testResults")
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        setResults(parsedResults)
        setFilteredResults(parsedResults)
      } catch (e) {
        console.error("Error parsing stored results:", e)
      }
    }
  }, [])

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults(results)
    } else {
      const filtered = results.filter(
        (result) =>
          result.userData.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.userData.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.userData.phone.includes(searchTerm),
      )
      setFilteredResults(filtered)
    }
  }, [searchTerm, results])

  // Admin login
  const handleLogin = () => {
    // Simple admin password check - in a real app, use proper authentication
    if (password === "admin123") {
      setIsAdmin(true)
      setError("")
    } else {
      setError("Noto'g'ri parol")
    }
  }

  // Calculate overall statistics
  const totalTests = results.length
  const averageScore =
    totalTests > 0 ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / totalTests) : 0
  const highestScore = totalTests > 0 ? Math.max(...results.map((result) => result.score)) : 0
  const lowestScore = totalTests > 0 ? Math.min(...results.map((result) => result.score)) : 0

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-[350px] shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Admin panel</CardTitle>
              <CardDescription>Test natijalarini ko'rish uchun tizimga kiring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Parol</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  {error && (
                    <motion.p
                      className="text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>
                  Kirish
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <BarChart className="h-6 w-6 mr-2 text-blue-600" /> Admin Panel
          </h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => setIsAdmin(false)} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Chiqish
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Jami testlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">{totalTests}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">O'rtacha ball</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{averageScore}%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Eng yuqori ball</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">{highestScore}%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Eng past ball</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-2xl font-bold">{lowestScore}%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Tabs defaultValue="all" className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Barcha natijalar</TabsTrigger>
                <TabsTrigger value="details">Batafsil ma'lumot</TabsTrigger>
              </TabsList>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Qidirish..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ism-familiya</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Sana</TableHead>
                        <TableHead>To'g'ri javoblar</TableHead>
                        <TableHead>Ball</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResults.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            Natijalar topilmadi
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredResults.map((result) => (
                          <TableRow key={result.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              {result.userData.firstName} {result.userData.lastName}
                            </TableCell>
                            <TableCell>{result.userData.phone}</TableCell>
                            <TableCell>{new Date(result.timestamp).toLocaleString()}</TableCell>
                            <TableCell>
                              {result.correctAnswers}/{result.totalQuestions}
                            </TableCell>
                            <TableCell>{result.score}%</TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant={
                                  result.score >= 70 ? "success" : result.score >= 50 ? "warning" : "destructive"
                                }
                              >
                                {result.score >= 70 ? "A'lo" : result.score >= 50 ? "Yaxshi" : "Qoniqarsiz"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              {filteredResults.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Natijalar topilmadi</h3>
                    <p className="text-gray-500">Hech qanday test natijasi mavjud emas</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>
                                {result.userData.firstName} {result.userData.lastName}
                              </CardTitle>
                              <CardDescription>
                                {result.userData.phone} • {new Date(result.timestamp).toLocaleString()}
                              </CardDescription>
                            </div>
                            <Badge
                              variant={result.score >= 70 ? "success" : result.score >= 50 ? "warning" : "destructive"}
                            >
                              {result.score}%
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-medium mb-2">Savollar va javoblar:</h4>
                          <ul className="space-y-3">
                            {result.answers.map((answer, answerIndex) => (
                              <li key={answerIndex} className="border-b pb-2">
                                <p className="font-medium">
                                  {answerIndex + 1}. {answer.question}
                                </p>
                                <p className="text-gray-600 mt-1">Javob: {answer.answer}</p>
                                {answer.type === "closed" && (
                                  <p
                                    className={
                                      answer.answer === answer.correctAnswer
                                        ? "text-green-600 flex items-center"
                                        : "text-red-600 flex items-center"
                                    }
                                  >
                                    {answer.answer === answer.correctAnswer ? (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-1" /> To'g'ri
                                      </>
                                    ) : (
                                      <>
                                        <AlertCircle className="h-4 w-4 mr-1" /> Noto'g'ri (To'g'ri javob:{" "}
                                        {answer.correctAnswer})
                                      </>
                                    )}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
