'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import Card from '@/components/cards/base/Card';
import ArticleLabel from '@/components/common/Labels/ArticleLabel';
import styles from '@/Articles/Articles.module.scss';
import { EditOutlined, EyeOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import StyledPagination from '@/components/common/Pagination/StyledPagination';
import StyledButton from '@/components/common/Button/StyledButton';

interface Article {
  id: string;
  title: string;
  author: string;
  summary: string;
  tags: Array<{
    name: string;
    type: string;
  }>;
  createdAt: string;
  slug: string;
  readTime?: number; // 预计阅读时间（分钟）
}

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [pageReady, setPageReady] = useState(false);

  const pageVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.645, 0.045, 0.355, 1], // 使用cubic-bezier缓动
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.610, 0.355, 1.000], // 优化的缓动函数
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    const preparePageData = async () => {
      setPageReady(false);
      await fetchArticles(page);
      // 添加小延迟确保DOM更新完成
      setTimeout(() => setPageReady(true), 100);
    };

    preparePageData();
  }, [page]);

  const fetchArticles = async (pageNum: number) => {
    try {
      setLoading(true);
      // TODO: 替换为实际的 API 调用
      const response = await fetch(`/api/articles?page=${pageNum}`);
      const data = await response.json();
      setArticles(data.articles);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  const handleViewArticle = (slug: string) => {
    router.push(`/articles/${slug}`);
  };

  const handleEditArticle = useCallback((slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 使用 requestAnimationFrame 确保在下一帧进行导航
    requestAnimationFrame(() => {
      router.push(`/articles/edit/${slug}`);
    });
  }, [router]);

  return (
    <motion.div 
      className={styles.articlesContainer}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={styles.header}
        variants={{
          initial: { opacity: 0, y: -20 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2
            }
          }
        }}
      >
        <h1 className={styles.pageTitle}>
          <span className={styles.titleHighlight}>博客</span>文章
        </h1>
        <StyledButton 
          buttonType="primary"
          buttonVariant="create"
          onClick={() => router.push('/pages/Articles/create')}
          size="large"
        >
          创建文章
        </StyledButton>
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {pageReady && (
          <motion.div
            key={`articles-list-${page}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.articlesList}
          >
            {loading ? (
              <motion.div 
                className={styles.skeletonContainer}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {Array(6).fill(null).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut"
                        }
                      }
                    }}
                  >
                    <Card
                      variant="glass"
                      loading
                      hover={false}
                      fullHeight
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              articles.map(article => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  layout
                  layoutId={article.id}
                  className={styles.articleWrapper}
                >
                  <Card
                    variant="glass"
                    hover
                    fullHeight
                    clickable
                    onClick={() => handleViewArticle(article.slug)}
                  >
                    <Card.Header
                      title={article.title}
                      subtitle={
                        <span className={styles.articleMeta}>
                          <span className={styles.metaItem}>
                            <UserOutlined /> {article.author}
                          </span>
                          <span className={styles.metaItem}>
                            <ClockCircleOutlined /> {article.readTime || 5} 分钟阅读
                          </span>
                        </span>
                      }
                      action={
                        <Tooltip title="编辑文章">
                          <span
                            onClick={(e) => handleEditArticle(article.slug, e)}
                            onMouseDown={(e) => e.stopPropagation()}
                            role="button"
                            tabIndex={0}
                            className={styles.editButton}
                          >
                            <StyledButton
                              buttonType="text"
                              buttonVariant="edit"
                              icon={<EditOutlined />}
                            />
                          </span>
                        </Tooltip>
                      }
                    />
                    <Card.Body>
                      <p className={styles.summary}>{article.summary}</p>
                      <div className={styles.tags}>
                        {article.tags.map(tag => {
                          const validTypes = ['technology', 'design', 'lifestyle', 'travel', 'food', 'health', 'business', 'science'];
                          if (validTypes.includes(tag.type)) {
                            return (
                              <ArticleLabel
                                key={tag.name}
                                type={tag.type as 'technology' | 'design' | 'lifestyle' | 'travel' | 'food' | 'health' | 'business' | 'science'}
                                size="small"
                                variant="outlined"
                              />
                            );
                          }
                          return null; // or handle the 'unknown' case differently
                        })}
                      </div>
                    </Card.Body>
                    <Card.Footer align="space-between">
                      <span className={styles.date}>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                      <StyledButton
                        buttonType="primary"
                        buttonVariant="view"
                        icon={<EyeOutlined />}
                      >
                        查看详情
                      </StyledButton>
                    </Card.Footer>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={styles.paginationWrapper}
        variants={{
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { delay: 0.5, duration: 0.4 }
          }
        }}
      >
        <StyledPagination
          className={styles.pagination}
          current={page}
          total={total}
          onChange={useCallback((newPage: number) => {
            // 添加页面切换动画
            setLoading(true);
            setPage(newPage);
          }, [])}
          pageSize={10}
          showSizeChanger={false}
        />
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ArticlesList);
