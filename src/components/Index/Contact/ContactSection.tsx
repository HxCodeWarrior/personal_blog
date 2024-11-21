import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'
import { ContactForm } from '@/components/Index/Contact/ContactForm'
import { ContactInfo } from '@/components/Index/Contact/ContactInfo'
import { ContactBackground } from '@/components/Index/Contact/ContactBackground'

export const ContactSection = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0])

  return (
    <StyledSection>
      {/* 背景效果 */}
      <ContactBackground />
      
      <Container>
        {/* 标题区域 */}
        <HeaderContainer>
          <SubTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            GET IN TOUCH
          </SubTitle>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TitleHighlight>联系</TitleHighlight>
            我们
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            期待与您的交流，让我们一起探讨技术与创新
          </Description>
        </HeaderContainer>

        {/* 内容区域 */}
        <ContentWrapper style={{ opacity, y }}>
          <GridContainer>
            {/* 联系信息 */}
            <InfoWrapper>
              <ContactInfo />
            </InfoWrapper>

            {/* 联系表单 */}
            <FormWrapper>
              <ContactForm />
            </FormWrapper>
          </GridContainer>
        </ContentWrapper>
      </Container>

      {/* 装饰元素 */}
      <DecorativeElements>
        <Circle1 />
        <Circle2 />
        <Line1 />
        <Line2 />
      </DecorativeElements>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  position: relative;
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.background.default};
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  z-index: 1;
`

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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

const ContentWrapper = styled(motion.div)`
  position: relative;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const InfoWrapper = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    right: -2rem;
    width: 1px;
    height: 80%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.primary.main}20,
      transparent
    );
    
    @media (max-width: 1024px) {
      display: none;
    }
  }
`

const FormWrapper = styled.div`
  position: relative;
`

const DecorativeElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.1;
  background: ${({ theme }) => theme.colors.primary.main};
`

const Circle1 = styled(Circle)`
  width: 400px;
  height: 400px;
  top: -10%;
  left: -10%;
`

const Circle2 = styled(Circle)`
  width: 300px;
  height: 300px;
  bottom: -10%;
  right: -10%;
  background: ${({ theme }) => theme.colors.secondary.main};
`

const Line = styled.div`
  position: absolute;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.primary.main}20,
    transparent
  );
`

const Line1 = styled(Line)`
  top: 20%;
  left: 0;
  right: 0;
  height: 1px;
  transform: rotate(-5deg);
`

const Line2 = styled(Line)`
  bottom: 30%;
  left: 0;
  right: 0;
  height: 1px;
  transform: rotate(5deg);
`