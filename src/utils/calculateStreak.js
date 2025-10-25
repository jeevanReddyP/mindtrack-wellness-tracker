export const calculateStreak = (habit) => {
  if (!habit.lastCompleted) return 0;
  
  const lastCompleted = new Date(habit.lastCompleted);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Reset streak if last completed is more than 1 day ago
  if (lastCompleted.toDateString() === yesterday.toDateString()) {
    return habit.currentStreak + 1;
  } else if (lastCompleted.toDateString() !== today.toDateString()) {
    return 1; // Reset to 1 for a new streak
  }
  
  return habit.currentStreak;
};

export const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};