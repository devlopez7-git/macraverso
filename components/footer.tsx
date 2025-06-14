"use client"

import { motion } from "framer-motion"
import { Heart, Instagram, Youtube, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/macraverso", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@macraverso", label: "YouTube" },
    { icon: Mail, href: "mailto:contato@macraverso.com", label: "E-mail" },
  ]

  const quickLinks = [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Produtos", href: "#products" },
    { label: "Contato", href: "#contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gradient-to-br from-[#594838] to-[#0D0000] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D99B66] to-[#F27244] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold">Macraverso</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Criando arte através do artesanato. Cada peça é única e feita com amor e dedicação.
            </p>
            <div className="flex items-center space-x-2 text-white/70">
              <MapPin className="w-4 h-4" />
              <span>São Paulo, SP</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-[#D99B66]">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-[#D99B66] transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-[#D99B66]">Nossos Produtos</h3>
            <ul className="space-y-2 text-white/80">
              <li>Cubos Geométricos</li>
              <li>Macramês</li>
              <li>Puzzles</li>
              <li>Almofadas</li>
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-[#D99B66]">Redes Sociais</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-br from-[#D99B66] to-[#F27244] rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-white/80 text-sm mb-2">Atendimento:</p>
              <p className="text-white/80 text-sm">Segunda a Sexta</p>
              <p className="text-white/80 text-sm">9h às 18h</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 mt-12 pt-8 text-center"
        >
          <p className="text-white/70 flex items-center justify-center space-x-2">
            <span>&copy; {currentYear} Macraverso. Todos os direitos reservados.</span>
            <span className="text-[#D99B66]">•</span>
            <span className="flex items-center space-x-1">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>e dedicação</span>
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
