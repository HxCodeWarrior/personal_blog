import React from 'react';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@/components/cards/base/CardHeader';
import CardBody from '@/components/cards/base/CardBody';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';

const StatCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

type StatColor = 'primary' | 'secondary' | 'success' | 'warning';

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: StatColor }>(({ theme, color }) => {
  const getColorFromPalette = (colorName: StatColor) => {
    switch (colorName) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    width: 48,
    height: 48,
    borderRadius: theme.shape.borderRadius,
    background: `${getColorFromPalette(color)}20`,
    color: getColorFromPalette(color),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.palette.background.paper,
  '& .MuiLinearProgress-bar': {
    borderRadius: 3,
  },
}));

interface StatItem {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: string;
  color: StatColor;
  progress: number;
}

const stats: StatItem[] = [
  {
    icon: <CodeIcon />,
    title: 'Projects',
    value: 24,
    change: '+4',
    color: 'primary',
    progress: 75,
  },
  {
    icon: <ArticleIcon />,
    title: 'Articles',
    value: 42,
    change: '+8',
    color: 'secondary',
    progress: 65,
  },
  {
    icon: <GroupIcon />,
    title: 'Followers',
    value: '2.1k',
    change: '+201',
    color: 'success',
    progress: 85,
  },
  {
    icon: <StarIcon />,
    title: 'Stars',
    value: '4.6k',
    change: '+1.2k',
    color: 'warning',
    progress: 90,
  },
];

const Statistics: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Statistics"
        subtitle="Your performance and activity metrics"
      />
      <CardBody>
        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid item xs={12} key={stat.title}>
              <StatCard>
                <IconWrapper color={stat.color}>
                  {stat.icon}
                </IconWrapper>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 1 
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="success.main"
                      sx={{ fontWeight: 600 }}
                    >
                      {stat.change}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {stat.value}
                  </Typography>
                  <ProgressBar 
                    variant="determinate" 
                    value={stat.progress} 
                    color={stat.color}
                  />
                </Box>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Statistics; 