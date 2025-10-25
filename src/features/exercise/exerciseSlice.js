// src/features/exercise/exerciseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccess, showError } from '../../utils/toast';

// Mock API calls
const fakeApi = {
  getExercises: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Running',
            duration: 30,
            calories: 300,
            date: '2023-05-15',
            notes: 'Morning run in the park',
          },
          {
            id: '2',
            name: 'Cycling',
            duration: 45,
            calories: 400,
            date: '2023-05-14',
            notes: 'Evening cycling session',
          },
        ]);
      }, 500);
    });
  },
  addExercise: async (exercise) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...exercise,
          id: Math.random().toString(36).substr(2, 9),
        });
      }, 500);
    });
  },
  updateExercise: async (exercise) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(exercise);
      }, 500);
    });
  },
  deleteExercise: async (id) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  },
};

// Async thunks
export const fetchExercises = createAsyncThunk(
  'exercises/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fakeApi.getExercises();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createExercise = createAsyncThunk(
  'exercises/create',
  async (exercise, { rejectWithValue }) => {
    try {
      const response = await fakeApi.addExercise(exercise);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExercise = createAsyncThunk(
  'exercises/update',
  async (exercise, { rejectWithValue }) => {
    try {
      const response = await fakeApi.updateExercise(exercise);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExercise = createAsyncThunk(
  'exercises/delete',
  async (id, { rejectWithValue }) => {
    try {
      await fakeApi.deleteExercise(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  exercises: [],
  loading: false,
  error: null,
};

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch exercises
    builder.addCase(fetchExercises.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = action.payload;
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to fetch exercises');
    });

    // Add exercise
    builder.addCase(createExercise.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createExercise.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises.push(action.payload);
      showSuccess('Exercise added successfully');
    });
    builder.addCase(createExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to add exercise');
    });

    // Update exercise
    builder.addCase(updateExercise.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateExercise.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.exercises.findIndex(
        (ex) => ex.id === action.payload.id
      );
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
      showSuccess('Exercise updated successfully');
    });
    builder.addCase(updateExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to update exercise');
    });

    // Delete exercise
    builder.addCase(deleteExercise.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteExercise.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = state.exercises.filter(
        (ex) => ex.id !== action.payload
      );
      showSuccess('Exercise deleted successfully');
    });
    builder.addCase(deleteExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to delete exercise');
    });
  },
});

export default exerciseSlice.reducer;

// Selectors
export const selectAllExercises = (state) => state.exercises.exercises;
export const selectExerciseById = (state, exerciseId) =>
  state.exercises.exercises.find((ex) => ex.id === exerciseId);
export const selectExercisesByDate = (state, date) =>
  state.exercises.exercises.filter((ex) => ex.date === date);
export const selectExercisesLoading = (state) => state.exercises.loading;
export const selectExercisesError = (state) => state.exercises.error;