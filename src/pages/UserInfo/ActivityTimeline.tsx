import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@/components/cards/base/CardHeader';
import CardBody from '@/components/cards/base/CardBody';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import FilterListIcon from '@mui/icons-material/FilterList';

const TimelineWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    width: 2,
    background: `linear-gradient(to bottom, 
      ${theme.palette.primary.main}, 
      ${alpha(theme.palette.primary.main, 0.1)})`,
    borderRadius: 4,
  }
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(5),
  paddingBottom: theme.spacing(3),
  '&:last-child': {
    paddingBottom: 0,
  },
  '&:hover': {
    '& .timeline-content': {
      transform: 'translateX(4px)',
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
    '& .timeline-dot': {
      transform: 'scale(1.1)',
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`,
    }
  }
}));

const TimelineDot = styled(Avatar)(({ theme }) => ({
  width: 34,
  height: 34,
  position: 'absolute',
  left: 0,
  top: 0,
  border: `2px solid ${theme.palette.background.paper}`,
  transition: 'all 0.3s ease',
  zIndex: 1,
}));

const TimelineContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  position: 'relative',
}));

interface Activity {
  id: string;
  type: 'code' | 'article' | 'star' | 'team';
  title: string;
  description: string;
  time: string;
  color: 'primary' | 'secondary' | 'warning' | 'success';
  link?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'code',
    title: 'Committed to Repository',
    description: 'Added new features to the dashboard component',
    time: '2 hours ago',
    color: 'primary',
    link: 'https://github.com/user/repo/commit/abc123',
  },
  {
    id: '2',
    type: 'article',
    title: 'Published Article',
    description: 'How to build scalable React applications',
    time: '5 hours ago',
    color: 'secondary',
    link: 'https://blog.example.com/article',
  },
  {
    id: '3',
    type: 'star',
    title: 'Project Milestone',
    description: 'Reached 1000+ stars on GitHub repository',
    time: '1 day ago',
    color: 'warning',
  },
  {
    id: '4',
    type: 'team',
    title: 'Team Collaboration',
    description: 'Joined the Design System working group',
    time: '2 days ago',
    color: 'success',
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'code': return <CodeIcon />;
    case 'article': return <ArticleIcon />;
    case 'star': return <StarIcon />;
    case 'team': return <PeopleIcon />;
    default: return <CodeIcon />;
  }
};

const ActivityTimeline: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedActivity(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedActivity(null);
  };

  return (
    <Card>
      <CardHeader
        title="Recent Activity"
        subtitle="Your activities from the past 7 days"
        action={
          <Tooltip title="Filter Activities">
            <IconButton size="small">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardBody>
        <TimelineWrapper>
          {activities.map((activity) => (
            <TimelineItem key={activity.id}>
              <TimelineDot 
                className="timeline-dot"
                color={activity.color}
                sx={{ 
                  backgroundColor: (theme) => 
                    alpha(theme.palette[activity.color].main, 0.12),
                  color: `${activity.color}.main`
                }}
              >
                {getActivityIcon(activity.type)}
              </TimelineDot>
              <TimelineContent className="timeline-content">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {activity.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {activity.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Chip 
                        label={activity.time} 
                        size="small"
                        variant="outlined"
                        sx={{ 
                          borderColor: `${activity.color}.main`,
                          color: `${activity.color}.main`,
                          backgroundColor: (theme) => 
                            alpha(theme.palette[activity.color].main, 0.08),
                        }}
                      />
                      {activity.link && (
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            href={activity.link}
                            target="_blank"
                            sx={{ 
                              color: `${activity.color}.main`,
                              '&:hover': {
                                backgroundColor: (theme) => 
                                  alpha(theme.palette[activity.color].main, 0.08),
                              }
                            }}
                          >
                            <LinkIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                  <IconButton 
                    size="small"
                    onClick={(e) => handleMenuOpen(e, activity.id)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineWrapper>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Remove Activity
          </MenuItem>
        </Menu>
      </CardBody>
    </Card>
  );
};

export default ActivityTimeline; 