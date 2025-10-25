// src/features/meditation/meditationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccess, showError } from '../../utils/toast';

// Mock API calls
const fakeApi = {
  getMeditationSessions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            duration: 10,
            date: '2023-05-15',
            type: 'guided',
            notes: 'Felt very relaxed'
          }
        ]);
      }, 500);
    });
  },
  // Add other mock API methods as needed
};

// Async thunks
export const fetchMeditationSessions = createAsyncThunk(
  'meditation/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fakeApi.getMeditationSessions();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add other async thunks for CRUD operations

const initialState = {
  sessions: [],
  loading: false,
  error: null
};

const meditationSlice = createSlice({
  name: 'meditation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMeditationSessions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMeditationSessions.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
    });
    builder.addCase(fetchMeditationSessions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to fetch meditation sessions');
    });
    // Add other cases for CRUD operations
  }
});

export default meditationSlice.reducer;

// Selectors
export const selectAllMeditationSessions = (state) => state.meditation.sessions;
export const selectMeditationSessionById = (state, sessionId) =>
  state.meditation.sessions.find(session => session.id === sessionId);
export const selectMeditationLoading = (state) => state.meditation.loading;
export const selectMeditationError = (state) => state.meditation.error;