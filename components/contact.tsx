"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    message: "",
  })

  const products = ["Cubo Geométrico", "Macramê", "Puzzle", "Almofada", "Outro"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateWhatsAppMessage = () => {
    let message = `Olá! Meu nome é ${formData.name || "[Nome]"}`

    if (formData.email) {
      message += ` (${formData.email})`
    }

    if (formData.product) {
      message += `\n\nTenho interesse em: ${formData.product}`
    }

    if (formData.message) {
      message += `\n\nMensagem: ${formData.message}`
    }

    message += "\n\nAguardo retorno. Obrigado!"

    return encodeURIComponent(message)
  }

  const handleWhatsAppSubmit = () => {
    if (!formData.name) {
      alert("Por favor, preencha pelo menos seu nome!")
      return
    }

    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank")
  }

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+55 (11) 99999-9999",
      action: () => window.open("https://wa.me/5511999999999", "_blank"),
    },
    {
      icon: Mail,
      title: "E-mail",
      info: "contato@macraverso.com",
      action: () => window.open("mailto:contato@macraverso.com", "_blank"),
    },
    {
      icon: MapPin,
      title: "Localização",
      info: "São Paulo, SP",
      action: () => {},
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Seg-Sex: 9h às 18h",
      action: () => {},
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#594838] mb-6">Entre em Contato</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D99B66] to-[#F27244] mx-auto mb-8"></div>
          <p className="text-xl text-[#594838]/80 max-w-3xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco para tirar dúvidas, fazer pedidos ou conhecer mais sobre
            nossos produtos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-orange-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#594838] text-center">Envie sua Mensagem</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#594838]">Nome *</label>
                  <Input
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-2 border-[#D99B66]/30 focus:border-[#F27244] h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#594838]">E-mail (opcional)</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-2 border-[#D99B66]/30 focus:border-[#F27244] h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#594838]">Produto de Interesse</label>
                  <Select value={formData.product} onValueChange={(value) => handleInputChange("product", value)}>
                    <SelectTrigger className="h-12 border-2 border-[#D99B66]/30 focus:border-[#F27244]">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#594838]">Mensagem</label>
                  <Textarea
                    placeholder="Conte-nos mais sobre o que você procura..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="border-2 border-[#D99B66]/30 focus:border-[#F27244] min-h-[120px] resize-none"
                  />
                </div>

                <Button
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-12 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar via WhatsApp
                </Button>

                <p className="text-xs text-[#594838]/60 text-center">
                  Ao clicar, você será redirecionado para o WhatsApp com sua mensagem pré-formatada
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#594838] mb-6">Informações de Contato</h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-[#D99B66]/10 to-[#F27244]/10 hover:from-[#D99B66]/20 hover:to-[#F27244]/20 transition-all duration-300 ${
                      info.action && info.title !== "Localização" && info.title !== "Horário" ? "cursor-pointer" : ""
                    }`}
                    onClick={info.action}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D99B66] to-[#F27244] rounded-full flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#594838]">{info.title}</h4>
                      <p className="text-[#594838]/70">{info.info}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-[#D99B66] to-[#F27244] rounded-2xl p-8 text-white"
            >
              <h4 className="text-xl font-bold mb-4">Atendimento Rápido</h4>
              <p className="mb-6 opacity-90">Precisa de uma resposta rápida? Fale conosco diretamente pelo WhatsApp!</p>
              <Button
                onClick={() =>
                  window.open("https://wa.me/5511999999999?text=Olá! Gostaria de falar com vocês.", "_blank")
                }
                variant="secondary"
                className="bg-white text-[#594838] hover:bg-gray-100 font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chamar no WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
