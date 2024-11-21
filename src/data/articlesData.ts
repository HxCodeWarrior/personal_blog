import { Article } from '@/types/article';

export const articlesData: Article[] = [
  {
    id: '1',
    title: '深入理解 React 18 新特性',
    author: 'John Doe',
    summary: 'React 18 带来了许多激动人心的新特性，包括自动批处理、并发渲染、Suspense 服务端渲染支持等。本文将深入探讨这些特性的实际应用场景和最佳实践。',
    tags: [
      { name: 'React', type: 'framework' },
      { name: 'Frontend', type: 'category' },
      { name: 'Performance', type: 'topic' }
    ],
    createdAt: '2024-03-15T08:00:00.000Z',
    slug: 'understanding-react-18-features',
    readTime: 8
  },
  {
    id: '2',
    title: 'Next.js 14 应用开发实战',
    author: 'Jane Smith',
    summary: '本文将介绍如何使用 Next.js 14 构建现代化的全栈应用。我们将探讨 App Router、Server Components、数据获取策略等核心概念，并通过实际案例展示其优势。',
    tags: [
      { name: 'Next.js', type: 'framework' },
      { name: 'TypeScript', type: 'language' },
      { name: 'Full Stack', type: 'category' }
    ],
    createdAt: '2024-03-14T10:30:00.000Z',
    slug: 'nextjs-14-practical-guide',
    readTime: 12
  },
  {
    id: '3',
    title: '现代化 CSS 开发技巧',
    author: 'Mike Johnson',
    summary: '探索现代 CSS 开发中的各种新特性和最佳实践，包括 CSS Grid、Flexbox、CSS 变量、CSS 模块等。通过实例讲解如何构建灵活且可维护的样式系统。',
    tags: [
      { name: 'CSS', type: 'language' },
      { name: 'Frontend', type: 'category' },
      { name: 'Design', type: 'topic' }
    ],
    createdAt: '2024-03-13T15:45:00.000Z',
    slug: 'modern-css-development',
    readTime: 6
  },
  {
    id: '4',
    title: 'TypeScript 高级类型编程',
    author: 'Sarah Chen',
    summary: '深入探讨 TypeScript 中的高级类型系统，包括条件类型、映射类型、类型推断等。通过实际示例展示如何利用类型系统提升代码质量和开发效率。',
    tags: [
      { name: 'TypeScript', type: 'language' },
      { name: 'Programming', type: 'category' },
      { name: 'Advanced', type: 'level' }
    ],
    createdAt: '2024-03-12T09:20:00.000Z',
    slug: 'advanced-typescript-types',
    readTime: 10
  },
  {
    id: '5',
    title: 'Web 性能优化实践指南',
    author: 'Alex Turner',
    summary: '全面介绍 Web 应用性能优化的各个方面，包括加载性能、运行时性能、渲染性能等。提供实用的优化技巧和工具推荐。',
    tags: [
      { name: 'Performance', type: 'topic' },
      { name: 'Web', type: 'platform' },
      { name: 'Optimization', type: 'category' }
    ],
    createdAt: '2024-03-11T14:15:00.000Z',
    slug: 'web-performance-optimization',
    readTime: 15
  }
];

export const getArticles = async (page: number, pageSize: number = 10) => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedArticles = articlesData.slice(start, end);

  return {
    articles: paginatedArticles,
    total: articlesData.length,
    page,
    pageSize
  };
};

export const getArticleBySlug = async (slug: string) => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  return articlesData.find(article => article.slug === slug);
}; 