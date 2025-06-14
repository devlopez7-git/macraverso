"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Star, Users, Award } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { icon: Heart, label: "Peças Criadas", value: "500+" },
    { icon: Star, label: "Clientes Satisfeitos", value: "200+" },
    { icon: Users, label: "Anos de Experiência", value: "5+" },
    { icon: Award, label: "Produtos Únicos", value: "4" },
  ]

  return (
    <section id="about" className="py-16 md:py-20 bg-white" ref={ref}>
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#594838] mb-4 md:mb-6">Sobre o Macraverso</h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-[#D99B66] to-[#F27244] mx-auto mb-6 md:mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-[#D99B66]/20 to-[#F27244]/20 rounded-xl md:rounded-2xl blur-xl"></div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Artesã trabalhando"
                className="relative rounded-xl md:rounded-2xl shadow-2xl w-full h-64 md:h-80 object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 md:space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#594838] mb-3 md:mb-4">Nossa História e Paixão</h3>

            <p className="text-base md:text-lg text-[#594838]/80 leading-relaxed">
              O Macraverso nasceu da paixão pela criação artesanal e pelo desejo de trazer beleza e funcionalidade para
              o cotidiano das pessoas. Cada peça é cuidadosamente elaborada, combinando técnicas tradicionais com design
              contemporâneo.
            </p>

            <p className="text-base md:text-lg text-[#594838]/80 leading-relaxed">
              Nossos produtos únicos - cubos geométricos, macramês elegantes, puzzles desafiadores e almofadas
              aconchegantes - são mais do que objetos decorativos: são expressões de arte que conectam pessoas e
              espaços.
            </p>

            <div className="bg-gradient-to-r from-[#D99B66]/10 to-[#F27244]/10 rounded-xl p-4 md:p-6 mt-6 md:mt-8">
              <h4 className="text-lg md:text-xl font-semibold text-[#594838] mb-2 md:mb-3">Nossa Missão</h4>
              <p className="text-[#594838]/80 text-sm md:text-base">
                Criar peças artesanais únicas que inspirem, decorem e tragam alegria para a vida das pessoas, sempre com
                qualidade excepcional e atenção aos detalhes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#D99B66] to-[#F27244] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-[#594838] mb-1 md:mb-2">{stat.value}</div>
              <div className="text-[#594838]/70 font-medium text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
