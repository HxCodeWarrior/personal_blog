'use client'
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/Projects/components/ProjectCard';
import ProjectSkeleton from '@/Projects/components/ProjectSkeleton';
import { fetchProjects, type Project } from '@/data/projectsData';
import { useSnackbar } from 'notistack';
import { motion, AnimatePresence } from 'framer-motion';
import { alpha } from '@mui/material/styles';

// 新增背景动画组件
const AnimatedBackground = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: 
    linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(76, 81, 191, 0.1) 100%),
    repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(255, 255, 255, 0.02) 10px, rgba(255, 255, 255, 0.02) 20px);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    animation: pulse 15s ease-in-out infinite;
  }
  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(to bottom, rgba(26, 26, 26, 0.8), rgba(45, 45, 45, 0.8))'
    : 'linear-gradient(to bottom, rgba(248, 249, 250, 0.8), rgba(255, 255, 255, 0.8))',
  backdropFilter: 'blur(10px)',
  minHeight: '100vh',
  position: 'relative',
}));

// 更新 HeaderWrapper 样式
const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(45, 45, 45, 0.8) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.9) 100%)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 'auto',
  },
}));

// 更新 SearchBar 样式
const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(8px)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
  },
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    minWidth: 400,
  },
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const FilterChipsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

// 新增统计卡片组件
const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(38, 38, 38, 0.9) 0%, rgba(55, 55, 55, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.9) 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(8px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const statusFilters = ['active', 'pending', 'completed', 'cancelled'];

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        enqueueSnackbar('Failed to load projects', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [enqueueSnackbar]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = activeFilters.length === 0 || activeFilters.includes(project.status);
    return matchesSearch && matchesFilters;
  });

  const handleFilterToggle = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // 添加项目统计
  const getProjectStats = () => {
    const total = projects.length;
    const active = projects.filter(p => p.status === 'active').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    return { total, active, completed };
  };

  const stats = getProjectStats();

  return (
    <>
      <AnimatedBackground />
      <PageWrapper>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeaderWrapper>
            <Box>
              <Typography 
                variant="h4" 
                fontWeight={600} 
                gutterBottom
                sx={{ 
                  background: theme => 
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #60A5FA, #9333EA)'
                      : 'linear-gradient(45deg, #2563EB, #7C3AED)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                <DashboardIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                Projects Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage and track all your projects in one place
              </Typography>
            </Box>

            <SearchWrapper>
              <SearchBar>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchBar>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => router.push('/projects/create')}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2, #1CB5E0)',
                  },
                }}
              >
                New Project
              </Button>
            </SearchWrapper>
          </HeaderWrapper>

          <FilterChipsWrapper>
            {statusFilters.map(filter => (
              <Chip
                key={filter}
                label={filter.charAt(0).toUpperCase() + filter.slice(1)}
                onClick={() => handleFilterToggle(filter)}
                color={activeFilters.includes(filter) ? "primary" : "default"}
                variant={activeFilters.includes(filter) ? "filled" : "outlined"}
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'translateY(-2px)' },
                }}
              />
            ))}
          </FilterChipsWrapper>

          {/* 添加统计卡片 */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <StatsCard>
                <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'primary.main' }}>
                  <DashboardIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">{stats.total}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Projects</Typography>
                </Box>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatsCard>
                <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'success.main' }}>
                  <DashboardIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">{stats.active}</Typography>
                  <Typography variant="body2" color="text.secondary">Active Projects</Typography>
                </Box>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatsCard>
                <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'info.main' }}>
                  <DashboardIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">{stats.completed}</Typography>
                  <Typography variant="body2" color="text.secondary">Completed Projects</Typography>
                </Box>
              </StatsCard>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <AnimatePresence mode='wait'>
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ProjectSkeleton />
                    </motion.div>
                  </Grid>
                ))
              ) : (
                filteredProjects.map((project, index) => (
                  <Grid item xs={12} sm={6} md={4} key={project.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  </Grid>
                ))
              )}
            </AnimatePresence>
          </Grid>

          {!loading && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h6">
                  No projects found
                </Typography>
                <Typography variant="body2">
                  Try adjusting your search or filters
                </Typography>
              </Box>
            </motion.div>
          )}
        </motion.div>
      </PageWrapper>
    </>
  );
};

export default ProjectsPage;
