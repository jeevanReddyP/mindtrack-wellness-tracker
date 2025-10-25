// src/pages/HabitsPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Divider,
  Chip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocalDrink as WaterIcon,
  FitnessCenter as ExerciseIcon,
  SelfImprovement as MeditationIcon
} from '@mui/icons-material';

const habitCategories = [
  { id: 1, name: 'Health', color: 'primary' },
  { id: 2, name: 'Fitness', color: 'secondary' },
  { id: 3, name: 'Mindfulness', color: 'success' },
  { id: 4, name: 'Productivity', color: 'info' },
];

const habitIcons = {
  'Water': <WaterIcon />,
  'Exercise': <ExerciseIcon />,
  'Meditation': <MeditationIcon />,
};

const HabitsPage = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink water', completed: false, category: 1, frequency: 'daily', currentStreak: 5 },
    { id: 2, name: 'Morning workout', completed: true, category: 2, frequency: 'weekdays', currentStreak: 12 },
    { id: 3, name: 'Meditate', completed: false, category: 3, frequency: 'daily', currentStreak: 8 },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [editingHabit, setEditingHabit] = useState(null);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (newHabit.trim() === '') return;
    
    if (editingHabit) {
      setHabits(habits.map(habit => 
        habit.id === editingHabit.id 
          ? { ...habit, name: newHabit, category: selectedCategory } 
          : habit
      ));
      setEditingHabit(null);
    } else {
      const newHabitObj = {
        id: Date.now(),
        name: newHabit,
        completed: false,
        category: selectedCategory,
        frequency: 'daily',
        currentStreak: 0
      };
      setHabits([...habits, newHabitObj]);
    }
    setNewHabit('');
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const startEditing = (habit) => {
    setEditingHabit(habit);
    setNewHabit(habit.name);
    setSelectedCategory(habit.category);
  };

  const getCategoryById = (id) => {
    return habitCategories.find(cat => cat.id === id) || {};
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Habits</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingHabit(null);
            setNewHabit('');
            setSelectedCategory(1);
          }}
        >
          Add Habit
        </Button>
      </Box>

      {/* Add/Edit Habit Form */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editingHabit ? 'Edit Habit' : 'Add New Habit'}
        </Typography>
        <Box component="form" onSubmit={addHabit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Enter a new habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
            >
              {habitCategories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!newHabit.trim()}
          >
            {editingHabit ? 'Update' : 'Add'}
          </Button>
          {editingHabit && (
            <Button 
              variant="outlined" 
              onClick={() => {
                setEditingHabit(null);
                setNewHabit('');
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>

      {/* Habits List */}
      <Card>
        <CardContent>
          <List>
            {habits.map((habit) => (
              <React.Fragment key={habit.id}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <Checkbox
                      checked={habit.completed}
                      onChange={() => toggleHabit(habit.id)}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon color="primary" />}
                    />
                    <ListItemText
                      primary={habit.name}
                      secondary={`${getCategoryById(habit.category).name} • ${habit.currentStreak} day${habit.currentStreak !== 1 ? 's' : ''}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                      <Chip
                        label={getCategoryById(habit.category).name}
                        size="small"
                        color={getCategoryById(habit.category).color}
                        variant="outlined"
                      />
                      <Chip
                        label={`${habit.currentStreak} day${habit.currentStreak !== 1 ? 's' : ''}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={() => startEditing(habit)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        onClick={() => deleteHabit(habit.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
            {habits.length === 0 && (
              <ListItem>
                <ListItemText 
                  primary="No habits yet" 
                  secondary="Click the 'Add Habit' button to get started"
                  sx={{ textAlign: 'center', py: 2 }}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HabitsPage;