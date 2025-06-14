"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D99B66]/20 via-[#BFA393]/10 to-[#F27244]/20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
      </div>

      {/* Floating Elements - Hidden on mobile */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-4 md:left-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#F27244] to-[#F29191] rounded-lg opacity-20 hidden sm:block"
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-40 right-4 md:right-20 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D99B66] to-[#BFA393] rounded-full opacity-30 hidden sm:block"
      />

      <div className="w-full max-w-7xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#F27244]" />
            <span className="text-[#594838] font-medium text-sm md:text-base">Artesanato Criativo</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#594838] mb-4 md:mb-6 leading-tight px-4">
            Bem-vindo ao{" "}
            <span className="bg-gradient-to-r from-[#D99B66] to-[#F27244] bg-clip-text text-transparent">
              Macraverso
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#594838]/80 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Descubra a magia do artesanato através de nossos cubos únicos, macramês elegantes, puzzles desafiadores e
            almofadas aconchegantes. Cada peça é uma obra de arte feita com amor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-[#D99B66] to-[#F27244] hover:from-[#F27244] hover:to-[#F29191] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explorar Produtos
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open(
                  "https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os produtos do Macraverso.",
                  "_blank",
                )
              }
              className="w-full sm:w-auto border-2 border-[#D99B66] text-[#594838] hover:bg-[#D99B66] hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-300"
            >
              Falar no WhatsApp
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer"
            onClick={scrollToProducts}
          >
            <ArrowDown className="w-8 h-8 text-[#D99B66]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
