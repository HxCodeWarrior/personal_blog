import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { BlogPost } from '@/data/homeData'
import { BlogFilter } from './BlogFilter'
import { BlogSkeleton } from './BlogSkeleton'
import { BlogSearch } from './BlogSearch'

interface BlogSectionProps {
  posts: BlogPost[]
}

export const BlogSection = ({ posts }: BlogSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts)
  const [isLoading, setIsLoading] = useState(true)

  // 获取所有唯一的分类
  const categories = ['All', ...new Set(posts.map(post => post.category))]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = posts

    // 应用分类过滤
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // 应用搜索过滤
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.author.name.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm, posts])

  return (
    <Container>
      <SectionHeader>
        <TitleWrapper>
          <SubTitleAccent>Featured Articles</SubTitleAccent>
          <Title>
            <TitleHighlight>热门</TitleHighlight>
            文章
          </Title>
          <SubTitle>
            探索前沿技术，分享开发心得
            <SubTitleDot>·</SubTitleDot>
            激发创新思维
            <SubTitleDot>·</SubTitleDot>
            解锁技术新知
          </SubTitle>
          <TitleDecoration />
        </TitleWrapper>
      </SectionHeader>

      <BlogSearch 
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <BlogFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 添加搜索结果计数 */}
      {searchTerm && (
        <SearchResults>
          Found {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </SearchResults>
      )}

      <PostsGrid>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <BlogSkeleton count={3} />
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <ImageWrapper>
                  <PostImage src={post.imageUrl} alt={post.title} />
                  <CategoryBadge>{post.category}</CategoryBadge>
                </ImageWrapper>
                <PostContent>
                  <PostMeta>
                    <AuthorInfo>
                      <AuthorAvatar src={post.author.avatar} alt={post.author.name} />
                      <AuthorName>{post.author.name}</AuthorName>
                    </AuthorInfo>
                    <PostDate>{post.date}</PostDate>
                  </PostMeta>
                  <PostTitle>{post.title}</PostTitle>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  <TagsContainer>
                    {post.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagsContainer>
                  <ReadMoreLink>
                    Read More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </ReadMoreLink>
                </PostContent>
              </PostCard>
            ))
          ) : (
            <NoResults>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsText>No posts found matching your criteria</NoResultsText>
              <NoResultsSubtext>
                Try adjusting your search or filter to find what you're looking for
              </NoResultsSubtext>
            </NoResults>
          )}
        </AnimatePresence>
      </PostsGrid>
    </Container>
  )
}

const Container = styled.section`
  padding: 2rem 0;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const SubTitleAccent = styled.span`
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) => `${theme.colors.primary.main}15`};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-bottom: 0.5rem;
`

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  position: relative;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const TitleHighlight = styled.span`
  position: relative;
  display: inline-block;
  color: transparent;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.2em;
    background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
    border-radius: 0.1em;
  }
`

const SubTitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 1rem auto 0;
  line-height: 1.6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`

const SubTitleDot = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: bold;
  margin: 0 0.25rem;
`

const TitleDecoration = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => `${theme.colors.primary.main}05`} 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
  
  @media (max-width: 768px) {
    width: 200%;
    height: 200%;
  }
`

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const PostCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 60%;
`

const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CategoryBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  backdrop-filter: blur(4px);
`

const PostContent = styled.div`
  padding: 1.5rem;
`

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const AuthorAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const AuthorName = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PostDate = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PostTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`

const PostExcerpt = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.background.subtle};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
`

const ReadMoreLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: gap 0.3s ease;
  
  &:hover {
    gap: 0.75rem;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`

const SearchResults = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  margin: -1rem 0 1rem;
`

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 1rem;
`

const NoResultsIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const NoResultsText = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`

const NoResultsSubtext = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`
