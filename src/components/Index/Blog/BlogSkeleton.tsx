import styled, { keyframes } from 'styled-components'

interface BlogSkeletonProps {
  count?: number
}

export const BlogSkeleton = ({ count = 3 }: BlogSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonImage />
          <SkeletonContent>
            <SkeletonHeader>
              <SkeletonAvatar />
              <SkeletonText width="60%" />
            </SkeletonHeader>
            <SkeletonTitle />
            <SkeletonParagraph />
            <SkeletonTags>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </SkeletonTags>
          </SkeletonContent>
        </SkeletonCard>
      ))}
    </>
  )
}

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.subtle} 25%,
    ${({ theme }) => theme.colors.background.default} 37%,
    ${({ theme }) => theme.colors.background.subtle} 63%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  padding-top: 60%;
`

const SkeletonContent = styled.div`
  padding: 1.5rem;
`

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const SkeletonAvatar = styled(SkeletonBase)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const SkeletonText = styled(SkeletonBase)<{ width?: string }>`
  height: 0.875rem;
  width: ${({ width }) => width || '100%'};
  border-radius: 0.25rem;
`

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.5rem;
  width: 80%;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
`

const SkeletonParagraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  &::before,
  &::after {
    content: '';
    display: block;
    height: 0.875rem;
    background: ${({ theme }) => theme.colors.background.subtle};
    border-radius: 0.25rem;
  }
  
  &::before {
    width: 100%;
  }
  
  &::after {
    width: 70%;
  }
`

const SkeletonTags = styled.div`
  display: flex;
  gap: 0.5rem;
`

const SkeletonTag = styled(SkeletonBase)`
  height: 1.5rem;
  width: 4rem;
  border-radius: 1rem;
`
