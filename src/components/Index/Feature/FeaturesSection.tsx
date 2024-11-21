import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'
import { Feature } from '@/data/homeData'
import { FeatureCard } from './FeatureCard'

interface FeaturesSectionProps {
  features: Feature[]
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [100, 0])

  return (
    <StyledSection>
      {/* 背景装饰 */}
      <BackgroundGlow />
      <GridPattern />
      
      {/* 标题区域 */}
      <HeaderContainer>
        <SubTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          CORE FEATURES
        </SubTitle>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TitleHighlight>创新特性</TitleHighlight>
          驱动未来
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          探索前沿技术，打造极致体验，引领技术革新
        </Description>
      </HeaderContainer>

      {/* 特性卡片网格 */}
      <FeaturesContainer style={{ opacity, y }}>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  position: relative;
  padding: 8rem 2rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.default};
`

const BackgroundGlow = styled.div`
  position: absolute;
  inset: 0;
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

const HeaderContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 6rem;
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

const FeaturesContainer = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
` 