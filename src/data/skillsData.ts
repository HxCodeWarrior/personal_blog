import React from 'react';
import { 
  FaReact, 
  FaVuejs, 
  FaNodeJs, 
  FaDocker, 
  FaFigma 
} from 'react-icons/fa';
import { Skill } from '../pages/Skills/types';

export const skillsData: Skill[] = [
  {
    id: '1',
    name: 'React',
    icon: React.createElement(FaReact),
    description: '精通React及其生态系统，包括Redux、React Router等',
    proficiency: 90,
    category: 'frontend',
    tags: ['React', 'Redux', 'Hooks', 'Next.js']
  },
  {
    id: '2',
    name: 'Vue.js',
    icon: React.createElement(FaVuejs),
    description: '熟练使用Vue.js框架进行开发，掌握Vue Router、Vuex等',
    proficiency: 85,
    category: 'frontend',
    tags: ['Vue', 'Vuex', 'Vue Router']
  },
  {
    id: '3',
    name: 'Node.js',
    icon: React.createElement(FaNodeJs),
    description: '后端开发经验，熟悉Express、NestJS等框架',
    proficiency: 80,
    category: 'backend',
    tags: ['Node.js', 'Express', 'NestJS']
  },
  {
    id: '4',
    name: 'Docker',
    icon: React.createElement(FaDocker),
    description: '容器化部署经验，熟悉Docker和Docker Compose',
    proficiency: 75,
    category: 'devops',
    tags: ['Docker', 'CI/CD', 'DevOps']
  },
  {
    id: '5',
    name: 'UI设计',
    icon: React.createElement(FaFigma),
    description: '具备良好的设计感，熟练使用Figma等设计工具',
    proficiency: 70,
    category: 'design',
    tags: ['UI/UX', 'Figma', '响应式设计']
  }
]; 