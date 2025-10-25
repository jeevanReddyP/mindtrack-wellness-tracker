import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import { EmojiEvents, TrendingUp, Lightbulb } from '@mui/icons-material';

const insights = [
  {
    icon: <TrendingUp color="primary" />,
    text: 'You\'re on a 3-day meditation streak!',
  },
  {
    icon: <EmojiEvents color="secondary" />,
    text: 'Complete 2 more days to earn the "Consistency" badge',
  },
  {
    icon: <Lightbulb color="warning" />,
    text: 'Try adding a morning routine to boost your productivity',
  },
];

const InsightsCard = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="600" mb={2}>
        Daily Insights
      </Typography>
      <List dense>
        {insights.map((insight, index) => (
          <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>{insight.icon}</ListItemIcon>
            <Typography variant="body2" color="text.secondary">
              {insight.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default InsightsCard;