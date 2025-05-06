import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Card, CardContent, Typography, MenuItem, Select } from '@mui/material';

const CurrencyConverter = ({ emi }) => {
  const { exchangeRates, selectedCurrency, setSelectedCurrency } = useContext(GlobalContext);
  const rate = exchangeRates[selectedCurrency] || 1;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Converted EMI</Typography>
        <Typography variant="body1">
          {selectedCurrency} {(emi * rate).toFixed(2)}
        </Typography>
        <Select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
          {Object.keys(exchangeRates).map((currency) => (
            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;