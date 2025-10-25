import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import WaterTracker from '../components/WaterTracker';

const WaterTrackerPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Water Tracker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your daily water intake.
        </Typography>
      </Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <WaterTracker />
      </Paper>
    </Container>
  );
};

export default WaterTrackerPage;