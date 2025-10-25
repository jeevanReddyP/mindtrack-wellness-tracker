// Example API service functions
export const fetchHabits = async () => {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        habits: [
          {
            id: 1,
            name: 'Meditation',
            icon: '🧘‍♂️',
            currentStreak: 3,
            target: 7,
            lastCompleted: '2023-10-23',
          },
          // ... other habits
        ],
      });
    }, 500);
  });
};

export const updateHabit = async (habitId, updates) => {
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, habitId, ...updates });
    }, 500);
  });
};