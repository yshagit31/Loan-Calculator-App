import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EMIForm = ({ onCalculate }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({ principal: +principal, rate: +rate, duration: +duration });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField label="Loan Amount" value={principal} onChange={(e) => setPrincipal(e.target.value)} required />
      <TextField label="Annual Interest Rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} required />
      <TextField label="Loan Tenure (Months)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      <Button type="submit" variant="contained">Calculate</Button>
    </Box>
  );
};

export default EMIForm;