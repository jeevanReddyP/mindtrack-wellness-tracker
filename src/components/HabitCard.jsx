import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { CheckCircle, MoreVert } from '@mui/icons-material';

const HabitCard = ({ habit }) => {
  const progress = (habit.currentStreak / habit.target) * 100;

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        '&:last-child': { mb: 0 },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#e3f2fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            {habit.icon}
          </Box>
          <Box flexGrow={1}>
            <Typography variant="subtitle1" fontWeight="500">
              {habit.name}
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Box width="100%" mr={2}>
                <LinearProgress
                  variant="determinate"
                  value={progress > 100 ? 100 : progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      bgcolor: '#58cc02',
                    },
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {habit.currentStreak}/{habit.target}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Chip
              label={`${Math.round(progress)}%`}
              size="small"
              sx={{
                bgcolor: 'rgba(88, 204, 2, 0.1)',
                color: '#58cc02',
                fontWeight: '600',
                mr: 1,
              }}
            />
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HabitCard;