"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, CheckCircle, Clock, Award } from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative bg-gradient-to-b from-blue-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

        {/* Animated circles in background */}
        <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-100 opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              O'quvchilar uchun test platformasi
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Bilimingizni sinab ko'rish uchun testni boshlang. Test yakunida natijalaringiz o'qituvchiga yuboriladi.
            </motion.p>
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Testni boshlash
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Platformaning afzalliklari
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="h-10 w-10 text-blue-500" />,
                title: "Turli xil savollar",
                description: "Ochiq va yopiq turdagi savollar bilan bilimingizni sinab ko'ring",
                delay: 0.1,
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-green-500" />,
                title: "Darhol natijalar",
                description: "Test yakunida darhol natijalaringizni ko'ring",
                delay: 0.2,
              },
              {
                icon: <Clock className="h-10 w-10 text-amber-500" />,
                title: "Vaqtni tejash",
                description: "Tezkor va qulay interfeys orqali vaqtingizni tejang",
                delay: 0.3,
              },
              {
                icon: <Award className="h-10 w-10 text-purple-500" />,
                title: "Yuqori sifat",
                description: "Yuqori sifatli savollar bilan bilimingizni rivojlantiring",
                delay: 0.4,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">Tayyor bo'lsangiz, boshlang!</h2>
            <p className="text-lg text-gray-600">Bilimingizni sinab ko'rish uchun hoziroq testni boshlang.</p>
            <div className="pt-4">
              <Link href="/register">
                <Button size="lg" className="px-8 py-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-700">
                  Testni boshlash
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
