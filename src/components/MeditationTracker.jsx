// src/components/MeditationTracker.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Slider,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import {
  SelfImprovement as MeditationIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Replay as ReplayIcon,
  Timer as TimerIcon,
  MusicNote as MusicIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const MeditationTracker = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5); // in minutes
  const [timeLeft, setTimeLeft] = useState(5 * 60); // in seconds
  const [sessions, setSessions] = useState([
    { id: 1, duration: 5, date: '2023-05-15', notes: 'Morning meditation', favorite: true },
    { id: 2, duration: 10, date: '2023-05-14', notes: 'Evening wind down', favorite: false },
  ]);
  const [currentSession, setCurrentSession] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDurationChange = (event, newValue) => {
    setDuration(newValue);
    setTimeLeft(newValue * 60);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsPlaying(false);
            // Add completed session
            const newSession = {
              id: Date.now(),
              duration,
              date: new Date().toISOString().split('T')[0],
              notes: '',
              favorite: false,
            };
            setSessions(prev => [newSession, ...prev]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, duration]);

  const toggleFavorite = (id) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === id 
          ? { ...session, favorite: !session.favorite } 
          : session
      )
    );
  };

  const deleteSession = (id) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const startNewSession = () => {
    setCurrentSession(null);
    setDuration(5);
    setTimeLeft(5 * 60);
    setIsPlaying(false);
  };

  const startSession = (session) => {
    setCurrentSession(session);
    setDuration(session.duration);
    setTimeLeft(session.duration * 60);
    setIsPlaying(false);
  };

  const saveSessionNotes = (id, notes) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === id 
          ? { ...session, notes } 
          : session
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <MeditationIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Meditation Tracker
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={startNewSession}
        >
          New Session
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="meditation tabs"
              sx={{ mb: 3 }}
            >
              <Tab label="Meditate" />
              <Tab label="Sessions" />
              <Tab label="Stats" />
            </Tabs>

            {tabValue === 0 && (
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    border: '8px solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 40px',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '8px solid transparent',
                      borderTopColor: '#4caf50',
                      transform: `rotate(${(1 - timeLeft / (duration * 60)) * 360}deg)`,
                      transition: 'transform 1s linear',
                    },
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                    {formatTime(timeLeft)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {isPlaying ? 'Meditating...' : 'Ready to begin'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                  <IconButton
                    size="large"
                    onClick={togglePlayPause}
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    {isPlaying ? <PauseIcon fontSize="large" /> : <PlayIcon fontSize="large" />}
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={resetTimer}
                    disabled={timeLeft === duration * 60}
                  >
                    <ReplayIcon fontSize="large" />
                  </IconButton>
                </Box>

                <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
                  <Typography gutterBottom>Duration: {duration} minutes</Typography>
                  <Slider
                    value={duration}
                    onChange={handleDurationChange}
                    min={1}
                    max={60}
                    step={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} min`}
                    disabled={isPlaying}
                  />
                </Box>
              </Box>
            )}

            {tabValue === 1 && (
              <List>
                {sessions.map((session) => (
                  <React.Fragment key={session.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TimerIcon color="action" />
                            <Typography variant="subtitle1" component="span">
                              {session.duration} min • {new Date(session.date).toLocaleDateString()}
                            </Typography>
                            {session.favorite && (
                              <FavoriteIcon color="error" fontSize="small" />
                            )}
                          </Box>
                        }
                        secondary={
                          session.notes || 'No notes'
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="favorite"
                          onClick={() => toggleFavorite(session.id)}
                        >
                          {session.favorite ? (
                            <FavoriteIcon color="error" />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="start"
                          onClick={() => startSession(session)}
                        >
                          <PlayIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteSession(session.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
                {sessions.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <MeditationIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                    <Typography>No meditation sessions yet</Typography>
                  </Box>
                )}
              </List>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Your Meditation Stats
                </Typography>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          Total Sessions
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {sessions.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          Total Minutes
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {sessions.reduce((sum, session) => sum + session.duration, 0)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          Average Duration
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {sessions.length > 0
                            ? Math.round(sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length)
                            : 0}{' '}
                          min
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Box sx={{ height: 300, backgroundColor: 'grey.100', borderRadius: 1 }} />
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Guided Meditations
              </Typography>
              <List>
                {[
                  { title: 'Morning Meditation', duration: '10 min', category: 'Focus' },
                  { title: 'Stress Relief', duration: '15 min', category: 'Relaxation' },
                  { title: 'Sleep Meditation', duration: '20 min', category: 'Sleep' },
                  { title: 'Anxiety Relief', duration: '10 min', category: 'Calm' },
                  { title: 'Body Scan', duration: '15 min', category: 'Relaxation' },
                ].map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">{item.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          <TimerIcon fontSize="inherit" sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                          {item.duration}
                        </Typography>
                        <Chip
                          label={item.category}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <PlayIcon color="primary" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tips for Meditation
              </Typography>
              <List dense>
                {[
                  'Find a quiet, comfortable place to sit',
                  'Set a timer for your desired duration',
                  'Focus on your breath',
                  'When your mind wanders, gently bring it back',
                  'Be patient with yourself',
                  'Try to meditate at the same time each day',
                ].map((tip, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        mr: 1.5,
                        mt: 0.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2">{tip}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeditationTracker;