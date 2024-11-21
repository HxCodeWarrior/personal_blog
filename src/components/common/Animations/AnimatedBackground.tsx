import styled from 'styled-components';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <Container>
      {[...Array(20)].map((_, i) => (
        <Circle
          key={i}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.colors.primary}10`};
  filter: blur(8px);
`;

export default AnimatedBackground; 