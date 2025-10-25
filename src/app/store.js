// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import your reducers here
import authReducer from '../features/auth/authSlice';
import exerciseReducer from '../features/exercise/exerciseSlice';
import waterReducer from '../features/water/waterSlice';
import journalReducer from '../features/journal/journalSlice';
import meditationReducer from '../features/meditation/meditationSlice';
import habitsReducer from '../redux/habitSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  exercise: exerciseReducer,
  water: waterReducer,
  journal: journalReducer,
  meditation: meditationReducer,
  habits: habitsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth for now
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);