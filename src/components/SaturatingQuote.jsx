import { useEffect, useRef, useState } from 'react'

export function SaturatingQuote({ text }) {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const enterProgress = 1 - (rect.top / windowHeight)
      const progress = Math.max(0, Math.min(1, (enterProgress - 0.1) * 1.1))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Split text into lines for staggered effect
  const lines = text.split('. ').map((line, i, arr) => 
    i < arr.length - 1 ? line + '.' : line
  )

  return (
    <div 
      ref={containerRef} 
      className="min-h-[50vh] flex items-center justify-center relative overflow-hidden py-8"
    >
      {/* Background pulse */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,255,255,${scrollProgress * 0.03}) 0%, transparent 70%)`,
        }}
      />

      {/* Main text container */}
      <div 
        className="relative z-10 text-center px-4 max-w-5xl"
        style={{
          transform: `scale(${0.6 + scrollProgress * 3})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {lines.map((line, i) => {
          const lineDelay = i * 0.15
          const lineProgress = Math.max(0, Math.min(1, (scrollProgress - lineDelay) * 2))
          
          return (
            <div
              key={i}
              className="overflow-hidden"
              style={{
                marginBottom: i < lines.length - 1 ? `${0.3 + scrollProgress * 0.8}rem` : 0,
              }}
            >
              <p
                className="text-sm md:text-base lg:text-lg font-light leading-relaxed"
                style={{
                  opacity: 0.4 + lineProgress * 0.6,
                  transform: `translateY(${(1 - lineProgress) * 30}px)`,
                  color: `rgba(255,255,255,${0.5 + lineProgress * 0.5})`,
                  letterSpacing: `${0.02 + scrollProgress * 0.05}em`,
                  transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
                }}
              >
                {line}
              </p>
            </div>
          )
        })}
      </div>

      {/* Edge vignette that closes in then opens */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 ${100 + scrollProgress * 150}px ${50 + scrollProgress * 100}px rgba(0,0,0,${0.8 - scrollProgress * 0.5})`,
        }}
      />

      {/* Fade out as text gets huge */}
      <div 
        className="absolute inset-0 pointer-events-none bg-black"
        style={{
          opacity: scrollProgress > 0.7 ? (scrollProgress - 0.7) * 3 : 0,
        }}
      />

      {/* Subtle scan lines for texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          display: scrollProgress > 0.3 ? 'block' : 'none',
        }}
      />
    </div>
  )
}
