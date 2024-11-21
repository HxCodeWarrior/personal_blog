import { motion } from 'framer-motion'
import styled from 'styled-components'

interface SearchIconProps {
  size?: number
  className?: string
}

export const SearchIcon = ({ size = 24, className }: SearchIconProps) => {
  return (
    <StyledIcon
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      />
      <motion.path
        d="M21 21L16.65 16.65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
    </StyledIcon>
  )
}

const StyledIcon = styled(motion.svg)`
  cursor: pointer;
  color: inherit;
  
  path {
    transition: stroke 0.3s ease;
  }

  &:hover path {
    stroke: ${({ theme }) => theme.colors.primary.main};
  }
` 