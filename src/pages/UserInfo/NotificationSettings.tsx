import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@/components/cards/base/CardHeader';
import CardBody from '@/components/cards/base/CardBody';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import UpdateIcon from '@mui/icons-material/Update';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const SettingSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(3),
  },
  '&:hover': {
    '& .setting-content': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
    '& .setting-icon': {
      transform: 'scale(1.1)',
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
    }
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.primary.main + '20',
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
}));

const SettingContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface NotificationSetting {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  important?: boolean;
  info?: string;
}

const settings: NotificationSetting[] = [
  {
    id: 'email',
    icon: <EmailIcon />,
    title: 'Email Notifications',
    description: 'Receive email updates about your account activity',
    checked: true,
    info: "We will only send important updates and summaries"
  },
  {
    id: 'push',
    icon: <NotificationsIcon />,
    title: 'Push Notifications',
    description: 'Get push notifications in your browser',
    checked: false,
  },
  {
    id: 'security',
    icon: <SecurityIcon />,
    title: 'Security Alerts',
    description: 'Important notifications about your account security',
    checked: true,
    important: true,
    info: 'Required for account security'
  },
  {
    id: 'updates',
    icon: <UpdateIcon />,
    title: 'Product Updates',
    description: 'Be the first to know about new features and updates',
    checked: true,
  },
];

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = notifications.map(notification => 
      notification.id === id 
        ? { ...notification, checked: event.target.checked }
        : notification
    );
    setNotifications(newSettings);
    setHasChanges(true);
  };

  const handleReset = () => {
    setNotifications(settings);
    setHasChanges(false);
  };

  const handleSave = () => {
    // Save logic here
    setHasChanges(false);
  };

  return (
    <Card>
      <CardHeader
        title="Notification Settings"
        subtitle="Manage your notification preferences"
        action={
          hasChanges && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RestoreIcon />}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          )
        }
      />
      <CardBody>
        <FormGroup>
          {notifications.map((setting, index) => (
            <React.Fragment key={setting.id}>
              <SettingSection>
                <SettingContent className="setting-content">
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconWrapper className="setting-icon">
                      {setting.icon}
                    </IconWrapper>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2">
                          {setting.title}
                        </Typography>
                        {setting.important && (
                          <Chip
                            label="Required"
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                        {setting.description}
                      </Typography>
                      {setting.info && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                          <InfoOutlinedIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {setting.info}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <FormControlLabel
                      control={
                        <StyledSwitch 
                          checked={setting.checked}
                          onChange={handleChange(setting.id)}
                          name={setting.id}
                          disabled={setting.important}
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />
                  </Box>
                </SettingContent>
              </SettingSection>
              {index < notifications.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </React.Fragment>
          ))}
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default NotificationSettings; 