import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'
import { TechItem } from '@/data/homeData'
import { TechCard } from './TechCard'
import { CategoryFilter } from './CategoryFilter'
import { useState } from 'react'

interface TechStackSectionProps {
  techStack: TechItem[]
}

export const TechStackSection = ({ techStack }: TechStackSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const { scrollYProgress } = useScroll()
  
  // 背景视差效果
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])

  // 获取所有分类
  const categories = ['全部', ...new Set(techStack.map(tech => tech.category))]
  
  // 过滤技术栈
  const filteredTechStack = techStack.filter(tech => 
    selectedCategory === '全部' ? true : tech.category === selectedCategory
  )

  return (
    <StyledSection>
      {/* 背景装饰 */}
      <BackgroundGlow style={{ y: bgY }} />
      <GridPattern />
      <FloatingCircles />
      
      {/* 内容区域 */}
      <ContentWrapper>
        {/* 标题区域 */}
        <HeaderContainer>
          <SubTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            TECH STACK
          </SubTitle>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TitleHighlight>技术</TitleHighlight>
            栈
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            精选现代化技术栈，构建高性能应用
          </Description>
        </HeaderContainer>

        {/* 分类过滤器 */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* 技术栈网格 */}
        <TechGrid style={{ opacity }}>
          {filteredTechStack.map((tech, index) => (
            <TechCard 
              key={tech.name}
              tech={tech}
              index={index}
            />
          ))}
        </TechGrid>
      </ContentWrapper>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  position: relative;
  padding: 8rem 2rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.default};
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const BackgroundGlow = styled(motion.div)`
  position: absolute;
  inset: -50%;
  background: radial-gradient(
    circle at 50% 50%,
    ${({ theme }) => `${theme.colors.primary.main}15`} 0%,
    transparent 70%
  );
  opacity: 0.5;
  z-index: 0;
`

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    ${({ theme }) => `${theme.colors.primary.main}10`} 1px,
    transparent 1px
  ),
  linear-gradient(
    to right,
    ${({ theme }) => `${theme.colors.primary.main}10`} 1px,
    transparent 1px
  );
  background-size: 50px 50px;
  mask-image: radial-gradient(
    circle at 50% 50%,
    black 0%,
    transparent 70%
  );
  z-index: 0;
`

const FloatingCircles = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 40vmax;
    height: 40vmax;
    border-radius: 50%;
    background: ${({ theme }) => `${theme.colors.primary.main}10`};
    animation: float 20s linear infinite;
  }
  
  &::before {
    top: -20%;
    left: -10%;
    animation-delay: -5s;
  }
  
  &::after {
    bottom: -20%;
    right: -10%;
    animation-delay: -15s;
  }
  
  @keyframes float {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform: translate(2%, 2%) rotate(360deg);
    }
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const SubTitle = styled(motion.span)`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) => `${theme.colors.primary.main}15`};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
`

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(180deg, 
    ${({ theme }) => theme.colors.text.primary} 0%,
    ${({ theme }) => theme.colors.text.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const TitleHighlight = styled.span`
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary.main};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.primary.main};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.2em;
    background: ${({ theme }) => `${theme.colors.primary.main}30`};
    border-radius: 0.1em;
  }
`

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`

const TechGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
` 