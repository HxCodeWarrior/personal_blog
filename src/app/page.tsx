'use client'

import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { HeroSection } from '@/components/Index/Hero/HeroSection'
import { FeaturesSection } from '@/components/Index/Feature/FeaturesSection'
import { TechStackSection } from '@/components/Index/TechStack/TechStackSection'
import { BlogSection } from '@/components/Index/Blog/BlogSection'
import { ContactSection } from '@/components/Index/Contact/ContactSection'
import { useTheme } from '@/hooks/useTheme'
import { features, blogPosts, techStack } from '@/data/homeData'
import { FloatingParticles } from '@/components/Background/FloatingParticles'
import { GlassBackground } from '@/components/Background/GlassBackground'
import { GridBackground } from '@/components/Background/GridBackground'

interface SectionProps {
  $fullHeight?: boolean;
  $spacing?: 'normal' | 'large';
  $isFirst?: boolean;
  $isLast?: boolean;
}

// 更新 Section 组件的样式定义
const Section = styled(motion.section)<SectionProps>`
  position: relative;
  min-height: ${props => props.$fullHeight ? '100vh' : 'auto'};
  padding: ${props => props.$fullHeight ? '0' : props.$spacing === 'large' ? '6rem 0' : '4rem 0'};
  width: 100%;
  
  // 添加高级渐变过渡效果
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: ${props => props.$isFirst || props.$isLast ? '180px' : '120px'};
    z-index: 1;
    pointer-events: none;
    opacity: ${props => props.$isFirst || props.$isLast ? '1' : '0.9'};
    transition: all 0.4s ease;
  }

  &::before {
    top: ${props => props.$isFirst ? '0' : '-60px'};
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.background.default},
      ${({ theme }) => `${theme.colors.background.default}00`}
    );
  }

  &::after {
    bottom: ${props => props.$isLast ? '0' : '-60px'};
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.colors.background.default},
      ${({ theme }) => `${theme.colors.background.default}00`}
    );
  }

  // 优化板块衔接
  & + & {
    margin-top: -80px; // 增加重叠程度
  }

  // 添加视差效果
  transform-style: preserve-3d;
  perspective: 1200px;

  @media (max-width: 768px) {
    padding: ${props => props.$fullHeight ? '0' : '3rem 0'};
    & + & {
      margin-top: -40px;
    }
  }
`

// 添加类型定义
type SectionConfig = {
  Component: React.ComponentType<any>;
  props: any;
  variant: 'primary' | 'secondary' | 'neutral';
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentTheme } = useTheme()

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // 优化页面加载动画
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 优化滚动动画
  const scrollProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // 定义类型安全的sections配置
  const sections: SectionConfig[] = [
    { 
      Component: FeaturesSection, 
      props: { features }, 
      variant: 'primary' as const
    },
    { 
      Component: TechStackSection, 
      props: { techStack }, 
      variant: 'secondary' as const
    },
    { 
      Component: BlogSection, 
      props: { posts: blogPosts }, 
      variant: 'neutral' as const
    },
    { 
      Component: ContactSection, 
      props: {}, 
      variant: 'primary' as const
    }
  ]

  return (
    <AnimatePresence mode="wait">
      {isLoaded && (
        <ParallaxProvider>
          <Container ref={containerRef}>
            {/* 添加滚动进度指示器 */}
            <ScrollProgressBar
              style={{ scaleX: scrollProgress }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />

            {/* 优化背景层动画 */}
            <BackgroundLayer
              style={{ 
                y: backgroundY,
                scale: backgroundScale
              }}
            >
              <Parallax speed={-8}>
                <GridBackground />
              </Parallax>
              <FloatingParticles />
            </BackgroundLayer>
            
            {/* 内容层 */}
            <ContentLayer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Section 
                $fullHeight 
                $isFirst
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <HeroSection 
                  headerOpacity={headerOpacity} 
                  headerScale={headerScale} 
                />
              </Section>

              {sections.map((section, index) => (
                <Section
                  key={index}
                  $spacing={index % 2 === 0 ? "large" : "normal"}
                  $isLast={index === sections.length - 1}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }
                  }}
                  viewport={{ 
                    once: true, 
                    margin: "-20%" 
                  }}
                >
                  <GlassBackground 
                    variant={section.variant}
                    intensity={index === 0 ? "strong" : "medium"}
                    animated
                    style={{
                      transform: `scale(${index === 0 ? 1.08 : 1.04})`,
                      transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)'
                    }}
                  />
                  <section.Component {...section.props} />
                </Section>
              ))}
            </ContentLayer>
          </Container>
        </ParallaxProvider>
      )}
    </AnimatePresence>
  )
}

// 优化容器样式
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  background: ${({ theme }) => theme.colors.background.default};
  overflow-x: hidden;
  
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
  
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.main}30;
    border-radius: 3px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main}60;
    }
  }
`

const ScrollProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary.main};
  transform-origin: 0%;
  z-index: 1000;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary.main}40;
`

const BackgroundLayer = styled(motion.div)`
  position: fixed;
  inset: -5%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  will-change: transform;
`

const ContentLayer = styled(motion.main)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(1920px, 94%);
  margin: 0 auto;
  
  display: flex;
  flex-direction: column;
  gap: 0;

  // 优化响应式布局
  @media (min-width: 1024px) {
    max-width: min(1920px, 92%);
  }

  @media (min-width: 1440px) {
    max-width: min(1920px, 88%);
    padding: 0 2rem;
  }
`

export default HomePage
