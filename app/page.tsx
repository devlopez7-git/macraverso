"use client"
import { useScroll, useTransform } from "framer-motion"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Products from "@/components/products"
import InteractiveDemo from "@/components/interactive-demo"
import Videos from "@/components/videos"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <InteractiveDemo />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
