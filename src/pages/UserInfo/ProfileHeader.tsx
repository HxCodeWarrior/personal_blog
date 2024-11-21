import React, { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

const HeaderCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(2),
  overflow: 'visible',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const CoverImage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 200,
  backgroundImage: 'url("/images/profile-cover.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0.4)}, ${alpha(theme.palette.common.black, 0.6)})`,
  },
  '&:hover': {
    '& + .cover-edit': {
      opacity: 1,
    },
  },
}));

const CoverEditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 16,
  bottom: 16,
  color: 'white',
  backgroundColor: alpha(theme.palette.common.black, 0.4),
  opacity: 0,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.6),
    transform: 'scale(1.1)',
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
  marginTop: 140,
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    '& .avatar-edit': {
      opacity: 1,
    },
  },
}));

const AvatarEdit = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: alpha(theme.palette.common.black, 0.6),
  opacity: 0,
  transition: 'opacity 0.2s ease',
  borderRadius: '50%',
}));

const InfoLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const ProfileHeader: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleAvatarClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 处理图片上传
      console.log('Selected file:', file);
      // 这里可以添加图片上传逻辑
    }
  };

  return (
    <HeaderCard>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageInputRef}
        onChange={handleImageChange}
      />

      <CoverImage />
      <CoverEditButton className="cover-edit">
        <CameraAltIcon />
      </CoverEditButton>

      <ProfileAvatar 
        src="/images/avatar.jpg"
        onClick={handleAvatarClick}
      >
        <AvatarEdit className="avatar-edit">
          <CameraAltIcon sx={{ color: 'white' }} />
        </AvatarEdit>
      </ProfileAvatar>

      <Box sx={{ mt: 2, mb: 1 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Sarah Johnson
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Senior Software Engineer
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary' }}>
        <InfoLink href="#location">
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">San Francisco, CA</Typography>
        </InfoLink>
        <InfoLink href="https://www.sarahjohnson.dev" target="_blank">
          <LinkIcon fontSize="small" />
          <Typography variant="body2">www.sarahjohnson.dev</Typography>
        </InfoLink>
      </Box>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ 
          maxWidth: 600, 
          mt: 2,
          lineHeight: 1.6,
          textAlign: 'center' 
        }}
      >
        Passionate about creating beautiful and functional web applications. 
        Specialized in React and TypeScript development with 5+ years of experience.
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<EditIcon />}
          onClick={handleMenuOpen}
        >
          Edit Profile
        </Button>
        <Button 
          variant="outlined"
          startIcon={<ShareIcon />}
        >
          Share Profile
        </Button>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Information
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CameraAltIcon fontSize="small" />
          </ListItemIcon>
          Change Avatar
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          Download Info
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete Profile
        </MenuItem>
      </Menu>
    </HeaderCard>
  );
};

export default ProfileHeader; 