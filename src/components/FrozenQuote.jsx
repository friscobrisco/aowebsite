import { useEffect, useRef, useState } from 'react'

export function FrozenQuote({ text }) {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Progress starts when element enters viewport, completes when it leaves
      const enterProgress = 1 - (rect.top / windowHeight)
      const progress = Math.max(0, Math.min(1, enterProgress - 0.3) * 1.5)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Split into characters for individual freezing
  const chars = text.split('')
  
  // Frost color interpolation (white -> icy blue)
  const frostColor = `rgba(${180 + scrollProgress * 75}, ${220 + scrollProgress * 35}, ${255}, ${0.6 + scrollProgress * 0.4})`
  
  return (
    <div ref={containerRef} className="mb-16 py-12 relative overflow-hidden">
      {/* Frost overlay creeping from edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent ${60 - scrollProgress * 60}%, rgba(200, 230, 255, ${scrollProgress * 0.15}) ${100 - scrollProgress * 30}%)`,
        }}
      />
      
      {/* Ice crystal particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const x = (i * 17) % 100
          const y = (i * 23) % 100
          const delay = i * 0.05
          const size = 2 + (i % 3) * 2
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(200,230,255,0.4))',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                opacity: Math.max(0, (scrollProgress - delay) * 2) * (1 - scrollProgress * 0.3),
                transform: `scale(${1 + scrollProgress * 2}) rotate(${45 + scrollProgress * 90}deg)`,
                transition: 'opacity 0.2s ease-out',
              }}
            />
          )
        })}
      </div>

      {/* Frost creeping from borders */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 ${scrollProgress * 100}px ${scrollProgress * 30}px rgba(200, 230, 255, ${scrollProgress * 0.2})`,
        }}
      />

      {/* Main quote with freezing effect */}
      <blockquote 
        className="text-xl md:text-2xl font-light leading-relaxed border-l-2 pl-8 relative z-10"
        style={{
          borderColor: `rgba(${200 + scrollProgress * 55}, ${220 + scrollProgress * 35}, ${255}, ${0.2 + scrollProgress * 0.4})`,
        }}
      >
        <span className="relative">
          {chars.map((char, i) => {
            // Freeze spreads from edges to center
            const distFromCenter = Math.abs(i - chars.length / 2) / (chars.length / 2)
            const freezeDelay = (1 - distFromCenter) * 0.5
            const charFreeze = Math.max(0, Math.min(1, (scrollProgress - freezeDelay) * 3))
            
            // Jitter effect as it freezes
            const jitterX = charFreeze > 0.2 && charFreeze < 0.8 ? (Math.random() - 0.5) * 2 * (1 - charFreeze) : 0
            const jitterY = charFreeze > 0.2 && charFreeze < 0.8 ? (Math.random() - 0.5) * 1 * (1 - charFreeze) : 0
            
            return (
              <span
                key={i}
                className="inline-block transition-all duration-100"
                style={{
                  color: `rgba(${180 + charFreeze * 75}, ${200 + charFreeze * 55}, ${255}, ${0.6 + charFreeze * 0.4})`,
                  textShadow: charFreeze > 0.3 
                    ? `0 0 ${charFreeze * 10}px rgba(200, 230, 255, ${charFreeze * 0.5}), 0 0 ${charFreeze * 20}px rgba(150, 200, 255, ${charFreeze * 0.3})`
                    : 'none',
                  transform: `translate(${jitterX}px, ${jitterY}px)`,
                  // Slight stiffening effect
                  letterSpacing: char === ' ' ? '0.3em' : `${charFreeze * 0.02}em`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )
          })}
        </span>
      </blockquote>

      {/* Frozen "crack" lines */}
      {scrollProgress > 0.6 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => {
            const startX = 20 + i * 15
            const startY = 30 + (i % 3) * 20
            
            return (
              <svg
                key={i}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity: (scrollProgress - 0.6) * 2,
                }}
              >
                <path
                  d={`M ${startX}% ${startY}% L ${startX + 5}% ${startY + 10}% L ${startX + 2}% ${startY + 20}%`}
                  stroke="rgba(200, 230, 255, 0.3)"
                  strokeWidth="1"
                  fill="none"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100 - (scrollProgress - 0.6) * 250,
                  }}
                />
              </svg>
            )
          })}
        </div>
      )}

      {/* Breath/mist effect at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(200, 230, 255, ${scrollProgress * 0.1}), transparent)`,
        }}
      />
    </div>
  )
}
