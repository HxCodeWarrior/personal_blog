'use client'

import styled from 'styled-components'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { HeroCanvas } from './HeroCanvas'
import { HeroParticles } from './HeroParticles'
import { useRef, useEffect } from 'react'

interface HeroSectionProps {
  headerOpacity: MotionValue<number>
  headerScale: MotionValue<number>
}

export const HeroSection = ({ headerOpacity, headerScale }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <Container ref={containerRef}>
      {/* 背景效果 */}
      <BackgroundContainer style={{ y }}>
        <HeroCanvas />
        <HeroParticles />
        <GradientOverlay />
      </BackgroundContainer>

      {/* 主要内容 */}
      <Content style={{ y: textY, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SubTitle>Welcome to</SubTitle>
        </motion.div>

        <TitleContainer>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GradientText>LineWurm</GradientText>
            <br />
            Creative Blog
          </Title>
        </TitleContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Description>
            探索技术与创意的无限可能，分享前沿开发经验与见解
          </Description>
        </motion.div>

        <ButtonGroup>
          <PrimaryButton
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            开始探索
            <ButtonGlow />
          </PrimaryButton>
          
          <SecondaryButton
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            了解更多
          </SecondaryButton>
        </ButtonGroup>

        <ScrollIndicator
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <ScrollDot
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          向下滚动探索更多
        </ScrollIndicator>
      </Content>

      {/* 装饰元素 */}
      <FloatingShapes>
        <Shape1 />
        <Shape2 />
        <Shape3 />
      </FloatingShapes>
    </Container>
  )
}

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.default};
`

const BackgroundContainer = styled(motion.div)`
  position: absolute;
  inset: -20%;
  z-index: 0;
`

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    ${({ theme }) => theme.colors.background.default} 70%
  );
  z-index: 1;
`

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1000px;
  padding: 2rem;
`

const SubTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
`

const TitleContainer = styled.div`
  margin-bottom: 2rem;
  line-height: 1.2;
`

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
`

const GradientText = styled.span`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary.main}, 
    ${({ theme }) => theme.colors.secondary.main}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
`

const BaseButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 9999px;
  cursor: pointer;
  transition: transform 0.2s ease;
`

const PrimaryButton = styled(BaseButton)`
  position: relative;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border: none;
  overflow: hidden;
`

const ButtonGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;

  ${PrimaryButton}:hover & {
    transform: translateX(100%);
  }
`

const SecondaryButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary.main}40;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main}10;
  }
`

const ScrollIndicator = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`

const ScrollDot = styled(motion.div)`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
`

const FloatingShapes = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.5;
  animation: float 20s infinite;

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(20px, -20px);
    }
  }
`

const Shape1 = styled(Shape)`
  top: 10%;
  left: 10%;
  width: 300px;
  height: 300px;
  background: ${({ theme }) => theme.colors.primary.main}20;
  animation-delay: -5s;
`

const Shape2 = styled(Shape)`
  top: 60%;
  right: 10%;
  width: 250px;
  height: 250px;
  background: ${({ theme }) => theme.colors.secondary.main}20;
  animation-delay: -10s;
`

const Shape3 = styled(Shape)`
  bottom: 10%;
  left: 30%;
  width: 200px;
  height: 200px;
  background: ${({ theme }) => theme.colors.primary.main}15;
  animation-delay: -15s;
`

export default HeroSection