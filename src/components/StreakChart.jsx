import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'M', value: 3 },
  { name: 'T', value: 5 },
  { name: 'W', value: 4 },
  { name: 'T', value: 7 },
  { name: 'F', value: 6 },
  { name: 'S', value: 8 },
  { name: 'S', value: 9 },
];

const StreakChart = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="600" mb={2}>
        Weekly Progress
      </Typography>
      <Box sx={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey="value"
              fill="#58cc02"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default StreakChart;