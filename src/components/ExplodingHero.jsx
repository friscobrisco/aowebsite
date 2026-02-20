import { useEffect, useRef, useState } from 'react'

export function ExplodingHero({ text, subtext }) {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress: 0 at start, 1 when section is scrolled past
      const progress = Math.max(0, Math.min(1, -rect.top / (windowHeight * 0.8)))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Split text into words for individual animation
  const words = text.split(' ')
  
  return (
    <header ref={containerRef} className="min-h-[80vh] flex flex-col justify-center mb-24 relative">
      {/* Main exploding text */}
      <div 
        className="relative"
        style={{
          transform: `scale(${1 + scrollProgress * 0.5})`,
          opacity: 1 - scrollProgress * 1.2,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <p className="text-3xl md:text-4xl font-light leading-relaxed text-white/90">
          {words.map((word, i) => {
            // Each word gets a slightly different trajectory
            const angle = (i / words.length) * Math.PI * 2
            const distance = scrollProgress * 100
            const x = Math.sin(angle + i * 0.5) * distance
            const y = Math.cos(angle + i * 0.3) * distance * 0.5
            const rotate = (i - words.length / 2) * scrollProgress * 15
            const blur = scrollProgress * 8
            
            return (
              <span
                key={i}
                className="inline-block mr-[0.3em] last:mr-0"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                  filter: `blur(${blur}px)`,
                  opacity: 1 - scrollProgress * 0.8,
                  transition: 'transform 0.05s ease-out, filter 0.05s ease-out',
                }}
              >
                {word}
              </span>
            )
          })}
        </p>
      </div>

      {/* Subtext - "They won't." */}
      <div
        className="mt-12"
        style={{
          transform: `scale(${1 + scrollProgress * 0.3}) translateY(${scrollProgress * 30}px)`,
          opacity: Math.max(0, 1 - scrollProgress * 1.5),
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        }}
      >
        <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/40">
          {subtext}
        </p>
      </div>

      {/* Particle trails during explosion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {scrollProgress > 0.1 && [...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const distance = scrollProgress * 200
          const x = 50 + Math.sin(angle) * distance * 0.5
          const y = 50 + Math.cos(angle) * distance * 0.3
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                opacity: scrollProgress * 0.5 * (1 - scrollProgress),
                transform: `scale(${1 + scrollProgress * 2})`,
                transition: 'all 0.1s ease-out',
              }}
            />
          )
        })}
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: 1 - scrollProgress * 3,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </header>
  )
}
