// src/components/Notifications.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  CircleNotifications as UnreadIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  FitnessCenter as ExerciseIcon,
  LocalDrink as WaterIcon,
  Book as JournalIcon,
  SelfImprovement as MeditationIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const Notifications = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Daily Reminder',
      message: 'Time for your morning exercise!',
      time: '10 minutes ago',
      read: false,
      type: 'exercise',
    },
    {
      id: 2,
      title: 'Water Intake',
      message: 'You have 3 more glasses to reach your daily goal',
      time: '2 hours ago',
      read: false,
      type: 'water',
    },
    {
      id: 3,
      title: 'Journal Prompt',
      message: 'How are you feeling today? Take a moment to reflect.',
      time: '5 hours ago',
      read: true,
      type: 'journal',
    },
    {
      id: 4,
      title: 'Meditation Reminder',
      message: 'Take a 5-minute break to clear your mind',
      time: '1 day ago',
      read: true,
      type: 'meditation',
    },
    {
      id: 5,
      title: 'Upcoming Event',
      message: 'Team meeting in 30 minutes',
      time: '2 days ago',
      read: true,
      type: 'event',
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.read));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'exercise':
        return <ExerciseIcon color="primary" />;
      case 'water':
        return <WaterIcon color="info" />;
      case 'journal':
        return <JournalIcon color="success" />;
      case 'meditation':
        return <MeditationIcon color="warning" />;
      case 'event':
        return <EventIcon color="secondary" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return !notification.read; // Unread
    return notification.read; // Read
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon sx={{ fontSize: 32, mr: 1 }} />
          </Badge>
          <Typography variant="h4">Notifications</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<CheckIcon />}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            sx={{ mr: 1 }}
          >
            Mark all as read
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={deleteAllRead}
            disabled={notifications.every(n => !n.read)}
          >
            Delete read
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <span>All</span>
                {unreadCount > 0 && (
                  <Chip
                    label={unreadCount}
                    color="error"
                    size="small"
                    sx={{ ml: 1, height: 20, minWidth: 20 }}
                  />
                )}
              </Box>
            }
          />
          <Tab label="Unread" />
          <Tab label="Read" />
        </Tabs>

        <List sx={{ p: 0 }}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'background.paper' : 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: notification.read ? 'grey.300' : 'primary.main',
                        color: notification.read ? 'grey.600' : 'white',
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip
                            label="New"
                            color="error"
                            size="small"
                            sx={{ ml: 1, height: 18, fontSize: '0.65rem' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block' }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    {!notification.read && (
                      <IconButton
                        edge="end"
                        aria-label="mark as read"
                        onClick={() => markAsRead(notification.id)}
                        sx={{ mr: 1 }}
                      >
                        <CheckCircleIcon color="action" />
                      </IconButton>
                    )}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <DeleteIcon color="action" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                color: 'text.secondary',
              }}
            >
              <NotificationsIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
              <Typography variant="h6">No notifications</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {tabValue === 0
                  ? "You don't have any notifications yet."
                  : tabValue === 1
                  ? "You don't have any unread notifications."
                  : "You don't have any read notifications."}
              </Typography>
            </Box>
          )}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredNotifications.length} of {notifications.length} notifications
        </Typography>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteAllRead}>
          Clear all
        </Button>
      </Box>
    </Box>
  );
};

export default Notifications;