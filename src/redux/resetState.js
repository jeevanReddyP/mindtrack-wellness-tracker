export const resetHabitsState = () => {
  try {
    localStorage.removeItem('habitsState');
    window.location.reload(); // Reload to reset the app with initial state
  } catch (err) {
    console.error('Failed to reset state', err);
  }
};

// Usage: Call resetHabitsState() when you want to reset the application state