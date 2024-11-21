import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import styled from 'styled-components'
import { Feature } from '@/data/homeData'
import { FeatureTag } from './FeatureTag'
import { useEffect, useRef } from 'react'

interface FeatureCardProps {
  feature: Feature
  index: number
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const Icon = feature.icon
  const cardRef = useRef<HTMLDivElement>(null)
  
  // 鼠标位置状态
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 创建平滑的弹簧动画效果
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 20
  })

  // 光晕效果的位置
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), {
    stiffness: 200,
    damping: 25
  })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), {
    stiffness: 200,
    damping: 25
  })

  useEffect(() => {
    if (!cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // 计算鼠标相对于卡片中心的位置（-0.5 到 0.5 之间）
      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height
      
      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    cardRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (cardRef.current) {
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
        <IconContainer>
          <IconGlow
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <IconWrapper
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon size={24} />
          </IconWrapper>
        </IconContainer>

        {/* 文本内容 */}
        <Title>{feature.title}</Title>
        <Description>{feature.description}</Description>

        {/* 标签区域 */}
        {feature.tags && (
          <TagsContainer>
            {feature.tags.map((tag, idx) => (
              <FeatureTag 
                key={tag} 
                label={tag}
                delay={index * 0.1 + idx * 0.05}
              />
            ))}
          </TagsContainer>
        )}

        {/* 动态光效 */}
        <GlowEffect style={{ x: glowX, y: glowY }} />
        
        {/* 边框光效 */}
        <BorderGlow />
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
  transform-style: preserve-3d;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      ${({ theme }) => `${theme.colors.primary.main}10`} 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: translateZ(50px);
  transform-style: preserve-3d;
`

const IconContainer = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 1rem;
  transform: translateZ(30px);
`

const IconGlow = styled(motion.div)`
  position: absolute;
  inset: -50%;
  background: ${({ theme }) => theme.colors.primary.main};
  filter: blur(20px);
  opacity: 0.3;
  border-radius: 50%;
`

const IconWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) => `${theme.colors.primary.main}20`};
  border-radius: 1rem;
  backdrop-filter: blur(4px);
  transform-style: preserve-3d;
  
  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.primary.main}40,
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  transform: translateZ(20px);
`

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  flex-grow: 1;
  transform: translateZ(15px);
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  transform: translateZ(25px);
`

const GlowEffect = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    ${({ theme }) => `${theme.colors.primary.main}30`} 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;

  ${Card}:hover & {
    opacity: 1;
  }
`

const BorderGlow = styled.div`
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    45deg,
    ${({ theme }) => `${theme.colors.primary.main}40`} 0%,
    transparent 40%,
    transparent 60%,
    ${({ theme }) => `${theme.colors.primary.main}40`} 100%
  );
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -2;

  ${Card}:hover & {
    opacity: 1;
  }
` 