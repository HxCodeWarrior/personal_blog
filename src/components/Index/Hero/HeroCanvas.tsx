'use client'

import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

export const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 100
    let mousePosition = { x: 0, y: 0 }

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0.5;
      
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        if (!canvas) return

        // 添加鼠标交互
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          this.speedX -= (dx / distance) * force * 0.2
          this.speedY -= (dy / distance) * force * 0.2
        }

        this.x += this.speedX
        this.y += this.speedY

        // 边界检查
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // 限制速度
        const maxSpeed = 2
        const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
        if (currentSpeed > maxSpeed) {
          this.speedX = (this.speedX / currentSpeed) * maxSpeed
          this.speedY = (this.speedY / currentSpeed) * maxSpeed
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${currentTheme.colors.primary.main}, ${this.opacity})`
        ctx.fill()
      }
    }

    // 设置canvas尺寸
    const setCanvasSize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // 连接临近粒子
    const connectParticles = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.5
            ctx.strokeStyle = `rgba(${currentTheme.colors.primary.main}, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // 初始化粒子
    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // 动画循环
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      connectParticles(ctx)
      animationFrameId = requestAnimationFrame(animate)
    }

    // 鼠标移动事件处理
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX
      mousePosition.y = e.clientY
    }

    // 初始化
    setCanvasSize()
    initParticles()
    animate()

    // 事件监听
    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [currentTheme])

  return <StyledCanvas ref={canvasRef} />
}

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
` 