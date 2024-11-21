import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Card from '../../base/Card';
import { ArticleLabel, LabelGroup } from '../../../common/Labels';
import {
  TimeIcon,
  PersonIcon,
  ArrowForwardIcon,
  BookmarkIcon,
  BookmarkBorderIcon,
  ShareIcon,
  FavoriteIcon,
  ChatBubbleOutlineIcon,
} from './icons';
import {
  Title,
  MetaInfo,
  Description,
  ReadMoreButton,
  TagsContainer,
  CardActions,
} from './styles';
import { ActionItem, RippleEffect } from './InteractiveElements';
import { formatNumber, formatReadingTime, getTimeAgo } from './utils';
import type { ArticleCardProps } from './types';

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  author,
  publishTime,
  description,
  tags,
  readMoreLink,
  animated = true,
  className,
  onTitleClick,
  onAuthorClick,
  readingTime,
  likes = 0,
  comments = 0,
  favorited = false,
  onFavorite,
  onShare,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card
      variant="glass"
      hover
      animated={animated}
      className={className}
    >
      <Card.Body padding="large">
        <RippleEffect>
          <Title
            variant="h5"
            onClick={onTitleClick}
          >
            {title}
          </Title>
        </RippleEffect>

        <MetaInfo>
          <Tooltip title="查看作者信息" arrow>
            <span className="meta-item" onClick={onAuthorClick} style={{ cursor: 'pointer' }}>
              <PersonIcon className="icon" />
              {author}
            </span>
          </Tooltip>
          <Tooltip title={publishTime} arrow>
            <span className="meta-item">
              <TimeIcon className="icon" />
              {getTimeAgo(publishTime)}
            </span>
          </Tooltip>
          {readingTime && (
            <Tooltip title="预计阅读时间" arrow>
              <span className="meta-item">
                <TimeIcon className="icon" />
                {formatReadingTime(readingTime)}
              </span>
            </Tooltip>
          )}
        </MetaInfo>

        <Description variant="body1">
          {description}
        </Description>

        <CardActions>
          <TagsContainer>
            <LabelGroup spacing={1}>
              {tags.map((tag, index) => (
                <div 
                  key={tag} 
                  className="tag-group"
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <ArticleLabel
                    type={tag}
                    variant="soft"
                    size="small"
                    clickable
                    animated={animated}
                  />
                </div>
              ))}
            </LabelGroup>
          </TagsContainer>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ActionItem
              icon={<FavoriteIcon />}
              count={formatNumber(likeCount)}
              tooltip={`${formatNumber(likeCount)} 人点赞`}
              active={isLiked}
              onClick={handleLike}
            />

            <ActionItem
              icon={<ChatBubbleOutlineIcon />}
              count={formatNumber(comments)}
              tooltip={`${formatNumber(comments)} 条评论`}
            />

            <Tooltip title={favorited ? '取消收藏' : '收藏文章'} arrow>
              <IconButton 
                size="small" 
                onClick={onFavorite}
                color={favorited ? 'primary' : 'default'}
                sx={{ 
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              >
                {favorited ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="分享文章" arrow>
              <IconButton 
                size="small" 
                onClick={onShare}
                sx={{ 
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>

            <ReadMoreButton
              variant="text"
              color="primary"
              href={readMoreLink}
              endIcon={<ArrowForwardIcon className="arrow-icon" />}
            >
              阅读全文
            </ReadMoreButton>
          </Box>
        </CardActions>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard; 