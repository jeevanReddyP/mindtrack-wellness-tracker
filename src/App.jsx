// src/App.jsx
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import Dashboard from './pages/Dashboard';
import HabitsPage from './pages/HabitsPage';
import MeditationTracker from './pages/MeditationTracker';
import CalendarView from './pages/CalendarView';
import Profile from './pages/Profile';
import BottomNav from './components/common/BottomNav';
import Sidebar from './components/Sidebar';

// Theme configuration
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? {
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      background: { default: '#f5f5f5', paper: '#ffffff' },
    } : {
      primary: { main: '#90caf9' },
      secondary: { main: '#f48fb1' },
      background: { default: '#121212', paper: '#1e1e1e' },
      text: { primary: '#ffffff', secondary: 'rgba(255, 255, 255, 0.7)' },
    }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 500 },
    h2: { fontWeight: 500 },
    h3: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ThemeProvider>
      <AppContent isMobile={isMobile} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </ThemeProvider>
  );
}

function AppContent({ isMobile, mobileOpen, setMobileOpen }) {
  const { mode } = useThemeContext();
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {!isMobile && <Sidebar />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3 },
              width: { sm: `calc(100% - 240px)` },
              marginLeft: { sm: '240px' },
              pb: 8,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/meditation" element={<MeditationTracker />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Box>
          {isMobile && <BottomNav />}
        </Box>
      </Router>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode}
      />
    </MUIThemeProvider>
  );
}

export default App;