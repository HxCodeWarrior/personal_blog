import styled from 'styled-components';

// 辅助函数来模拟 rgba
const rgba = (color: string, alpha: number) => `rgba(var(--color-${color}), ${alpha})`;

export const InfoCardWrapper = styled.div`
  .info-card-wrapper {
    width: 100%;
    max-width: 400px;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);

    &:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }
  }

  .avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.9);
    object-fit: cover;
    margin: 0 auto;
    display: block;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .skill {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: ${({ theme }) => `${theme.colors.primary}15`};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0.25rem;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;

    &:hover {
      background: ${({ theme }) => `${theme.colors.primary}22`};
      transform: translateY(-2px);
    }
  }
`;

export const AvatarSection = styled.div`
  position: relative;
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 60%
    );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.background}
    );
  }
`;

export const InfoSection = styled.div`
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => rgba(theme.colors.primary, 0.2)},
      transparent
    );
    border-radius: 2px;
  }
`;

export const Name = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text.primary},
    ${({ theme }) => theme.colors.primary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

export const Role = styled.p`
  margin: 0.5rem 0 1.5rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  font-weight: 500;
  opacity: 0.9;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: ${({ theme }) => rgba(theme.colors.text.primary, 0.03)};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all 0.3s ease;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.text.primary, 0.05)};
    transform: translateX(4px);

    svg {
      transform: scale(1.1);
    }
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 16px;
  background: ${({ theme }) => rgba(theme.colors.text.primary, 0.02)};
`;

export const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => rgba(theme.colors.text.primary, 0.08)};
`; 