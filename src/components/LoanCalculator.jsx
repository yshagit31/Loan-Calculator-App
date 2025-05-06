// components/LoanCalculator.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const LoanCalculator = ({ setSchedule, setEmi, setBaseCurrency }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [currency, setCurrency] = useState('USD');

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(term);

    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const schedule = [];
    let balance = P;

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principalComponent = emi - interest;
      balance -= principalComponent;

      schedule.push({
        month: i,
        emi: emi.toFixed(2),
        interest: interest.toFixed(2),
        principal: principalComponent.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }

    setEmi(emi);
    setSchedule(schedule);
    setBaseCurrency(currency);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
      <TextField label="Principal Amount" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
      <TextField label="Annual Interest Rate (%)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      <TextField label="Loan Term (months)" type="number" value={term} onChange={(e) => setTerm(e.target.value)} />
      <TextField label="Currency" select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {['USD', 'INR', 'EUR', 'GBP', 'JPY'].map((curr) => (
          <MenuItem key={curr} value={curr}>{curr}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={calculateEMI}>Calculate</Button>
    </Box>
  );
};

export default LoanCalculator;
