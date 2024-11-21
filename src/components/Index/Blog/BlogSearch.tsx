import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'

interface BlogSearchProps {
  onSearch: (searchTerm: string) => void
  searchTerm: string
}

export const BlogSearch = ({ onSearch, searchTerm }: BlogSearchProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onSearch('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <SearchWrapper>
      <SearchContainer
        initial="initial"
        animate={isFocused ? "focused" : "unfocused"}
        variants={{
          initial: { scale: 1 },
          focused: { 
            scale: 1.02,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            borderColor: 'rgba(99, 102, 241, 0.5)'
          },
          unfocused: { 
            scale: 1,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        <SearchIconWrapper
          animate={isFocused ? "focused" : "unfocused"}
          variants={{
            focused: { scale: 1.1, rotate: 15 },
            unfocused: { scale: 1, rotate: 0 }
          }}
        >
          <SearchIcon />
        </SearchIconWrapper>

        <InputWrapper>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Search posts, tags, or authors..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <AnimatePresence mode="wait">
            {searchTerm && (
              <ClearButton
                initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                onClick={handleClear}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </ClearButton>
            )}
          </AnimatePresence>
        </InputWrapper>

        <SearchHotkeyWrapper>
          <SearchHotkey
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
          >
            <HotkeyText>Ctrl</HotkeyText>
            <HotkeyPlus>+</HotkeyPlus>
            <HotkeyText>/</HotkeyText>
          </SearchHotkey>
        </SearchHotkeyWrapper>
      </SearchContainer>
      
      <Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </SearchWrapper>
  )
}

const SearchWrapper = styled.div`
  position: relative;
  max-width: 700px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
`

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1;
  pointer-events: none;
`

const SearchContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`

const SearchIconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
`

const SearchIcon = styled(FiSearch)`
  width: 1.25rem;
  height: 1.25rem;
`

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;
  padding: 0.25rem 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    transition: color 0.2s ease;
  }

  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`

const ClearButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  background: ${({ theme }) => theme.colors.background.subtle};
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.inverse};
  }
`

const SearchHotkeyWrapper = styled.div`
  position: relative;
  padding-left: 0.75rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 1.5rem;
    background: ${({ theme }) => theme.colors.background.subtle};
  }
`

const SearchHotkey = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.background.subtle};
  border-radius: 0.375rem;
  user-select: none;
`

const HotkeyText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const HotkeyPlus = styled(HotkeyText)`
  opacity: 0.5;
` 