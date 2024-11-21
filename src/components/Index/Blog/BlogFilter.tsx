import styled from 'styled-components'
import { motion } from 'framer-motion'

interface BlogFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export const BlogFilter = ({
  categories,
  selectedCategory,
  onSelectCategory
}: BlogFilterProps) => {
  return (
    <FilterContainer>
      <FilterList>
        {categories.map((category) => (
          <FilterItem key={category}>
            <FilterButton
              selected={category === selectedCategory}
              onClick={() => onSelectCategory(category)}
            >
              {category}
              {category === selectedCategory && (
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
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 0.5rem;
  
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

const FilterList = styled.ul`
  display: flex;
  gap: 1rem;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`

const FilterItem = styled.li`
  position: relative;
`

const FilterButton = styled.button<{ selected: boolean }>`
  position: relative;
  padding: 0.5rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${({ selected, theme }) => 
    selected ? theme.colors.primary.main : theme.colors.text.secondary};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 1px;
`
