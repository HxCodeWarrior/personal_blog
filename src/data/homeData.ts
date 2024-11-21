import React from 'react'
import { IconType } from 'react-icons'
import { 
  FiGithub, FiTwitter, FiLinkedin, FiMail, 
  FiCode, FiLayers, FiCpu, FiDatabase, 
  FiCloud, FiServer 
} from 'react-icons/fi'
import { 
  SiReact, SiTypescript, SiNextdotjs, 
  SiNodedotjs, SiDocker, SiGraphql,
  SiTailwindcss, SiPrisma, SiMongodb
} from 'react-icons/si'

// Feature 接口及数据
export interface Feature {
  icon: IconType
  title: string
  description: string
  tags?: string[]
  link?: string
}

export const features: Feature[] = [
  {
    icon: FiCode,
    title: "现代化开发",
    description: "采用最新的Web技术栈，包括React 18、Next.js 13和TypeScript，确保高性能和类型安全。",
    tags: ["React 18", "Next.js 13", "TypeScript"]
  },
  {
    icon: FiLayers,
    title: "响应式设计",
    description: "完全响应式的界面设计，在任何设备上都能提供出色的用户体验。",
    tags: ["Responsive", "Mobile First", "Adaptive"]
  },
  {
    icon: FiCpu,
    title: "性能优化",
    description: "采用最佳实践进行性能优化，包括代码分割、图片优化和缓存策略。",
    tags: ["Code Splitting", "Lazy Loading", "Caching"]
  },
  {
    icon: FiDatabase,
    title: "数据管理",
    description: "使用现代数据管理解决方案，支持实时更新和离线功能。",
    tags: ["GraphQL", "Redux", "React Query"]
  },
  {
    icon: FiCloud,
    title: "云原生",
    description: "基于云原生架构，支持容器化部署和自动扩展。",
    tags: ["Docker", "Kubernetes", "AWS"]
  },
  {
    icon: FiServer,
    title: "API集成",
    description: "提供强大的API集成能力，支持多种数据源和服务。",
    tags: ["REST", "GraphQL", "WebSocket"]
  }
]

// Tech Stack 接口及数据
export interface TechItem {
  name: string
  icon: IconType
  description: string
  level: number
  category: string
  color: string
  link?: string
}

export const techStack: TechItem[] = [
  {
    name: "React",
    icon: SiReact,
    description: "用于构建用户界面的 JavaScript 库",
    level: 90,
    category: "前端框架",
    color: "#61DAFB"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    description: "JavaScript 的超集，添加了类型系统",
    level: 85,
    category: "编程语言",
    color: "#3178C6"
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    description: "React 框架，用于生产环境的完整解决方案",
    level: 80,
    category: "前端框架",
    color: "#000000"
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    description: "基于 Chrome V8 引擎的 JavaScript 运行时",
    level: 75,
    category: "后端技术",
    color: "#339933"
  },
  {
    name: "Docker",
    icon: SiDocker,
    description: "开发、部署和运行应用程序的开放平台",
    level: 70,
    category: "开发工具",
    color: "#2496ED"
  },
  {
    name: "GraphQL",
    icon: SiGraphql,
    description: "API 查询语言和运行时",
    level: 75,
    category: "API技术",
    color: "#E10098"
  }
]

// Blog Post 接口及数据
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
  imageUrl: string
  date: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "探索人工智能的未来发展",
    excerpt: "深入解析AI技术的最新突破与未来趋势，探讨机器学习如何改变我们的生活方式。",
    category: "AI",
    readTime: "8 min",
    imageUrl: "/images/blog/ai-future.jpg",
    date: "2024-03-20",
    author: {
      name: "Alex Johnson",
      avatar: "/images/avatars/alex.jpg"
    },
    tags: ["AI", "Machine Learning", "Future Tech"]
  },
  {
    id: 2,
    title: "Web3.0与去中心化应用",
    excerpt: "区块链技术如何重塑互联网未来，带来全新的用户体验与商业模式。",
    category: "Blockchain",
    readTime: "6 min",
    imageUrl: "/images/blog/web3.jpg",
    date: "2024-03-18",
    author: {
      name: "Sarah Chen",
      avatar: "/images/avatars/sarah.jpg"
    },
    tags: ["Web3", "Blockchain", "DApp"]
  },
  {
    id: 3,
    title: "现代前端开发趋势解析",
    excerpt: "从框架选择到性能优化，全方位解读前端开发的最新技术栈。",
    category: "Frontend",
    readTime: "10 min",
    imageUrl: "/images/blog/frontend.jpg",
    date: "2024-03-15",
    author: {
      name: "Mike Zhang",
      avatar: "/images/avatars/mike.jpg"
    },
    tags: ["Frontend", "React", "Performance"]
  }
]

// Contact 接口及数据
export interface ContactInfo {
  type: string
  icon: IconType
  value: string
  link?: string
}

export const contactInfo: ContactInfo[] = [
  {
    type: "Email",
    icon: FiMail,
    value: "contact@example.com",
    link: "mailto:contact@example.com"
  },
  {
    type: "GitHub",
    icon: FiGithub,
    value: "github.com/yourusername",
    link: "https://github.com/yourusername"
  },
  {
    type: "Twitter",
    icon: FiTwitter,
    value: "@yourusername",
    link: "https://twitter.com/yourusername"
  },
  {
    type: "LinkedIn",
    icon: FiLinkedin,
    value: "linkedin.com/in/yourusername",
    link: "https://linkedin.com/in/yourusername"
  }
]
