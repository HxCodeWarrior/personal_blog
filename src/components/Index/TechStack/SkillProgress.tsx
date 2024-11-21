import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SkillProgressProps {
  level: number;
  color: string;
}

export const SkillProgress = ({ level, color }: SkillProgressProps) => {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0.5, 0.8], [0, level]);

  return (
    <ProgressContainer>
      <ProgressLabel>
        <span>熟练度</span>
        <span>{level}%</span>
      </ProgressLabel>
      <ProgressBar>
        <Progress
          style={{ width: `${width}%`, background: color }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <ProgressGlow style={{ background: color }} />
      </ProgressBar>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  transform: translateZ(25px);
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProgressBar = styled.div`
  position: relative;
  height: 6px;
  background: ${({ theme }) => theme.colors.background.subtle};
  border-radius: 3px;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  border-radius: 3px;
  transform-origin: left;
`;

const ProgressGlow = styled.div`
  position: absolute;
  inset: -50%;
  filter: blur(10px);
  opacity: 0.2;
`; 