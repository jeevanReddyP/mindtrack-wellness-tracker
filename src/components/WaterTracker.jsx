// src/components/WaterTracker.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Slider,
  TextField,
} from '@mui/material';
import {
  LocalDrink as WaterIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Opacity as WaterDropIcon,
} from '@mui/icons-material';

const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [customAmount, setCustomAmount] = useState(250);
  const dailyGoal = 2000; // in ml

  const waterAmounts = [100, 250, 500, 750, 1000];

  const addWater = (amount) => {
    setWaterIntake(prev => Math.min(prev + amount, 5000));
  };

  const removeWater = (amount) => {
    setWaterIntake(prev => Math.max(0, prev - amount));
  };

  const handleCustomAmountChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setCustomAmount(value);
  };

  const addCustomAmount = () => {
    if (customAmount > 0) {
      addWater(customAmount);
    }
  };

  const percentage = Math.min(Math.round((waterIntake / dailyGoal) * 100), 100);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <WaterIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Water Intake Tracker
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  margin: '0 auto',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#fff',
                    transform: `translateY(${100 - percentage}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  },
                }}
              >
                <Box position="relative" zIndex={1}>
                  <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#fff' }}>
                    {waterIntake}ml
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#e3f2fd' }}>
                    of {dailyGoal}ml
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                {percentage >= 100 ? 'Goal Reached! 🎉' : 'Keep it up!'}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Add
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {waterAmounts.map((amount) => (
                  <Grid item key={amount}>
                    <Button
                      variant="outlined"
                      startIcon={<WaterDropIcon />}
                      onClick={() => addWater(amount)}
                      sx={{ minWidth: '100px' }}
                    >
                      +{amount}ml
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  label="Custom Amount (ml)"
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  variant="outlined"
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={addCustomAmount}
                  disabled={!customAmount}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Today's Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ width: '100%' }}>
                  <Slider
                    value={waterIntake}
                    min={0}
                    max={dailyGoal}
                    step={50}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}ml`}
                    disabled
                  />
                </Box>
                <Box sx={{ minWidth: 60, textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    {percentage}%
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  0ml
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dailyGoal}ml
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              History
            </Typography>
            {/* Add water intake history component */}
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <WaterIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
              <Typography>No history available</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <WaterDropIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Today's Intake
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {waterIntake}ml
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round((waterIntake / dailyGoal) * 100)}% of daily goal
                  </Typography>
                </Box>
                <IconButton
                  color="error"
                  onClick={() => removeWater(100)}
                  disabled={waterIntake === 0}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
              <Button
                fullWidth
                variant="contained"
                startIcon={<WaterIcon />}
                onClick={() => addWater(250)}
              >
                Add Glass (250ml)
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Goal
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {dailyGoal}ml
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Slider
                    value={dailyGoal}
                    min={500}
                    max={4000}
                    step={100}
                    disabled
                  />
                </Box>
              </Box>
              <Button fullWidth variant="outlined">
                Edit Goal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tips for Staying Hydrated
              </Typography>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                <li style={{ marginBottom: 8 }}>Start your day with a glass of water</li>
                <li style={{ marginBottom: 8 }}>Keep a water bottle with you</li>
                <li style={{ marginBottom: 8 }}>Set reminders to drink water</li>
                <li>Eat water-rich foods like fruits and vegetables</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WaterTracker;