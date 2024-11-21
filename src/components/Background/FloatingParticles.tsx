import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.2
    });

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (particle: Particle) => {
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    };

    const updateParticle = (particle: Particle) => {
      particle.y -= particle.speed;
      particle.opacity = Math.sin(Date.now() * 0.001 * particle.speed) * 0.3 + 0.3;

      if (particle.y < -10) {
        particle.y = canvas.height + 10;
        particle.x = Math.random() * canvas.width;
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.15;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      connectParticles();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <ParticleCanvas
      ref={canvasRef}
      style={{ y: parallaxY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

const ParticleCanvas = styled(motion.canvas)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
`; 