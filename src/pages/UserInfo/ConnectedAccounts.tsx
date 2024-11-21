import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@/components/cards/base/CardHeader';
import CardBody from '@/components/cards/base/CardBody';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkOffIcon from '@mui/icons-material/LinkOff';

const AccountItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.default,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'connected',
})<{ connected?: boolean }>(({ theme, connected }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: connected 
    ? theme.palette.success.main + '20'
    : theme.palette.action.disabledBackground,
  color: connected 
    ? theme.palette.success.main
    : theme.palette.text.disabled,
}));

interface SocialAccount {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  username?: string;
}

const accounts: SocialAccount[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: <GitHubIcon />,
    connected: true,
    username: '@sarahjohnson',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    connected: true,
    username: 'sarah-johnson-dev',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: <TwitterIcon />,
    connected: false,
  },
  {
    id: 'google',
    name: 'Google',
    icon: <GoogleIcon />,
    connected: true,
    username: 'sarah.johnson@gmail.com',
  },
];

const ConnectedAccounts: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Connected Accounts"
        subtitle="Manage your connected social accounts"
      />
      <CardBody>
        {accounts.map((account) => (
          <AccountItem key={account.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconWrapper connected={account.connected}>
                {account.icon}
              </IconWrapper>
              <Box>
                <Typography variant="subtitle2">
                  {account.name}
                </Typography>
                {account.connected ? (
                  <Typography variant="caption" color="text.secondary">
                    {account.username}
                  </Typography>
                ) : (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'text.disabled'
                    }}
                  >
                    <LinkOffIcon fontSize="small" />
                    Not Connected
                  </Typography>
                )}
              </Box>
            </Box>
            <Button
              variant={account.connected ? "outlined" : "contained"}
              size="small"
              color={account.connected ? "error" : "primary"}
            >
              {account.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </AccountItem>
        ))}
      </CardBody>
    </Card>
  );
};

export default ConnectedAccounts; 