import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import styled from 'styled-components'
import { TechItem } from '@/data/homeData'
import { useRef, useEffect } from 'react'
import { SkillProgress } from './SkillProgress'

interface TechCardProps {
  tech: TechItem
  index: number
}

export const TechCard = ({ tech, index }: TechCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = tech.icon
  
  // 鼠标位置状态
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D 倾斜效果
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]))

  // 光晕效果
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']))
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']))

  useEffect(() => {
    if (!cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    cardRef.current.addEventListener('mousemove', handleMouseMove)
    cardRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove)
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mouseX, mouseY])

  return (
    <Card
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <CardContent>
        {/* 图标区域 */}
        <IconContainer style={{ color: tech.color }}>
          <IconGlow style={{ background: tech.color }} />
          <IconWrapper>
            <Icon size={40} />
          </IconWrapper>
        </IconContainer>

        {/* 内容区域 */}
        <TechInfo>
          <TechName>{tech.name}</TechName>
          <TechDescription>{tech.description}</TechDescription>
        </TechInfo>

        {/* 技能进度条 */}
        <SkillProgress level={tech.level} color={tech.color} />

        {/* 动态光效 */}
        <GlowEffect 
          style={{ 
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${tech.color}30 0%, transparent 70%)` 
          }} 
        />
      </CardContent>
    </Card>
  )
}

const Card = styled(motion.div)`
  position: relative;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1.5rem;
  overflow: hidden;
  isolation: isolate;
  perspective: 1000px;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`

const CardContent = styled.div`
  position: absolute;
  inset: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: translateZ(50px);
  transform-style: preserve-3d;
`

const IconContainer = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
  transform: translateZ(30px);
`

const IconGlow = styled(motion.div)`
  position: absolute;
  inset: -50%;
  filter: blur(20px);
  opacity: 0.3;
  border-radius: 50%;
`

const IconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.subtle};
  border-radius: 1rem;
  backdrop-filter: blur(4px);
`

const TechInfo = styled.div`
  transform: translateZ(20px);
`

const TechName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`

const TechDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const GlowEffect = styled(motion.div)`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${Card}:hover & {
    opacity: 1;
  }
` 