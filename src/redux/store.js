// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './habitSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('habitsState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Failed to load state from localStorage', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('habitsState', serializedState);
  } catch (err) {
    console.warn('Failed to save state to localStorage', err);
  }
};

// Load initial state from localStorage
const persistedState = loadState();

const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
  preloadedState: persistedState,
  // Remove any thunk middleware as it's included by default
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState({
    habits: store.getState().habits
  });
});

export default store;