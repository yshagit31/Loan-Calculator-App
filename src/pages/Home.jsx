import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useGlobalContext } from '../context/GlobalContext';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { useExchangeRates } from '../hooks/useExchangeRates';

import EMIForm from '../components/EMIForm';
import EMITable from '../components/EMITable';

const Home = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useGlobalContext();

  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');

  const rates = useExchangeRates({ baseCurrency });

  const handleCalculate = ({ principal, rate, duration }) => {
    const R = rate / 12 / 100;
    const emi = useEMICalculator(principal, rate, duration);
    setEmi(emi);

    const schedule = [];
    let balance = principal;

    for (let i = 0; i < duration; i++) {
      const interest = balance * R;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      schedule.push({
        principal: principalPaid,
        interest: interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    setSchedule(schedule);
  };

  const displayCurrencies = ['USD', 'INR', 'EUR', 'GBP'];

  return (
    <Paper
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        py: 4,
      }}
    >
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Loan EMI Calculator
          </Typography>
          <Grid item>
          </Grid>
        </Grid>

        <EMIForm onCalculate={handleCalculate} />

        {emi && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Base Currency</InputLabel>
                  <Select
                    value={baseCurrency}
                    label="Base Currency"
                    onChange={(e) => setBaseCurrency(e.target.value)}
                  >
                    {['USD', 'INR', 'EUR', 'GBP', 'JPY'].map((cur) => (
                      <MenuItem key={cur} value={cur}>
                        {cur}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">EMI in Various Currencies:</Typography>
              {displayCurrencies.map((cur) => (
                <Typography key={cur}>
                  {cur}: {(emi * (rates[cur] || 1)).toFixed(2)}
                </Typography>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              EMI Payment Schedule:
            </Typography>
            <EMITable schedule={schedule} />
          </Box>
        )}
      </Container>
    </Paper>
  );
};

export default Home;
