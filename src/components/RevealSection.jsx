import { useScrollReveal } from '../hooks/useScrollReveal'

export function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function RevealText({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </span>
  )
}

export function RevealParagraph({ children, className = '', stagger = 100 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <p
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {children}
    </p>
  )
}
