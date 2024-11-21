import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建标签
  const tags = [
    { type: 'technology', name: '技术', color: '#2196F3' },
    { type: 'design', name: '设计', color: '#9C27B0' },
    { type: 'lifestyle', name: '生活方式', color: '#4CAF50' },
    { type: 'travel', name: '旅行', color: '#FF9800' },
    { type: 'food', name: '美食', color: '#F44336' },
    { type: 'health', name: '健康', color: '#00BCD4' },
    { type: 'business', name: '商业', color: '#795548' },
    { type: 'science', name: '科学', color: '#607D8B' },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { type: tag.type },
      update: { color: tag.color },
      create: tag,
    });
  }

  // 创建示例文章
  const articles = [
    {
      title: '开始使用 Next.js 13',
      slug: 'getting-started-with-nextjs-13',
      summary: '探索 Next.js 13 的新特性和最佳实践',
      content: '# Next.js 13 简介\n\nNext.js 13 带来了许多激动人心的新特性...',
      author: 'John Doe',
      readTime: 5,
      status: 'PUBLISHED',
      views: 0,
      likes: 0,
      tags: {
        connect: [
          { type: 'technology' },
          { type: 'design' }
        ]
      }
    },
    {
      title: '现代 Web 开发趋势',
      slug: 'modern-web-development-trends',
      summary: '探讨 2024 年 Web 开发的主要趋势和技术栈',
      content: '# Web 开发趋势\n\n随着技术的不断发展...',
      author: 'Jane Smith',
      readTime: 8,
      status: 'PUBLISHED',
      views: 0,
      likes: 0,
      tags: {
        connect: [
          { type: 'technology' },
          { type: 'business' }
        ]
      }
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 