import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, CircularProgress, Paper } from '@mui/material';

const ExchangeRates = ({ baseCurrency, emiAmount }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${baseCurrency}`);
      setExchangeRates(response.data.conversion_rates);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch exchange rates');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6">EMI in Different Currencies</Typography>
      <Grid container spacing={2} mt={2}>
        {Object.entries(exchangeRates)
          .slice(0, 10) // Limit to 10 currencies
          .map(([currency, rate]) => {
            const convertedEMI = (emiAmount * rate).toFixed(2);
            return (
              <Grid item xs={12} sm={6} md={4} key={currency}>
                <Paper sx={{ padding: '8px' }}>
                  <Typography variant="body1">{currency}</Typography>
                  <Typography variant="body2">{convertedEMI}</Typography>
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Paper>
  );
};

export default ExchangeRates;
