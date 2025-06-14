"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Play, Clock, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Videos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const videos = [
    {
      title: "Processo Artesanal",
      description: "Veja como criamos cada peça com dedicação e técnica",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Processo+Artesanal",
      duration: "3:45",
      views: "1.2k",
      embedId: "dQw4w9WgXcQ", // Exemplo de ID do YouTube
    },
    {
      title: "Aplicações dos Produtos",
      description: "Descubra as diversas formas de usar nossos produtos",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Aplicações",
      duration: "2:30",
      views: "890",
      embedId: "dQw4w9WgXcQ",
    },
    {
      title: "Making Of & Depoimentos",
      description: "Bastidores da criação e feedback dos nossos clientes",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Making+Of",
      duration: "4:15",
      views: "2.1k",
      embedId: "dQw4w9WgXcQ",
    },
  ]

  return (
    <section id="videos" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50" ref={ref}>
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#594838] mb-6">Vídeos</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D99B66] to-[#F27244] mx-auto mb-8"></div>
          <p className="text-xl text-[#594838]/80 max-w-3xl mx-auto">
            Conheça nosso processo criativo e veja nossos produtos em ação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.embedId}`, "_blank")}
                      >
                        <Play className="w-8 h-8 text-[#F27244] ml-1" />
                      </motion.div>
                    </div>

                    {/* Video Stats */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {video.duration}
                      </div>
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {video.views}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#594838] mb-3 group-hover:text-[#F27244] transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-[#594838]/70 leading-relaxed">{video.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#D99B66]/10 to-[#F27244]/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#594838] mb-4">Quer ver mais conteúdo?</h3>
            <p className="text-[#594838]/80 mb-6 max-w-2xl mx-auto">
              Siga-nos nas redes sociais para acompanhar nossos processos criativos, novos produtos e dicas de
              decoração.
            </p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#D99B66] to-[#F27244] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                onClick={() => window.open("https://instagram.com/macraverso", "_blank")}
              >
                Instagram
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                onClick={() => window.open("https://youtube.com/@macraverso", "_blank")}
              >
                YouTube
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
