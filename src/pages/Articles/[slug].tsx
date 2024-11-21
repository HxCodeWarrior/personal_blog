import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/cards/base/Card';
import ArticleLabel from '@/components/common/Labels/ArticleLabel';
import { Button, Tooltip, message, Dropdown } from 'antd';
import { 
  EditOutlined, 
  ArrowLeftOutlined,
  ShareAltOutlined,
  HeartOutlined,
  HeartFilled,
  BookOutlined,
  EllipsisOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import styles from './ArticleDetail.module.scss';

interface ArticleDetail {
  id: string;
  title: string;
  author: string;
  content: string;
  tags: Array<{
    name: string;
    type: string;
  }>;
  createdAt: string;
  readTime?: number;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchArticleDetail();
  }, [slug]);

  const fetchArticleDetail = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的 API 调用
      const response = await fetch(`/api/articles/${slug}`);
      const data = await response.json();
      setArticle(data);
      setIsLiked(data.isLiked);
      setIsBookmarked(data.isBookmarked);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      // TODO: 实现点赞 API
      setIsLiked(!isLiked);
      message.success(isLiked ? '已取消点赞' : '点赞成功');
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  const handleBookmark = async () => {
    try {
      // TODO: 实现收藏 API
      setIsBookmarked(!isBookmarked);
      message.success(isBookmarked ? '已取消收藏' : '收藏成功');
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  const handleShare = async (platform: string) => {
    // TODO: 实现分享功能
    const shareUrl = window.location.href;
    const title = article?.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        message.success('链接已复制到剪贴板');
        break;
    }
  };

  const shareMenuItems = [
    { key: 'twitter', label: '分享到 Twitter' },
    { key: 'facebook', label: '分享到 Facebook' },
    { key: 'copy', label: '复制链接' },
  ];

  return (
    <div className={styles.articleContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          variant="glass" 
          loading={loading}
          className={styles.articleCard}
        >
          <Card.Header
            title={
              <motion.div 
                className={styles.headerTitle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button 
                  icon={<ArrowLeftOutlined />} 
                  onClick={() => navigate(-1)}
                  type="text"
                  className={styles.backButton}
                />
                {article?.title}
              </motion.div>
            }
            action={
              <div className={styles.headerActions}>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/articles/edit/${slug}`)}
                >
                  编辑文章
                </Button>
                <Dropdown
                  menu={{ items: shareMenuItems, onClick: ({ key }) => handleShare(key) }}
                  trigger={['click']}
                >
                  <Button icon={<EllipsisOutlined />} />
                </Dropdown>
              </div>
            }
          />
          <Card.Body>
            {article && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={styles.meta}>
                    <div className={styles.authorInfo}>
                      <span className={styles.author}>作者：{article.author}</span>
                      <span className={styles.date}>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.stats}>
                      <Tooltip title="阅读时间">
                        <span><ClockCircleOutlined /> {article.readTime || 5} 分钟</span>
                      </Tooltip>
                      <Tooltip title="阅读量">
                        <span><EyeOutlined /> {article.viewCount || 0}</span>
                      </Tooltip>
                      <Tooltip title="评论数">
                        <span><MessageOutlined /> {article.commentCount || 0}</span>
                      </Tooltip>
                    </div>
                    <div className={styles.tags}>
                      {article.tags.map(tag => (
                        <ArticleLabel
                          key={tag.name}
                          type={tag.type as any}
                          size="small"
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.content}>
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </Card.Body>
          <Card.Footer>
            <div className={styles.articleActions}>
              <Button
                type={isLiked ? 'primary' : 'default'}
                icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                onClick={handleLike}
                className={styles.actionButton}
              >
                {article?.likeCount || 0} 点赞
              </Button>
              <Button
                type={isBookmarked ? 'primary' : 'default'}
                icon={<BookOutlined />}
                onClick={handleBookmark}
                className={styles.actionButton}
              >
                收藏
              </Button>
              <Dropdown
                menu={{ items: shareMenuItems, onClick: ({ key }) => handleShare(key) }}
                trigger={['click']}
              >
                <Button
                  icon={<ShareAltOutlined />}
                  className={styles.actionButton}
                >
                  分享
                </Button>
              </Dropdown>
            </div>
          </Card.Footer>
        </Card>
      </motion.div>
    </div>
  );
};

export default ArticleDetail;
