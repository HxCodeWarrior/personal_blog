import styled from 'styled-components';
import { motion } from 'framer-motion';

interface FeatureTagProps {
  label: string;
  delay?: number;
}

export const FeatureTag = ({ label, delay = 0 }: FeatureTagProps) => {
  return (
    <TagContainer
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
    >
      {label}
      <TagGlow />
    </TagContainer>
  );
};

const TagContainer = styled(motion.span)`
  position: relative;
  display: inline-flex;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) => `${theme.colors.primary.main}15`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary.main}30`};
  backdrop-filter: blur(4px);
  overflow: hidden;
`;

const TagGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    ${({ theme }) => `${theme.colors.primary.main}30`} 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${TagContainer}:hover & {
    opacity: 1;
  }
`; 