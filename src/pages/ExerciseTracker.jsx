import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
  Grid,
  Chip,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  FitnessCenter as FitnessIcon,
  DirectionsRun as CardioIcon,
  SelfImprovement as YogaIcon,
  Timer as TimerIcon,
  FitnessCenter as FitnessCenterIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  TimerOutlined as TimerOutlinedIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subDays, isToday, isYesterday } from 'date-fns';

const exerciseTypes = [
  { id: 'strength', name: 'Strength Training', icon: <FitnessIcon />, color: 'primary' },
  { id: 'cardio', name: 'Cardio', icon: <CardioIcon />, color: 'secondary' },
  { id: 'yoga', name: 'Yoga', icon: <YogaIcon />, color: 'success' },
  { id: 'hiit', name: 'HIIT', icon: <TimerOutlinedIcon />, color: 'warning' },
  { id: 'other', name: 'Other', icon: <FitnessCenterIcon />, color: 'info' },
];

const ExerciseTracker = () => {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [formData, setFormData] = useState({
    type: 'strength',
    name: '',
    duration: 30,
    calories: 200,
    notes: '',
    date: new Date(),
  });

  // Load exercises from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('exercises');
    if (saved) {
      setExercises(JSON.parse(saved));
    }
  }, []);

  // Save exercises to localStorage
  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setExercises(exercises.map(ex => 
        ex.id === editingId ? { ...formData, id: editingId } : ex
      ));
      setEditingId(null);
    } else {
      const newExercise = {
        ...formData,
        id: Date.now().toString(),
        date: formData.date || new Date()
      };
      setExercises([...exercises, newExercise]);
    }
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'strength',
      name: '',
      duration: 30,
      calories: 200,
      notes: '',
      date: new Date(),
    });
  };

  const handleEdit = (exercise) => {
    setFormData(exercise);
    setEditingId(exercise.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      // Save the completed exercise
      const newExercise = {
        id: Date.now().toString(),
        type: 'other',
        name: 'Custom Workout',
        duration: Math.floor(timer / 60), // Convert seconds to minutes
        calories: Math.floor(timer * 0.1), // Rough estimate
        notes: 'Tracked with timer',
        date: new Date(),
      };
      setExercises([...exercises, newExercise]);
      setTimer(0);
    } else {
      setIsRunning(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredExercises = exercises.filter(exercise => {
    const exerciseDate = new Date(exercise.date);
    const now = new Date();
    
    if (dateRange === 'today') {
      return isToday(exerciseDate);
    } else if (dateRange === 'yesterday') {
      return isYesterday(exerciseDate);
    } else if (dateRange === 'week') {
      const weekAgo = subDays(now, 7);
      return exerciseDate >= weekAgo;
    } else if (dateRange === 'month') {
      const monthAgo = subDays(now, 30);
      return exerciseDate >= monthAgo;
    }
    return true;
  }).filter(exercise => 
    filter === 'all' || exercise.type === filter
  );

  const totalDuration = filteredExercises.reduce((sum, ex) => sum + Number(ex.duration), 0);
  const totalCalories = filteredExercises.reduce((sum, ex) => sum + Number(ex.calories), 0);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Exercise Tracker</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            resetForm();
          }}
        >
          {showForm ? 'Cancel' : 'Add Exercise'}
        </Button>
      </Box>

      {/* Timer Card */}
      <Card sx={{ mb: 3, bgcolor: 'background.paper' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Typography variant="h6" gutterBottom>
              Workout Timer
            </Typography>
            <Typography variant="h3" mb={2}>
              {formatTime(timer)}
            </Typography>
            <Button
              variant="contained"
              color={isRunning ? 'secondary' : 'primary'}
              onClick={toggleTimer}
              startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
              size="large"
            >
              {isRunning ? 'Stop & Save' : 'Start Workout'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter by Type"
          >
            <MenuItem value="all">All Types</MenuItem>
            {exerciseTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                <Box display="flex" alignItems="center" gap={1}>
                  {type.icon}
                  {type.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={dateRange}
          exclusive
          onChange={(e, newRange) => newRange && setDateRange(newRange)}
          size="small"
        >
          <ToggleButton value="today">Today</ToggleButton>
          <ToggleButton value="yesterday">Yesterday</ToggleButton>
          <ToggleButton value="week">This Week</ToggleButton>
          <ToggleButton value="month">This Month</ToggleButton>
          <ToggleButton value="all">All Time</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Total Workouts
            </Typography>
            <Typography variant="h4">{filteredExercises.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Total Duration
            </Typography>
            <Typography variant="h4">{totalDuration} min</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Calories Burned
            </Typography>
            <Typography variant="h4">{totalCalories}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Avg. Duration
            </Typography>
            <Typography variant="h4">
              {filteredExercises.length > 0 
                ? Math.round(totalDuration / filteredExercises.length) 
                : 0} min
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Add/Edit Form */}
      {showForm && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Exercise Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      label="Exercise Type"
                      required
                    >
                      {exerciseTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {type.icon}
                            {type.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Exercise Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Duration (minutes)</InputLabel>
                    <Select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      label="Duration (minutes)"
                    >
                      {[5, 10, 15, 20, 30, 45, 60, 75, 90, 120].map((min) => (
                        <MenuItem key={min} value={min}>
                          {min} min
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Calories</InputLabel>
                    <Select
                      name="calories"
                      value={formData.calories}
                      onChange={handleInputChange}
                      label="Calories"
                    >
                      {[50, 100, 150, 200, 300, 400, 500, 750, 1000].map((cal) => (
                        <MenuItem key={cal} value={cal}>
                          {cal} cal
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date"
                      value={formData.date}
                      onChange={(date) => 
                        setFormData({ ...formData, date })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Notes (Optional)"
                    name="notes"
                    multiline
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {editingId ? 'Update' : 'Add'} Exercise
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Exercise List */}
      <Card>
        <CardContent>
          {filteredExercises.length > 0 ? (
            <List>
              {filteredExercises.map((exercise) => {
                const exerciseType = exerciseTypes.find(t => t.id === exercise.type) || exerciseTypes[0];
                return (
                  <React.Fragment key={exercise.id}>
                    <ListItem
                      secondaryAction={
                        <Box display="flex" gap={1}>
                          <IconButton
                            edge="end"
                            onClick={() => handleEdit(exercise)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDelete(exercise.id)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: `${exerciseType.color}.light`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: `${exerciseType.color}.contrastText`,
                          }}
                        >
                          {exerciseType.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={exercise.name}
                        secondary={
                          <>
                            <Box component="span" display="block">
                              {exerciseType.name} • {exercise.duration} min • {exercise.calories} cal
                            </Box>
                            {exercise.notes && (
                              <Box
                                component="span"
                                sx={{
                                  display: 'block',
                                  fontSize: '0.8rem',
                                  color: 'text.secondary',
                                  mt: 0.5,
                                }}
                              >
                                {exercise.notes}
                              </Box>
                            )}
                            <Box
                              component="span"
                              sx={{
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                display: 'block',
                                mt: 0.5,
                              }}
                            >
                              {format(new Date(exercise.date), 'MMM d, yyyy h:mm a')}
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                );
              })}
            </List>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
              textAlign="center"
            >
              <TimerIcon color="action" sx={{ fontSize: 60, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No exercises recorded yet
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={3}>
                {filter === 'all' && dateRange === 'all'
                  ? 'Start tracking your first workout!'
                  : 'No exercises match your current filters.'}
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowForm(true)}
              >
                Add Exercise
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExerciseTracker;