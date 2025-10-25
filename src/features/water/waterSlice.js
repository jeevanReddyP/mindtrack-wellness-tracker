// src/features/water/waterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccess, showError } from '../../utils/toast';

// Mock API calls
const fakeApi = {
  getWaterIntake: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          current: 1800, // in ml
          goal: 2500,    // in ml
          history: [
            { date: '2023-05-15', amount: 2000 },
            { date: '2023-05-14', amount: 2500 },
            { date: '2023-05-13', amount: 1800 },
          ]
        });
      }, 500);
    });
  },
  updateWaterIntake: async (amount) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(amount);
      }, 500);
    });
  },
  updateWaterGoal: async (goal) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(goal);
      }, 500);
    });
  }
};

// Async thunks
export const fetchWaterData = createAsyncThunk(
  'water/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await fakeApi.getWaterIntake();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/add',
  async (amount, { rejectWithValue }) => {
    try {
      return await fakeApi.updateWaterIntake(amount);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setWaterGoal = createAsyncThunk(
  'water/setGoal',
  async (goal, { rejectWithValue }) => {
    try {
      return await fakeApi.updateWaterGoal(goal);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  current: 0,
  goal: 2500, // Default 2.5L
  history: [],
  loading: false,
  error: null
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch water data
    builder.addCase(fetchWaterData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWaterData.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.current;
      state.goal = action.payload.goal;
      state.history = action.payload.history;
    });
    builder.addCase(fetchWaterData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to fetch water data');
    });

    // Add water
    builder.addCase(addWater.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addWater.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
      showSuccess('Water intake updated');
    });
    builder.addCase(addWater.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to update water intake');
    });

    // Set water goal
    builder.addCase(setWaterGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(setWaterGoal.fulfilled, (state, action) => {
      state.loading = false;
      state.goal = action.payload;
      showSuccess('Daily water goal updated');
    });
    builder.addCase(setWaterGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to update water goal');
    });
  }
});

export default waterSlice.reducer;

// Selectors
export const selectCurrentWater = (state) => state.water.current;
export const selectWaterGoal = (state) => state.water.goal;
export const selectWaterHistory = (state) => state.water.history;
export const selectWaterLoading = (state) => state.water.loading;
export const selectWaterError = (state) => state.water.error;