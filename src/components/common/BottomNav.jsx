import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { 
  Home, 
  CalendarMonth, 
  SelfImprovement, 
  Person, 
  FitnessCenter, 
  MenuBook, 
  WaterDrop 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <Home />, path: 'dashboard' },
    { label: 'Water', icon: <WaterDrop />, path: 'water' },
    { label: 'Exercise', icon: <FitnessCenter />, path: 'exercise' },
    { label: 'Journal', icon: <MenuBook />, path: 'journal' },
    { label: 'Habits', icon: <SelfImprovement />, path: 'habits' },
    { label: 'Calendar', icon: <CalendarMonth />, path: 'calendar' },
    { label: 'Profile', icon: <Person />, path: 'profile' },
  ];

  // Get current active item index
  const activeIndex = navItems.findIndex(item => 
    location.pathname === `/${item.path}` || 
    location.pathname.endsWith(item.path)
  );

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        display: { xs: 'block', sm: 'none' }
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={activeIndex >= 0 ? activeIndex : 0}
        onChange={(_, newValue) => {
          navigate(`/${navItems[newValue].path}`);
        }}
        sx={{
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.7rem',
            '&.Mui-selected': {
              fontSize: '0.7rem',
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction 
            key={item.path} 
            label={item.label} 
            icon={item.icon} 
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;