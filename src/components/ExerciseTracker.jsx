// src/components/ExerciseTracker.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FitnessCenter as ExerciseIcon,
  Timer as TimerIcon,
  Whatshot as CaloriesIcon,
  TrendingUp as ProgressIcon,
} from '@mui/icons-material';

const ExerciseTracker = () => {
  const [tabValue, setTabValue] = useState(0);
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Running', duration: 30, calories: 300, date: '2023-05-15' },
    { id: 2, name: 'Cycling', duration: 45, calories: 400, date: '2023-05-14' },
  ]);
  const [newExercise, setNewExercise] = useState({
    name: '',
    duration: '',
    calories: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExercise(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.duration) {
      setExercises(prev => [...prev, {
        id: Date.now(),
        ...newExercise,
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewExercise({ name: '', duration: '', calories: '' });
    }
  };

  const handleDeleteExercise = (id) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <ExerciseIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Exercise Tracker
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Exercise
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="exercise tabs"
              sx={{ mb: 2 }}
            >
              <Tab label="Today" />
              <Tab label="This Week" />
              <Tab label="History" />
            </Tabs>

            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Add New Exercise
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Exercise Name"
                    name="name"
                    value={newExercise.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Duration (min)"
                    name="duration"
                    type="number"
                    value={newExercise.duration}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Calories"
                    name="calories"
                    type="number"
                    value={newExercise.calories}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddExercise}
                    disabled={!newExercise.name || !newExercise.duration}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <List>
              {exercises.map((exercise) => (
                <React.Fragment key={exercise.id}>
                  <ListItem>
                    <ListItemText
                      primary={exercise.name}
                      secondary={`${exercise.duration} min • ${exercise.calories} cal`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => handleDeleteExercise(exercise.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TimerIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Total Exercise Time
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {exercises.reduce((sum, ex) => sum + Number(ex.duration || 0), 0)} min
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This Week
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <CaloriesIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Calories Burned
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {exercises.reduce((sum, ex) => sum + Number(ex.calories || 0), 0)} cal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This Week
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ProgressIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Progress
              </Typography>
              <Box sx={{ height: 200, backgroundColor: 'grey.100', borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExerciseTracker;