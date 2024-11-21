import { motion } from 'framer-motion'
import styled from 'styled-components'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelect
}: CategoryFilterProps) => {
  return (
    <FilterContainer>
      <FilterList>
        {categories.map((category) => (
          <FilterItem key={category}>
            <FilterButton
              onClick={() => onSelect(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: selectedCategory === category 
                  ? 'var(--selected-bg)' 
                  : 'var(--default-bg)',
                color: selectedCategory === category 
                  ? 'var(--selected-color)' 
                  : 'var(--default-color)',
              }}
              transition={{ duration: 0.2 }}
            >
              {category}
              {selectedCategory === category && (
                <ActiveIndicator
                  layoutId="activeCategory"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </FilterButton>
          </FilterItem>
        ))}
      </FilterList>
    </FilterContainer>
  )
}

const FilterContainer = styled.div`
  margin-bottom: 3rem;
  padding: 0.5rem;
  overflow-x: auto;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 1rem,
    black calc(100% - 1rem),
    transparent
  );
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.subtle};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 2px;
  }
`

const FilterList = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`

const FilterItem = styled.div`
  position: relative;
`

const FilterButton = styled(motion.button)`
  position: relative;
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
  
  --selected-bg: ${({ theme }) => theme.colors.primary.main};
  --selected-color: ${({ theme }) => theme.colors.primary.contrast};
  --default-bg: ${({ theme }) => `${theme.colors.primary.main}15`};
  --default-color: ${({ theme }) => theme.colors.text.primary};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.primary.main};
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
`

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  pointer-events: none;
` 