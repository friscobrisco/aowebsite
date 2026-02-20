import { useEffect, useRef, useState } from 'react'

export function PathReveal() {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const enterProgress = 1 - (rect.top / windowHeight)
      const progress = Math.max(0, Math.min(1, (enterProgress - 0.2) * 1.2))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="min-h-[50vh] flex items-center justify-center relative overflow-hidden"
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
        marginBottom: `-${scrollProgress * 100}px`,
      }}
    >
      {/* Background path lines extending into distance */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotateX(${scrollProgress * 60}deg) translateZ(${scrollProgress * -200}px)`,
          transformStyle: 'preserve-3d',
          opacity: scrollProgress > 0.1 ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {/* Central path/road */}
        <div 
          className="absolute"
          style={{
            width: '2px',
            height: `${300 + scrollProgress * 500}px`,
            background: `linear-gradient(to bottom, rgba(255,255,255,${0.1 + scrollProgress * 0.2}), transparent)`,
            transform: 'translateY(-50%)',
          }}
        />
        
        {/* Path edge lines */}
        {[-1, 1].map((side) => (
          <div
            key={side}
            className="absolute"
            style={{
              width: '1px',
              height: `${200 + scrollProgress * 600}px`,
              background: `linear-gradient(to bottom, rgba(255,255,255,${0.03 + scrollProgress * 0.1}), transparent)`,
              transform: `translateX(${side * (50 + scrollProgress * 150)}px) translateY(-30%)`,
            }}
          />
        ))}

        {/* Perspective grid lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: '1px',
              background: `linear-gradient(to right, transparent, rgba(255,255,255,${0.02 + scrollProgress * 0.05}), transparent)`,
              transform: `translateY(${-100 + i * (50 + scrollProgress * 30)}px) scaleX(${0.3 + i * 0.1 + scrollProgress * 0.5})`,
              opacity: scrollProgress > 0.2 ? 1 - (i * 0.15) : 0,
            }}
          />
        ))}
      </div>

      {/* Floating particles along the path */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => {
          const baseX = 50 + (Math.sin(i * 1.3) * 20)
          const baseY = 30 + (i * 4)
          const moveY = scrollProgress * 60
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${baseX}%`,
                top: `${baseY + moveY * (i * 0.1)}%`,
                transform: `scale(${1 + scrollProgress * (i * 0.15)})`,
                opacity: scrollProgress > (i * 0.05) ? 0.2 + scrollProgress * 0.3 : 0,
                transition: 'opacity 0.2s ease-out',
              }}
            />
          )
        })}
      </div>

      {/* Main text - "a different path" */}
      <div 
        className="relative z-10 text-center"
        style={{
          transform: `
            scale(${1 + scrollProgress * 1.2}) 
            translateY(${scrollProgress * -30}px)
            rotateX(${scrollProgress * -10}deg)
          `,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            opacity: 1 - scrollProgress * 0.9,
            transform: `translateZ(${scrollProgress * 150}px)`,
            filter: `blur(${scrollProgress * 5}px)`,
          }}
        >
          <span 
            className="text-2xl md:text-4xl font-light tracking-[0.2em] lowercase"
            style={{
              color: `rgba(255,255,255,${0.5 - scrollProgress * 0.3})`,
            }}
          >
            a different path
          </span>
        </div>
      </div>

      {/* Gradient fade to blend into next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: `${50 + scrollProgress * 50}%`,
          background: `linear-gradient(to top, rgba(0,0,0,1) ${scrollProgress * 30}%, transparent)`,
        }}
      />

      {/* Light beam effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
        style={{
          height: `${scrollProgress * 80}%`,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
          boxShadow: `0 0 ${10 + scrollProgress * 20}px ${2 + scrollProgress * 8}px rgba(255,255,255,${scrollProgress * 0.1})`,
          opacity: scrollProgress,
        }}
      />
    </div>
  )
}
