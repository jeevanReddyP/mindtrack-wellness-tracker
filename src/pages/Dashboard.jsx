import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  Grid, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Badge 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Notifications as NotificationsIcon, 
  Menu as MenuIcon 
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import StreakChart from '../components/StreakChart';
import HabitCard from '../components/HabitCard';
import CalendarView from '../components/CalendarView';
import BadgeCard from '../components/BadgeCard';
import InsightsCard from '../components/InsightsCard';
import HabitTree from '../components/HabitTree';
import { addHabit, deleteHabit, toggleHabitComplete } from '../redux/habitSlice';

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { habits, streak, badges } = useSelector((state) => state.habits);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', background: '#f8f9fa' }}>
        {/* Top App Bar */}
        <AppBar 
          position="fixed" 
          sx={{ 
            width: { sm: `calc(100% - 250px)` }, 
            ml: { sm: '250px' },
            bgcolor: 'white',
            color: 'text.primary',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(88, 204, 2, 0.1)',
                  px: 2,
                  py: 1,
                  borderRadius: 20,
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                <Typography variant="body2" fontWeight="medium" color="primary">
                  {streak.current} day streak
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ pt: { xs: 8, sm: 8 }, px: { xs: 2, sm: 3 } }}>
          <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} md={8}>
                {/* Welcome Card */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 4,
                    mb: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    background: 'linear-gradient(135deg, #58cc02 0%, #1cb0f6 100%)',
                    color: 'white',
                  }}
                >
                  <Typography variant="h5" fontWeight="600" mb={1}>
                    Welcome back, User! 👋
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: '80%' }}>
                    Track your habits and build a better version of yourself, one day at a time.
                  </Typography>
                </Box>

                {/* Habit Tree */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    My Habits
                  </Typography>
                  <HabitTree
                    habits={habits}
                    onAddHabit={(parentId, name) => {
                      dispatch(addHabit({ parentId, name }));
                    }}
                    onDeleteHabit={(habitId) => {
                      dispatch(deleteHabit(habitId));
                    }}
                    onToggleHabitComplete={(habitId) => {
                      dispatch(toggleHabitComplete(habitId));
                    }}
                  />
                </Box>

                {/* Streak Chart */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <StreakChart />
                </Box>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={4}>
                {/* Calendar View */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <CalendarView />
                </Box>

                {/* Badges */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <BadgeCard badges={badges} />
                </Box>

                {/* Insights */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <InsightsCard />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;