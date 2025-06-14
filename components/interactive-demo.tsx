"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageCircle, Sparkles } from "lucide-react"

export default function InteractiveDemo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedVariations, setSelectedVariations] = useState<string[]>([])

  const products = [
    { value: "cubo", label: "Cubo Geométrico" },
    { value: "macrame", label: "Macramê" },
    { value: "puzzle", label: "Puzzle" },
    { value: "almofada", label: "Almofada" },
  ]

  const materials = [
    { value: "madeira", label: "Madeira Natural" },
    { value: "pedra", label: "Pedra Semipreciosa" },
    { value: "metal", label: "Metal Artesanal" },
    { value: "tecido", label: "Tecido Premium" },
    { value: "corda", label: "Corda Natural" },
  ]

  const variations = [
    { id: "personalizado", label: "Design Personalizado" },
    { id: "cores", label: "Cores Customizadas" },
    { id: "tamanho", label: "Tamanho Especial" },
    { id: "gravacao", label: "Gravação/Bordado" },
  ]

  const handleVariationChange = (variationId: string, checked: boolean) => {
    if (checked) {
      setSelectedVariations([...selectedVariations, variationId])
    } else {
      setSelectedVariations(selectedVariations.filter((id) => id !== variationId))
    }
  }

  const generateWhatsAppMessage = () => {
    const productName = products.find((p) => p.value === selectedProduct)?.label || "Produto"
    const materialName = materials.find((m) => m.value === selectedMaterial)?.label || "Material"
    const variationNames = selectedVariations
      .map((id) => variations.find((v) => v.id === id)?.label)
      .filter(Boolean)
      .join(", ")

    let message = `Olá! Tenho interesse em um ${productName}`

    if (selectedMaterial) {
      message += ` em ${materialName}`
    }

    if (variationNames) {
      message += ` com as seguintes opções: ${variationNames}`
    }

    message += ". Gostaria de saber mais detalhes, preços e prazos. Obrigado!"

    return encodeURIComponent(message)
  }

  const openWhatsApp = () => {
    if (!selectedProduct) {
      alert("Por favor, selecione um produto primeiro!")
      return
    }

    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank")
  }

  return (
    <section id="demo" className="py-20 bg-white" ref={ref}>
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#594838] mb-6">Demonstração Interativa</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D99B66] to-[#F27244] mx-auto mb-8"></div>
          <p className="text-xl text-[#594838]/80 max-w-3xl mx-auto">
            Configure seu produto ideal e entre em contato conosco diretamente pelo WhatsApp
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-orange-50 overflow-hidden">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-[#594838] flex items-center justify-center gap-3">
                  <Sparkles className="w-8 h-8 text-[#F27244]" />
                  Configure Seu Produto
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Product Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-3"
                >
                  <label className="text-lg font-semibold text-[#594838] block">Tipo de Produto *</label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="h-12 text-lg border-2 border-[#D99B66]/30 focus:border-[#F27244]">
                      <SelectValue placeholder="Selecione o tipo de produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.value} value={product.value}>
                          {product.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Material Selection */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-3"
                >
                  <label className="text-lg font-semibold text-[#594838] block">Material/Pedra</label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger className="h-12 text-lg border-2 border-[#D99B66]/30 focus:border-[#F27244]">
                      <SelectValue placeholder="Selecione o material (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.value} value={material.value}>
                          {material.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Variations */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-4"
                >
                  <label className="text-lg font-semibold text-[#594838] block">Opções Adicionais</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {variations.map((variation) => (
                      <div
                        key={variation.id}
                        className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-[#D99B66]/10 to-[#F27244]/10 hover:from-[#D99B66]/20 hover:to-[#F27244]/20 transition-all duration-300"
                      >
                        <Checkbox
                          id={variation.id}
                          checked={selectedVariations.includes(variation.id)}
                          onCheckedChange={(checked) => handleVariationChange(variation.id, checked as boolean)}
                          className="data-[state=checked]:bg-[#F27244] data-[state=checked]:border-[#F27244]"
                        />
                        <label htmlFor={variation.id} className="text-[#594838] font-medium cursor-pointer flex-1">
                          {variation.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* WhatsApp Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center pt-8"
                >
                  <Button
                    onClick={openWhatsApp}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Falar no WhatsApp
                  </Button>

                  <p className="text-[#594838]/70 mt-4 text-sm">
                    Sua mensagem será gerada automaticamente com as opções selecionadas
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
