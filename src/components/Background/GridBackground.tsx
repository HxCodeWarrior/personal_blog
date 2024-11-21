import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

export const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = (timestamp: number) => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 30;
      const dotSize = 1;
      const scrollOffset = (timestamp / 1000) % gridSize;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';

      for (let x = -gridSize + scrollOffset; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -gridSize + scrollOffset; y < canvas.height + gridSize; y += gridSize) {
          const opacity = Math.sin(x * 0.01 + y * 0.01 + timestamp * 0.001) * 0.5 + 0.5;
          ctx.globalAlpha = opacity * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(drawGrid);
    };

    resizeCanvas();
    requestAnimationFrame(drawGrid);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <GridCanvas
      ref={canvasRef}
      style={{ y: parallaxY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

const GridCanvas = styled(motion.canvas)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.4;
`; 