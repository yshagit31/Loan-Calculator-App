import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Box,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const Navbar = () => {
  const { mode, toggleMode } = useGlobalContext();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          Loan Calculator
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/exchange-rates">
            Exchange Rates
          </Button>
          <Typography variant="body2" component="span">
            {mode === 'dark' ? 'Dark' : 'Light'}
          </Typography>
          <Switch checked={mode === 'dark'} onChange={toggleMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
