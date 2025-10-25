// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Button
} from '@mui/material';
import { 
  FitnessCenter as FitnessIcon,
  WaterDrop as WaterIcon,
  SelfImprovement as MeditationIcon,
  Event as EventIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data
const stats = [
  { title: 'Habits Tracked', value: '5/8', icon: <FitnessIcon />, color: 'primary.main' },
  { title: 'Water Intake', value: '6/8 cups', icon: <WaterIcon />, color: 'info.main' },
  { title: 'Meditation', value: '10 min', icon: <MeditationIcon />, color: 'success.main' },
];

const todayHabits = [
  { id: 1, name: 'Morning Run', completed: true, time: '7:00 AM' },
  { id: 2, name: 'Drink Water', completed: false, time: '8:00 AM' },
  { id: 3, name: 'Read Book', completed: false, time: '9:00 PM' },
];

const upcomingEvents = [
  { id: 1, title: 'Team Meeting', time: '2:00 PM', date: 'Today' },
  { id: 2, title: 'Yoga Class', time: '6:30 PM', date: 'Tomorrow' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState(todayHabits);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h6">{stat.value}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Habits */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Today's Habits"
              action={
                <Button 
                  size="small" 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/habits')}
                >
                  View All
                </Button>
              }
            />
            <Divider />
            <List>
              {habits.map((habit) => (
                <ListItem 
                  key={habit.id} 
                  button 
                  onClick={() => toggleHabit(habit.id)}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: habit.completed ? 'success.main' : 'grey.300',
                        color: habit.completed ? 'white' : 'inherit',
                      }}
                    >
                      {habit.completed ? '✓' : ''}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={habit.name}
                    secondary={habit.time}
                    sx={{
                      textDecoration: habit.completed ? 'line-through' : 'none',
                      color: habit.completed ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
              <ListItem>
                <Button
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/habits/new')}
                >
                  Add New Habit
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Upcoming Events"
              action={
                <Button 
                  size="small" 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/calendar')}
                >
                  View Calendar
                </Button>
              }
            />
            <Divider />
            <List>
              {upcomingEvents.map((event) => (
                <ListItem key={event.id} button>
                  <ListItemAvatar>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={event.title}
                    secondary={`${event.date} • ${event.time}`}
                  />
                </ListItem>
              ))}
              <ListItem>
                <Button
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/calendar/new')}
                >
                  Add New Event
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;