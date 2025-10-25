// src/features/journal/journalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccess, showError } from '../../utils/toast';

// Mock API calls
const fakeApi = {
  getJournalEntries: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'First Entry',
            content: 'Today was a great day!',
            date: '2023-05-15',
            tags: ['happy', 'productive']
          }
        ]);
      }, 500);
    });
  },
  // Add other mock API methods as needed
};

// Async thunks
export const fetchJournalEntries = createAsyncThunk(
  'journal/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fakeApi.getJournalEntries();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add other async thunks for CRUD operations

const initialState = {
  entries: [],
  loading: false,
  error: null
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJournalEntries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJournalEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.entries = action.payload;
    });
    builder.addCase(fetchJournalEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      showError('Failed to fetch journal entries');
    });
    // Add other cases for CRUD operations
  }
});

export default journalSlice.reducer;

// Selectors
export const selectAllJournalEntries = (state) => state.journal.entries;
export const selectJournalEntryById = (state, entryId) =>
  state.journal.entries.find(entry => entry.id === entryId);
export const selectJournalLoading = (state) => state.journal.loading;
export const selectJournalError = (state) => state.journal.error;