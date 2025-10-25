// src/components/Profile.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  CameraAlt as CameraIcon,
  FitnessCenter as ExerciseIcon,
  LocalDrink as WaterIcon,
  Book as JournalIcon,
  SelfImprovement as MeditationIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    dob: '1990-01-01',
    gender: 'male',
    bio: 'Fitness enthusiast and mindfulness practitioner. Love to stay active and maintain a healthy lifestyle.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    cover: 'https://source.unsplash.com/random/800x200/?fitness',
  });

  const [formData, setFormData] = useState({ ...user });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    // In a real app, you would make an API call to update the user's profile
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Exercise', value: '5', icon: <ExerciseIcon />, color: 'primary.main' },
    { label: 'Water Intake', value: '8/10', icon: <WaterIcon />, color: 'info.main' },
    { label: 'Journal Entries', value: '12', icon: <JournalIcon />, color: 'success.main' },
    { label: 'Meditation', value: '7h 30m', icon: <MeditationIcon />, color: 'warning.main' },
  ];

  const recentActivities = [
    { id: 1, action: 'Completed a 30-minute run', time: '2 hours ago', type: 'exercise' },
    { id: 2, action: 'Logged 8 glasses of water', time: '5 hours ago', type: 'water' },
    { id: 3, action: 'Added a new journal entry', time: '1 day ago', type: 'journal' },
    { id: 4, action: 'Completed a 15-minute meditation', time: '2 days ago', type: 'meditation' },
    { id: 5, action: 'Set a new personal best', time: '3 days ago', type: 'exercise' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'exercise':
        return <ExerciseIcon color="primary" />;
      case 'water':
        return <WaterIcon color="info" />;
      case 'journal':
        return <JournalIcon color="success" />;
      case 'meditation':
        return <MeditationIcon color="warning" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cover Photo */}
      <Box sx={{ position: 'relative', mb: 15, borderRadius: 2, overflow: 'hidden' }}>
        <Box
          component="img"
          src={user.cover}
          alt="Cover"
          sx={{ width: '100%', height: 200, objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -75,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              '&:hover .edit-avatar': {
                opacity: 1,
              },
            }}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{
                width: 150,
                height: 150,
                border: '4px solid white',
                boxShadow: 3,
              }}
            />
            {isEditing && (
              <IconButton
                className="edit-avatar"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <CameraIcon />
              </IconButton>
            )}
          </Box>
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.bio}
          </Typography>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="profile tabs"
        sx={{ mb: 3 }}
        centered
      >
        <Tab label="Overview" />
        <Tab label="Activity" />
        <Tab label="Settings" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Personal Information</Typography>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <CakeIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 2 }}>Gender:</Typography>
                    <Button
                      variant={formData.gender === 'male' ? 'contained' : 'outlined'}
                      startIcon={<MaleIcon />}
                      onClick={() => isEditing && setFormData(prev => ({ ...prev, gender: 'male' }))}
                      disabled={!isEditing}
                      sx={{ mr: 1 }}
                    >
                      Male
                    </Button>
                    <Button
                      variant={formData.gender === 'female' ? 'contained' : 'outlined'}
                      startIcon={<FemaleIcon />}
                      onClick={() => isEditing && setFormData(prev => ({ ...prev, gender: 'female' }))}
                      disabled={!isEditing}
                    >
                      Female
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Health Stats
              </Typography>
              <Grid container spacing={2}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        textAlign: 'center',
                        borderLeft: `4px solid ${stat.color}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          backgroundColor: `${stat.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1,
                          color: stat.color,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Goals
                </Typography>
                <List>
                  {[
                    { label: 'Exercise', value: '30 min', progress: 80, color: 'primary.main' },
                    { label: 'Water Intake', value: '8/10 glasses', progress: 80, color: 'info.main' },
                    { label: 'Meditation', value: '15 min', progress: 60, color: 'warning.main' },
                    { label: 'Sleep', value: '7-9 hours', progress: 90, color: 'success.main' },
                  ].map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{item.label}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {item.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 8,
                          backgroundColor: 'grey.200',
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${item.progress}%`,
                            backgroundColor: item.color,
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </List>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  Edit Goals
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Badges
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                    textAlign: 'center',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((badge) => (
                    <Box key={badge}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          backgroundColor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px',
                          fontSize: 24,
                        }}
                      >
                        🏆
                      </Box>
                      <Typography variant="caption" display="block">
                        Badge {badge}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  View All Badges
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <List>
            {recentActivities.map((activity) => (
              <React.Fragment key={activity.id}>
                <ListItem>
                  <ListItemIcon>
                    {getActivityIcon(activity.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={activity.time}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
          <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
            View All Activity
          </Button>
        </Paper>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive email notifications"
                  />
                  <Switch checked={true} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive push notifications"
                  />
                  <Switch checked={true} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Enable dark mode"
                  />
                  <Switch checked={false} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <Button variant="contained">Update Password</Button>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'error.light' }}>
              <Typography variant="h6" gutterBottom>
                Danger Zone
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Deleting your account will permanently remove all your data. This action cannot be
                undone.
              </Typography>
              <Button variant="outlined" color="error">
                Delete Account
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Profile;