import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import RoutesSection from './components/RoutesSection.jsx'
import WhyUs from './components/WhyUs.jsx'
import StatsBand from './components/StatsBand.jsx'
import Testimonials from './components/Testimonials.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import BigCta from './components/BigCta.jsx'
import Footer from './components/Footer.jsx'
import WhatsApp from './components/WhatsApp.jsx'
import Accessibility from './pages/Accessibility.jsx'
import Privacy from './pages/Privacy.jsx'

// ראוטינג פשוט מבוסס hash: "#/privacy" → עמוד, "#routes" → גלילה בדף הבית
const pageFromHash = () => {
  const hash = window.location.hash
  if (hash.startsWith('#/accessibility')) return 'accessibility'
  if (hash.startsWith('#/privacy')) return 'privacy'
  return 'home'
}

export default function App() {
  const [page, setPage] = useState(pageFromHash)

  useEffect(() => {
    const onHash = () => setPage(pageFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [page])

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="live-region" />

      <Navbar />

      {page === 'accessibility' && <Accessibility />}
      {page === 'privacy' && <Privacy />}
      {page === 'home' && (
        <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <RoutesSection />
          <WhyUs />
          <StatsBand />
          <Testimonials />
          <Faq />
          <Contact />
          <BigCta />
        </main>
      )}

      <Footer />
      <WhatsApp />
    </>
  )
}
