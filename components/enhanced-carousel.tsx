"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye, Heart, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  description: string
  image: string
  category: string
  details: string
  price?: string
}

interface CarouselProps {
  images: string[]
  category: {
    name: string
    color: string
  }
}

export default function EnhancedCarousel({ images, category }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Responsive slides per view
  const [slidesPerView, setSlidesPerView] = useState(1)

  // Convert images to products with details
  const products: Product[] = images.map((image, index) => ({
    id: index,
    name: `${category.name} ${index + 1}`,
    description: `Peça artesanal única de ${category.name.toLowerCase()} criada com dedicação e técnica especial.`,
    image: image,
    category: category.name,
    details: `Esta é uma peça exclusiva da nossa coleção de ${category.name.toLowerCase()}. Cada item é cuidadosamente elaborado à mão, utilizando materiais de alta qualidade e técnicas tradicionais. Perfeita para decoração e uso funcional, esta peça traz elegância e personalidade para qualquer ambiente.`,
    price: "Consulte valores",
  }))

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)

      if (width >= 1280) {
        setSlidesPerView(4)
      } else if (width >= 1024) {
        setSlidesPerView(3)
      } else if (width >= 768) {
        setSlidesPerView(2)
      } else if (width >= 640) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  const maxSlide = Math.max(0, images.length - slidesPerView)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }, [maxSlide])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }, [maxSlide])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || selectedProduct) return

    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, selectedProduct])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < maxSlide) {
      nextSlide()
    } else if (isRightSwipe && currentSlide > 0) {
      prevSlide()
    }

    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsAutoPlaying(false)
  }

  const closeProductDetails = () => {
    setSelectedProduct(null)
    setTimeout(() => setIsAutoPlaying(true), 1000)
  }

  const handleWhatsAppContact = (product: Product) => {
    const message = `Olá! Tenho interesse no produto "${product.name}" da categoria ${product.category}. Gostaria de saber mais detalhes, preços e disponibilidade. Obrigado!`
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Main Carousel */}
        <div
          className="carousel-container relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => !isMobile && setIsAutoPlaying(false)}
          onMouseLeave={() => !isMobile && setIsAutoPlaying(true)}
        >
          <motion.div
            className="carousel-track"
            animate={{
              x: `${-currentSlide * (100 / slidesPerView)}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="carousel-slide">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="product-card group h-full cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <CardContent className="p-0 relative h-full">
                      <div className="product-image">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-white font-semibold text-sm bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                                {product.category}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Add to favorites logic here
                                }}
                              >
                                <Heart className="w-4 h-4" />
                              </motion.button>
                            </div>

                            <Button
                              size="sm"
                              className="w-full bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm font-medium"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleProductClick(product)
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons - Only on Desktop */}
          {!isMobile && maxSlide > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="carousel-nav carousel-nav-left"
                aria-label="Slide anterior"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="carousel-nav carousel-nav-right"
                aria-label="Próximo slide"
                disabled={currentSlide === maxSlide}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
            <motion.div
              className={`h-full bg-gradient-to-r ${category.color}`}
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / (maxSlide + 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Indicators */}
        {maxSlide > 0 && (
          <div className="carousel-indicators">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-indicator ${currentSlide === index ? "active" : ""}`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
            {currentSlide + 1} de {maxSlide + 1}
          </span>
        </div>

        {/* Mobile Swipe Hint */}
        {isMobile && (
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">← Deslize para navegar →</span>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProductDetails}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="modal-content bg-white rounded-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="modal-image w-full object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeProductDetails}
                  className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                  <span
                    className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-white text-xs md:text-sm font-medium bg-gradient-to-r ${category.color}`}
                  >
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#594838] mb-2">{selectedProduct.name}</h3>
                  <p className="text-[#594838]/70 text-base md:text-lg">{selectedProduct.description}</p>
                </div>

                <div className="bg-gradient-to-r from-[#D99B66]/10 to-[#F27244]/10 rounded-xl p-3 md:p-4">
                  <h4 className="font-semibold text-[#594838] mb-2 text-sm md:text-base">Detalhes do Produto</h4>
                  <p className="text-[#594838]/80 leading-relaxed text-sm md:text-base">{selectedProduct.details}</p>
                </div>

                {selectedProduct.price && (
                  <div className="text-center py-2 md:py-4">
                    <span className="text-xl md:text-2xl font-bold text-[#F27244]">{selectedProduct.price}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 md:gap-4">
                  <Button
                    onClick={() => handleWhatsAppContact(selectedProduct)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 md:py-3 text-sm md:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Falar no WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    onClick={closeProductDetails}
                    className="w-full border-2 border-[#D99B66] text-[#594838] hover:bg-[#D99B66] hover:text-white font-semibold py-3 md:py-3 text-sm md:text-base rounded-xl transition-all duration-300"
                  >
                    Continuar Navegando
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
