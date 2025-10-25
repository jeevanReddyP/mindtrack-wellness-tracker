// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Typography,
  Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarMonth as CalendarIcon,
  SelfImprovement as HabitsIcon,
  Person as ProfileIcon,
  FitnessCenter as ExerciseIcon,
  MenuBook as JournalIcon,
  WaterDrop as WaterIcon
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Habits', icon: <HabitsIcon />, path: '/habits' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Water', icon: <WaterIcon />, path: '/water' },
  { text: 'Exercise', icon: <ExerciseIcon />, path: '/exercise' },
  { text: 'Journal', icon: <JournalIcon />, path: '/journal' },
  { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
];

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6">MindTracker</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={isMobile ? onClose : undefined}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;