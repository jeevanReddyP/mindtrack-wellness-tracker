import { createSlice, nanoid } from '@reduxjs/toolkit';

// Validate habit object and ensure it has all required fields
const validateHabit = (habit) => {
  return {
    id: habit.id || nanoid(),
    name: String(habit.name || 'New Habit'),
    completed: Boolean(habit.completed),
    children: Array.isArray(habit.children) 
      ? habit.children.map(validateHabit) 
      : []
  };
};

// Helper function to find a habit by ID in the tree
const findHabit = (habits, id) => {
  for (const habit of habits) {
    if (habit.id === id) return habit;
    if (habit.children) {
      const found = findHabit(habit.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Helper function to find a habit's parent and index in the tree
const findHabitParent = (habits, id, parent = null) => {
  for (let i = 0; i < habits.length; i++) {
    if (habits[i].id === id) return { parent, index: i };
    if (habits[i].children) {
      const found = findHabitParent(habits[i].children, id, habits[i]);
      if (found) return found;
    }
  }
  return null;
};

const initialState = {
  habits: [
    {
      id: '1',
      name: 'Health & Fitness',
      completed: false,
      children: [
        {
          id: '1-1',
          name: 'Morning Run',
          completed: false,
          children: []
        },
        {
          id: '1-2',
          name: 'Evening Workout',
          completed: false,
          children: []
        }
      ]
    },
    {
      id: '2',
      name: 'Learning',
      completed: false,
      children: [
        {
          id: '2-1',
          name: 'Read Technical Book',
          completed: false,
          children: []
        }
      ]
    }
  ],
  streak: {
    current: 7,
    longest: 14,
    totalDays: 42,
  },
  badges: [
    { id: 1, name: 'Early Bird', icon: '🌅', earned: true },
    { id: 2, name: 'Week Warrior', icon: '🏆', earned: true },
    { id: 3, name: 'Perfect Week', icon: '⭐', earned: false },
    { id: 4, name: 'Consistency', icon: '🔥', earned: false },
    { id: 5, name: 'Mindful', icon: '🧠', earned: true },
    { id: 6, name: 'Disciplined', icon: '💯', earned: false },
  ],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: {
      reducer(state, action) {
        const { parentId, name } = action.payload;
        const newHabit = validateHabit({
          id: nanoid(),
          name,
          completed: false,
          children: []
        });

        if (!parentId) {
          // Add to root level
          state.habits.push(newHabit);
        } else {
          // Add as child to parent
          const parent = findHabit(state.habits, parentId);
          if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(newHabit);
          }
        }
      },
      prepare(parentId, name) {
        return { 
          payload: { 
            parentId, 
            name: String(name || 'New Habit') 
          } 
        };
      },
    },
    deleteHabit: (state, action) => {
      const { parent, index } = findHabitParent(state.habits, action.payload) || {};
      if (parent) {
        parent.children.splice(index, 1);
      } else {
        // If no parent found and index exists, it's a root habit
        const rootIndex = state.habits.findIndex(h => h.id === action.payload);
        if (rootIndex !== -1) {
          state.habits.splice(rootIndex, 1);
        }
      }
    },
    toggleHabitComplete: (state, action) => {
      const habit = findHabit(state.habits, action.payload);
      if (habit) {
        habit.completed = !habit.completed;
        
        // Toggle all children's completion status
        const toggleChildren = (habits, completed) => {
          habits.forEach(child => {
            child.completed = completed;
            if (child.children) {
              toggleChildren(child.children, completed);
            }
          });
        };
        
        if (habit.children) {
          toggleChildren(habit.children, habit.completed);
        }
        
        // Update streak
        if (habit.completed) {
          state.streak.current += 1;
          if (state.streak.current > state.streak.longest) {
            state.streak.longest = state.streak.current;
          }
          state.streak.totalDays += 1;
        } else {
          state.streak.current = Math.max(0, state.streak.current - 1);
          state.streak.totalDays = Math.max(0, state.streak.totalDays - 1);
        }
      }
    },
    completeHabit: (state, action) => {
      const habit = findHabit(state.habits, action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
  },
});

export const { addHabit, deleteHabit, toggleHabitComplete, completeHabit } = habitSlice.actions;

export default habitSlice.reducer;