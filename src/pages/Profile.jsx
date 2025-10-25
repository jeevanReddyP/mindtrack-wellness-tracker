// src/pages/Profile.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Lock as LockIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2023',
    avatar: '/path/to/avatar.jpg'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would update the theme here
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to your backend
    console.log('Profile saved:', profileData);
  };

  return (
    <Box>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        <Avatar
          src={profileData.avatar}
          sx={{ 
            width: 100, 
            height: 100,
            mb: { xs: 2, sm: 0 },
            mr: { sm: 3 }
          }}
        />
        <Box>
          <Typography variant="h4">{profileData.name}</Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {profileData.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <CalendarIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
            Member since {profileData.joinDate}
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Profile" />
          <Tab label="Settings" />
          <Tab label="Statistics" />
        </Tabs>
        <Divider />

        {/* Profile Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Edit Profile</Typography>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { mb: 2 },
                maxWidth: 600
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Avatar URL"
                name="avatar"
                value={profileData.avatar}
                onChange={handleInputChange}
                margin="normal"
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSaveProfile}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {/* Settings Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Account Settings</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Dark Mode" 
                  secondary="Switch between light and dark theme" 
                />
                <Switch
                  edge="end"
                  checked={isDarkMode}
                  onChange={handleThemeToggle}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Notifications" 
                  secondary="Enable or disable notifications" 
                />
                <Switch
                  edge="end"
                  checked={notificationsEnabled}
                  onChange={handleNotificationsToggle}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Change Password" 
                    secondary="Update your account password" 
                  />
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
              <ListItem disablePadding>
                <ListItemButton sx={{ color: 'error.main' }}>
                  <ListItemIcon sx={{ color: 'error.main' }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Logout" 
                    primaryTypographyProps={{ color: 'error' }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}

        {/* Statistics Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Your Statistics</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">24</Typography>
                  <Typography variant="body2" color="text.secondary">Total Habits</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">18</Typography>
                  <Typography variant="body2" color="text.secondary">Completed Today</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">7</Typography>
                  <Typography variant="body2" color="text.secondary">Day Streak</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom>Weekly Progress</Typography>
                  {/* Placeholder for chart */}
                  <Box sx={{ height: 200, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">Weekly Progress Chart</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom>Habit Distribution</Typography>
                  {/* Placeholder for chart */}
                  <Box sx={{ height: 200, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">Habit Distribution Chart</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Account Actions */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Danger Zone</Typography>
        <Button 
          variant="outlined" 
          color="error"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              // Handle account deletion
              console.log('Account deleted');
            }
          }}
        >
          Delete Account
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This will permanently delete your account and all associated data.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile;