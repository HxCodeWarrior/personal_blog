import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'

export const HeroParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const particles = Array.from({ length: 50 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20
    }))

    particles.forEach(particle => {
      controls.start(i => ({
        x: [particle.x + '%', (particle.x + 10) + '%', particle.x + '%'],
        y: [particle.y + '%', (particle.y - 10) + '%', particle.y + '%'],
        transition: {
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "linear"
        }
      }))
    })
  }, [controls])

  return (
    <Container ref={containerRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Particle
          key={i}
          custom={i}
          animate={controls}
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`

const Particle = styled(motion.div)`
  position: absolute;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  pointer-events: none;
` 