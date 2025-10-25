// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleColorMode, mode } = useContext(ThemeContext);

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;