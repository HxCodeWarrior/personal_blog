import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ContactBackground = () => {
  return (
    <Container>
      <GridPattern />
      <GlowEffect />
      <Particles>
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Particles>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    ${({ theme }) => `${theme.colors.primary.main}08`} 1px,
    transparent 1px
  ),
  linear-gradient(
    to right,
    ${({ theme }) => `${theme.colors.primary.main}08`} 1px,
    transparent 1px
  );
  background-size: 50px 50px;
  mask-image: radial-gradient(
    circle at 50% 50%,
    black 0%,
    transparent 60%
  );
`

const GlowEffect = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    ${({ theme }) => `${theme.colors.primary.main}15`} 0%,
    transparent 50%
  );
`

const Particles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  left: ${() => Math.random() * 100}%;
  top: ${() => Math.random() * 100}%;
` 