'use client'
import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@/components/cards/base/CardHeader';
import CardBody from '@/components/cards/base/CardBody';
import CardFooter from '@/components/cards/base/CardFooter';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress from '@mui/material/LinearProgress';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';
import { motion, HTMLMotionProps } from 'framer-motion';
import { CardProps } from '@mui/material/Card';

// 创建基础卡片组件
const BaseCard = React.forwardRef<HTMLDivElement, CardProps & HTMLMotionProps<"div">>((props, ref) => (
  <Card {...props} ref={ref} />
));
BaseCard.displayName = 'BaseCard';

// 创建动画卡片组件
const MotionCard = motion(BaseCard);

const StyledCard = styled(MotionCard)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)',
    opacity: 0,
    transition: 'opacity 0.3s',
    pointerEvents: 'none',
    zIndex: 1,
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    '&::before': {
      opacity: 1,
    },
  },
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& .MuiLinearProgress-root': {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.08)',
    '& .MuiLinearProgress-bar': {
      borderRadius: 4,
    },
  },
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  borderRadius: '16px',
  height: '24px',
  backgroundColor: 
    status === 'active' ? theme.palette.success.light :
    status === 'pending' ? theme.palette.warning.light :
    status === 'completed' ? theme.palette.info.light :
    theme.palette.error.light,
  color: theme.palette.getContrastText(
    status === 'active' ? theme.palette.success.light :
    status === 'pending' ? theme.palette.warning.light :
    status === 'completed' ? theme.palette.info.light :
    theme.palette.error.light
  ),
}));

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    progress: number;
    status: string;
    members: Array<{ id: string; avatar: string; name: string }>;
    dueDate: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'success';
    if (progress >= 70) return 'primary';
    if (progress >= 30) return 'warning';
    return 'error';
  };

  return (
    <StyledCard
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: getProgressColor(project.progress) === 'success' 
            ? 'linear-gradient(90deg, #4CAF50, #81C784)' 
            : getProgressColor(project.progress) === 'warning'
            ? 'linear-gradient(90deg, #FFA726, #FFB74D)'
            : getProgressColor(project.progress) === 'error'
            ? 'linear-gradient(90deg, #EF5350, #E57373)'
            : 'linear-gradient(90deg, #2196F3, #64B5F6)',
          scaleX: project.progress / 100,
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: project.progress / 100 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {project.title}
            </Typography>
            <StatusChip
              label={project.status}
              status={project.status}
              size="small"
            />
          </Box>
        }
        subtitle={
          <Typography variant="caption" color="text.secondary">
            Due {new Date(project.dueDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Typography>
        }
        action={
          <>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => router.push(`/projects/${project.id}`)}>
                View Details
              </MenuItem>
              <MenuItem onClick={() => router.push(`/projects/${project.id}/edit`)}>
                Edit Project
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>Delete Project</MenuItem>
            </Menu>
          </>
        }
      />
      <CardBody>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              minHeight: '3em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {project.description}
          </Typography>
        </motion.div>
        
        <ProgressWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography 
              variant="caption" 
              color={getProgressColor(project.progress)}
              sx={{ fontWeight: 600 }}
            >
              {project.progress}%
            </Typography>
          </Box>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <LinearProgress 
              variant="determinate" 
              value={project.progress} 
              color={getProgressColor(project.progress)}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: theme => 
                  theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(0,0,0,0.08)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                },
              }}
            />
          </motion.div>
        </ProgressWrapper>

        <Box sx={{ mt: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AvatarGroup 
              max={4} 
              sx={{ 
                justifyContent: 'flex-end',
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  border: '2px solid #fff',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1) translateY(-2px)',
                    zIndex: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  },
                },
              }}
            >
              {project.members.map((member) => (
                <Tooltip 
                  key={member.id} 
                  title={member.name}
                  placement="top"
                  arrow
                >
                  <Avatar 
                    alt={member.name} 
                    src={member.avatar}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          </motion.div>
        </Box>
      </CardBody>
      <CardFooter>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push(`/projects/${project.id}`)}
            sx={{
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              },
            }}
          >
            View Details
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push(`/projects/${project.id}/edit`)}
            sx={{
              borderRadius: '20px',
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1CB5E0)',
                boxShadow: '0 4px 8px rgba(33,150,243,0.3)',
              },
            }}
          >
            Edit
          </Button>
        </motion.div>
      </CardFooter>
    </StyledCard>
  );
};

export default ProjectCard; 