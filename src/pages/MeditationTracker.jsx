// src/pages/MeditationTracker.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Slider,
  IconButton,
  Divider,
  Chip,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Timer as TimerIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const meditationTypes = [
  { id: 1, name: 'Mindfulness', duration: 300, description: 'Focus on your breath and be present' },
  { id: 2, name: 'Body Scan', duration: 600, description: 'Gradually relax each part of your body' },
  { id: 3, name: 'Loving Kindness', duration: 480, description: 'Cultivate feelings of compassion' },
  { id: 4, name: 'Breath Awareness', duration: 300, description: 'Focus on the natural rhythm of your breath' },
  { id: 5, name: 'Sleep', duration: 900, description: 'Guided meditation for better sleep' },
];

const MeditationTracker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [selectedDuration, setSelectedDuration] = useState(300);
  const [selectedType, setSelectedType] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          const newProgress = ((selectedDuration - newTime) / selectedDuration) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      // Session completed
      const newSession = {
        id: Date.now(),
        type: selectedType?.name || 'Custom',
        duration: selectedDuration,
        date: new Date().toISOString()
      };
      setSessions([newSession, ...sessions]);
      setTotalMinutes(prev => prev + Math.floor(selectedDuration / 60));
      setIsPlaying(false);
      // Check and update streak
      updateStreak();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, selectedDuration, selectedType, sessions]);

  const updateStreak = () => {
    // Simple streak logic - in a real app, you'd check against actual dates
    setCurrentStreak(prev => prev + 1);
  };

  const handleDurationChange = (event, newValue) => {
    setSelectedDuration(newValue * 60); // Convert minutes to seconds
    setTimeLeft(newValue * 60);
    setProgress(0);
    setSelectedType(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedDuration(type.duration);
    setTimeLeft(type.duration);
    setProgress(0);
  };

  const togglePlayPause = () => {
    if (timeLeft === 0) {
      // Reset if at end
      setTimeLeft(selectedDuration);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setTimeLeft(selectedDuration);
    setProgress(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Meditation</Typography>
      
      <Grid container spacing={3}>
        {/* Timer Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {selectedType?.name || 'Select a meditation type or set custom time'}
              </Typography>
              
              <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={progress} 
                  size={250} 
                  thickness={2}
                  sx={{ color: 'primary.main' }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h2" component="div">
                    {formatTime(timeLeft)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedType?.description || 'Custom meditation'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <IconButton 
                  color="primary" 
                  size="large"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <PauseIcon fontSize="large" /> : <PlayIcon fontSize="large" />}
                </IconButton>
                <IconButton 
                  color="secondary" 
                  size="large"
                  onClick={handleStop}
                  disabled={!isPlaying && timeLeft === selectedDuration}
                >
                  <StopIcon fontSize="large" />
                </IconButton>
              </Box>

              <Box sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
                <Typography gutterBottom>Duration: {selectedDuration / 60} minutes</Typography>
                <Slider
                  value={selectedDuration / 60}
                  onChange={handleDurationChange}
                  min={1}
                  max={30}
                  step={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value} min`}
                  disabled={isPlaying}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Today's Session</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Time Meditated:</Typography>
                <Typography fontWeight="bold">
                  {formatTime(selectedDuration - timeLeft)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Current Streak:</Typography>
                <Typography fontWeight="bold">
                  {currentStreak} days
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total Sessions:</Typography>
                <Typography fontWeight="bold">
                  {sessions.length}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Start</Typography>
              <List>
                {meditationTypes.map((type) => (
                  <ListItem 
                    key={type.id} 
                    button 
                    onClick={() => handleTypeSelect(type)}
                    selected={selectedType?.id === type.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                        }
                      }
                    }}
                  >
                    <ListItemText
                      primary={type.name}
                      secondary={`${type.duration / 60} min`}
                    />
                    {selectedType?.id === type.id && (
                      <CheckCircleIcon color="primary" />
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Sessions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Sessions</Typography>
              {sessions.length > 0 ? (
                <List>
                  {sessions.map((session) => (
                    <ListItem key={session.id} divider>
                      <ListItemText
                        primary={session.type}
                        secondary={new Date(session.date).toLocaleString()}
                      />
                      <Typography>{Math.floor(session.duration / 60)} min</Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary" textAlign="center" py={2}>
                  No meditation sessions recorded yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeditationTracker;