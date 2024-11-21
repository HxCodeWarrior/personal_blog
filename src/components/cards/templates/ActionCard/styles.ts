import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { shimmerAnimation, rippleAnimation, floatAnimation, pulseAnimation, glowAnimation } from './animations';

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-block',
  '--primary-rgb': theme.palette.primary.main.replace(
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    (_, hex) => {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
  ),

  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 0,
    height: 2,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transition: 'width 0.3s ease',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    background: alpha(theme.palette.primary.main, 0.2),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    opacity: 0,
  },

  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
    animation: `${glowAnimation} 2s infinite`,

    '&::before': {
      width: '100%',
    },

    '&::after': {
      animation: `${rippleAnimation} 0.6s ease-out`,
    },
  },
}));

export const MetaInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',

  '& .meta-item': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    fontSize: '0.875rem',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: alpha(theme.palette.primary.main, 0.08),
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease',
    },

    '&:hover': {
      transform: 'translateY(-1px)',

      '&::before': {
        transform: 'translateX(0)',
      },

      '& .icon': {
        transform: 'rotate(360deg)',
        color: theme.palette.primary.main,
      },
    },

    '& .icon': {
      fontSize: '1rem',
      opacity: 0.8,
      transition: 'all 0.3s ease',
    },
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2.5),
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.8,
  height: '5.4em',
  position: 'relative',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  background: alpha(theme.palette.background.default, 0.5),
  transition: 'all 0.3s ease',

  '&:hover': {
    background: alpha(theme.palette.background.default, 0.8),
    transform: 'scale(1.01)',
    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '30%',
    height: '1.8em',
    background: `linear-gradient(to right, ${alpha(theme.palette.background.paper, 0)}, ${theme.palette.background.paper})`,
  },
}));

export const ReadMoreButton = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 3),
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: theme.palette.primary.contrastText,

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(120deg, 
      ${alpha(theme.palette.common.white, 0)} 0%, 
      ${alpha(theme.palette.common.white, 0.2)} 50%, 
      ${alpha(theme.palette.common.white, 0)} 100%)`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.5s ease',
  },

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
    
    '&::before': {
      transform: 'translateX(100%)',
    },

    '& .arrow-icon': {
      transform: 'translateX(4px) scale(1.2)',
      color: theme.palette.common.white,
    },
  },

  '& .arrow-icon': {
    marginLeft: theme.spacing(1),
    transition: 'all 0.3s ease',
  },
}));

export const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  marginBottom: theme.spacing(2),

  '& .tag-group': {
    animation: `${floatAnimation} 3s ease-in-out infinite`,
    animationDelay: 'calc(var(--index) * 0.1s)',
    transition: 'all 0.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
      animationPlayState: 'paused',
    },
  },
}));

export const CardActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: `linear-gradient(90deg, 
      transparent,
      ${theme.palette.primary.main},
      transparent
    )`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  '&:hover::before': {
    opacity: 1,
  },

  '& .action-item': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease',
    cursor: 'pointer',

    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.08),
      transform: 'translateY(-1px)',

      '& .count': {
        color: theme.palette.primary.main,
      },
    },

    '& .count': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary,
      transition: 'color 0.2s ease',
    },
  },
}));

export const ActionIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: alpha(theme.palette.primary.main, 0.1),
    borderRadius: '50%',
    transform: 'scale(0)',
    transition: 'transform 0.3s ease',
  },

  '&:hover': {
    transform: 'translateY(-2px)',
    
    '&::before': {
      transform: 'scale(1)',
    },
  },

  '&:active': {
    transform: 'translateY(0)',
  },
})); 