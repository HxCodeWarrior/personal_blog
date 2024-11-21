import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProfileHeader from '@/UserInfo/ProfileHeader';
import PersonalInfo from '@/UserInfo/PersonalInfo';
import ActivityTimeline from '@/UserInfo/ActivityTimeline';
import Statistics from '@/UserInfo/Statistics';
import ConnectedAccounts from '@/UserInfo/ConnectedAccounts';
import NotificationSettings from '@/UserInfo/NotificationSettings';

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const UserInfoPage: React.FC = () => {
  return (
    <PageWrapper>
      <Grid container spacing={3}>
        {/* 个人资料头部 */}
        <Grid item xs={12}>
          <ProfileHeader />
        </Grid>

        {/* 左侧个人信息和活动时间线 */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PersonalInfo />
            </Grid>
            <Grid item xs={12}>
              <ActivityTimeline />
            </Grid>
          </Grid>
        </Grid>

        {/* 右侧统计信息和关联账号 */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Statistics />
            </Grid>
            <Grid item xs={12}>
              <ConnectedAccounts />
            </Grid>
            <Grid item xs={12}>
              <NotificationSettings />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default UserInfoPage; 