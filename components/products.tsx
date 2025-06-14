"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import EnhancedCarousel from "./enhanced-carousel"

export default function Products() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState(0)

  const categories = [
    {
      name: "Cubos",
      description: "Cubos geométricos únicos com designs inspiradores",
      color: "from-[#D99B66] to-[#BFA393]",
      images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=300&width=300&text=Cubo+${i + 1}`),
    },
    {
      name: "Macramês",
      description: "Peças elegantes em macramê para decoração",
      color: "from-[#F27244] to-[#F29191]",
      images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=300&width=300&text=Macramê+${i + 1}`),
    },
    {
      name: "Puzzles",
      description: "Quebra-cabeças desafiadores e educativos",
      color: "from-[#BFA393] to-[#D99B66]",
      images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=300&width=300&text=Puzzle+${i + 1}`),
    },
    {
      name: "Almofadas",
      description: "Almofadas artesanais para conforto e estilo",
      color: "from-[#F29191] to-[#F27244]",
      images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=300&width=300&text=Almofada+${i + 1}`),
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const itemsPerSlide = 4

  const nextSlide = () => {
    const maxSlide = Math.ceil(categories[activeCategory].images.length / itemsPerSlide) - 1
    setCurrentSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1)
  }

  const prevSlide = () => {
    const maxSlide = Math.ceil(categories[activeCategory].images.length / itemsPerSlide) - 1
    setCurrentSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1)
  }

  return (
    <section id="products" className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-orange-50" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#594838] mb-4 md:mb-6 px-4">
            Nossos Produtos
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-[#D99B66] to-[#F27244] mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-[#594838]/80 max-w-3xl mx-auto px-4">
            Explore nossa coleção única de produtos artesanais, cada um criado com dedicação e amor pelos detalhes.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4"
        >
          {categories.map((category, index) => (
            <Button
              key={category.name}
              onClick={() => {
                setActiveCategory(index)
                setCurrentSlide(0)
              }}
              variant={activeCategory === index ? "default" : "outline"}
              className={`px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full font-semibold transition-all duration-300 ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "border-2 border-[#D99B66] text-[#594838] hover:bg-[#D99B66] hover:text-white"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Active Category Info */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 px-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#594838] mb-3 md:mb-4">
            {categories[activeCategory].name}
          </h3>
          <p className="text-base md:text-lg text-[#594838]/80 max-w-2xl mx-auto">
            {categories[activeCategory].description}
          </p>
        </motion.div>

        {/* Product Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <EnhancedCarousel images={categories[activeCategory].images} category={categories[activeCategory]} />
        </motion.div>
      </div>
    </section>
  )
}
