import { ArticleType } from '../../../common/Labels/ArticleLabel';

export interface ArticleCardProps {
  /** 文章标题 */
  title: string;
  /** 作者 */
  author: string;
  /** 发布时间 */
  publishTime: string;
  /** 文章简介 */
  description: string;
  /** 文章标签 */
  tags: ArticleType[];
  /** 阅读全文链接 */
  readMoreLink: string;
  /** 是否启用动画 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 点击标题回调 */
  onTitleClick?: () => void;
  /** 点击作者回调 */
  onAuthorClick?: () => void;
  /** 阅读时间（分钟） */
  readingTime?: number;
  /** 点赞数 */
  likes?: number;
  /** 评论数 */
  comments?: number;
  /** 是否已收藏 */
  favorited?: boolean;
  /** 收藏回调 */
  onFavorite?: () => void;
  /** 分享回调 */
  onShare?: () => void;
} 