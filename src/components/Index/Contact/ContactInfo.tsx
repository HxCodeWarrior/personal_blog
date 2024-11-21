import { motion } from 'framer-motion'
import styled from 'styled-components'
import { FiMail, FiMapPin, FiPhone, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

export const ContactInfo = () => {
  return (
    <InfoContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <InfoHeader>
        <Title>联系方式</Title>
        <Subtitle>随时欢迎与我们联系</Subtitle>
      </InfoHeader>
      
      <InfoList>
        <InfoItem
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconWrapper>
            <IconBackground 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Icon>
              <FiMail />
            </Icon>
          </IconWrapper>
          <InfoContent>
            <Label>电子邮件</Label>
            <Text>contact@example.com</Text>
          </InfoContent>
          <HoverIndicator />
        </InfoItem>

        <InfoItem
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconWrapper>
            <IconBackground 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            <Icon>
              <FiPhone />
            </Icon>
          </IconWrapper>
          <InfoContent>
            <Label>联系电话</Label>
            <Text>+86 123 4567 8900</Text>
          </InfoContent>
          <HoverIndicator />
        </InfoItem>

        <InfoItem
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconWrapper>
            <IconBackground 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />
            <Icon>
              <FiMapPin />
            </Icon>
          </IconWrapper>
          <InfoContent>
            <Label>办公地址</Label>
            <Text>湖北省武汉市区某某路123号</Text>
          </InfoContent>
          <HoverIndicator />
        </InfoItem>
      </InfoList>
      
      <Divider />
      
      <SocialSection>
        <SocialTitle>关注我们</SocialTitle>
        <SocialLinks>
          {[
            { icon: FiGithub, link: "#", delay: 0 },
            { icon: FiTwitter, link: "#", delay: 0.1 },
            { icon: FiLinkedin, link: "#", delay: 0.2 }
          ].map((social, index) => (
            <SocialLink
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: social.delay
              }}
              whileHover={{
                scale: 1.1,
                rotate: 10,
                backgroundColor: "var(--hover-bg)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon />
              <SocialLinkGlow />
            </SocialLink>
          ))}
        </SocialLinks>
      </SocialSection>
    </InfoContainer>
  )
}

const InfoContainer = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => `${theme.colors.primary.main}10`} 0%,
      transparent 100%
    );
    z-index: 0;
  }
`

const InfoHeader = styled.div`
  position: relative;
  z-index: 1;
`

const Title = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.75rem;
  
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text.primary},
    ${({ theme }) => theme.colors.primary.main}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.background.subtle};
  position: relative;
  overflow: hidden;
  cursor: pointer;
`

const IconWrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`

const IconBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 12px;
  filter: blur(8px);
`

const Icon = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 1.25rem;
  z-index: 1;
  
  ${InfoItem}:hover & {
    color: ${({ theme }) => theme.colors.primary.contrast};
  }
`

const InfoContent = styled.div`
  flex: 1;
`

const Label = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.35rem;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 1.1rem;
`

const HoverIndicator = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.primary.main};
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  
  ${InfoItem}:hover & {
    opacity: 0.1;
  }
`

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.border},
    transparent
  );
  margin: 0.5rem 0;
  position: relative;
  z-index: 1;
`

const SocialSection = styled.div`
  margin-top: auto;
  position: relative;
  z-index: 1;
`

const SocialTitle = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.25rem;
  text-align: center;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const SocialLink = styled(motion.a)`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;
  position: relative;
  overflow: hidden;
  
  --hover-bg: ${({ theme }) => theme.colors.primary.main};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.background.subtle};
    z-index: 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.contrast};
    
    &::before {
      background: var(--hover-bg);
    }
  }
  
  svg {
    position: relative;
    z-index: 1;
  }
`

const SocialLinkGlow = styled.div`
  position: absolute;
  inset: -50%;
  background: ${({ theme }) => theme.colors.primary.main};
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${SocialLink}:hover & {
    opacity: 0.3;
  }
` 