import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';

const BadgeCard = ({ badges }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="600" mb={2}>
        Your Badges
      </Typography>
      <Grid container spacing={2}>
        {badges.map((badge, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.4,
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: badge.earned ? '#ffd700' : '#e0e0e0',
                  color: badge.earned ? 'white' : '#9e9e9e',
                  mb: 1,
                  fontSize: '1.5rem',
                }}
              >
                {badge.earned ? badge.icon : '🔒'}
              </Avatar>
              <Typography variant="caption" fontSize="0.7rem">
                {badge.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BadgeCard;