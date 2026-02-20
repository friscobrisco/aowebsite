import { useScrollReveal } from '../hooks/useScrollReveal'

export function PathTransition() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 })

  return (
    <div ref={ref} className="mb-16 text-center">
      <div className="inline-block">
        {/* Animated line that draws itself */}
        <div 
          className="w-px mx-auto mb-8 bg-gradient-to-b from-transparent via-white/40 to-transparent transition-all duration-1000 ease-out"
          style={{
            height: isVisible ? '96px' : '0px',
            opacity: isVisible ? 1 : 0,
          }}
        />
        
        {/* Text with dissolve/blur effect */}
        <div
          className="relative overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1.5s ease-out 0.5s',
          }}
        >
          {/* Shimmer overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              transform: isVisible ? 'translateX(200%)' : 'translateX(-100%)',
              transition: 'transform 1.5s ease-out 0.6s',
            }}
          />
          
          {/* Main text with blur dissolve */}
          <p 
            className="text-sm tracking-widest text-white/30 uppercase relative"
            style={{
              filter: isVisible ? 'blur(0px)' : 'blur(8px)',
              transform: isVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'filter 1.2s ease-out 0.4s, transform 1.2s ease-out 0.4s',
            }}
          >
            A different path
          </p>
        </div>

        {/* Subtle particles/dots that fade in */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-white/20"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: `all 0.5s ease-out ${0.8 + i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
