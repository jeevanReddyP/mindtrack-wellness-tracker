import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Checkbox } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

const HabitTree = ({ habits = [], onAddHabit, onDeleteHabit, onToggleComplete }) => {
  const [expanded, setExpanded] = useState({});
  const [newHabitName, setNewHabitName] = useState('');
  const [addingHabitFor, setAddingHabitFor] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddHabit = (parentId, e) => {
    e?.stopPropagation();
    if (!newHabitName.trim()) return;
    
    onAddHabit(parentId, newHabitName);
    setNewHabitName('');
    setAddingHabitFor(null);
    
    // Auto-expand the parent when adding a new habit
    if (parentId) {
      setExpanded(prev => ({
        ...prev,
        [parentId]: true
      }));
    }
  };

  const renderHabits = (habits, level = 0) => {
    return habits.map(habit => (
      <Box key={habit.id} sx={{ ml: level * 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 0.5,
            '&:hover': {
              bgcolor: 'action.hover',
              borderRadius: 1,
            }
          }}
        >
          {habit.children && habit.children.length > 0 ? (
            <IconButton 
              size="small" 
              onClick={() => toggleExpand(habit.id)}
              sx={{ p: 0.5 }}
            >
              {expanded[habit.id] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </IconButton>
          ) : (
            <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          )}
          
          <Checkbox
            size="small"
            checked={habit.completed}
            onChange={() => onToggleComplete(habit.id)}
            onClick={(e) => e.stopPropagation()}
          />
          
          <Typography 
            variant="body1" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: habit.completed ? 'line-through' : 'none',
              color: habit.completed ? 'text.secondary' : 'text.primary',
              ml: 0.5
            }}
          >
            {habit.name}
          </Typography>
          
          <Box>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                setAddingHabitFor(addingHabitFor === habit.id ? null : habit.id);
              }}
              sx={{ p: 0.5 }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            
            {level > 0 && (
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteHabit(habit.id);
                }}
                sx={{ p: 0.5 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        
        {addingHabitFor === habit.id && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, mb: 1 }}>
            <TextField
              size="small"
              placeholder="New habit name"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddHabit(habit.id);
                } else if (e.key === 'Escape') {
                  setAddingHabitFor(null);
                  setNewHabitName('');
                }
              }}
              autoFocus
              fullWidth
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <IconButton 
              size="small" 
              onClick={() => handleAddHabit(habit.id)}
              disabled={!newHabitName.trim()}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
        
        {expanded[habit.id] && habit.children && (
          <Box sx={{ ml: 2 }}>
            {renderHabits(habit.children, level + 1)}
          </Box>
        )}
      </Box>
    ));
  };

  return (
    <Box>
      {habits.length === 0 ? (
        <Typography color="textSecondary" sx={{ fontStyle: 'italic' }}>
          No habits yet. Add your first habit!
        </Typography>
      ) : (
        renderHabits(habits)
      )}
      
      {!habits.length || (!addingHabitFor && !habits.some(h => h.id === addingHabitFor)) && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => setAddingHabitFor('root')}
            sx={{ p: 0.5 }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{ ml: 0.5, cursor: 'pointer' }}
            onClick={() => setAddingHabitFor('root')}
          >
            Add habit
          </Typography>
        </Box>
      )}
      
      {addingHabitFor === 'root' && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <TextField
            size="small"
            placeholder="New habit name"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddHabit(null);
              } else if (e.key === 'Escape') {
                setAddingHabitFor(null);
                setNewHabitName('');
              }
            }}
            autoFocus
            fullWidth
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <IconButton 
            size="small" 
            onClick={() => handleAddHabit(null)}
            disabled={!newHabitName.trim()}
          >
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default HabitTree;