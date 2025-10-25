// src/components/common/BottomNav.jsx
import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, CalendarMonth, SelfImprovement, Person } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <Home />, path: '/' },
    { label: 'Habits', icon: <SelfImprovement />, path: '/habits' },
    { label: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
    { label: 'Profile', icon: <Person />, path: '/profile' },
  ];

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
        value={navItems.findIndex(item => location.pathname === item.path)}
        onChange={(_, newValue) => {
          navigate(navItems[newValue].path);
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