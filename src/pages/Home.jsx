import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Grid, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useGlobalContext } from '../context/GlobalContext';
import { useEMICalculator } from '../hooks/useEMICalculator';

const Home = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useGlobalContext();

  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const result = useEMICalculator(Number(principal), Number(rate), Number(tenure));
    setEmi(result);
  };

  return (
    <Paper
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        py: 4
      }}
    >
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Loan EMI Calculator
          </Typography>
          <Grid item>
            <Typography component="span">Dark Mode</Typography>
            <Switch checked={mode === 'dark'} onChange={toggleMode} />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Principal Amount"
              fullWidth
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Annual Interest Rate (%)"
              fullWidth
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Loan Tenure (months)"
              fullWidth
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={calculateEMI}
        >
          Calculate EMI
        </Button>

        {emi && (
          <Typography variant="h6" mt={4}>
            Monthly EMI: <strong>{emi}</strong>
          </Typography>
        )}
      </Container>
    </Paper>
  );
};

export default Home;



// import React, { useState } from 'react';
// import { Button, TextField, Grid, Typography } from '@mui/material';
// import ExchangeRates from './ExchangeRates';

// const Home = () => {
//   const [loanAmount, setLoanAmount] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [tenure, setTenure] = useState('');
//   const [emiAmount, setEmiAmount] = useState(null);
//   const [baseCurrency, setBaseCurrency] = useState('INR'); // Default base currency

//   const calculateEMI = () => {
//     const principal = parseFloat(loanAmount);
//     const annualRate = parseFloat(interestRate);
//     const months = parseInt(tenure);

//     if (!principal || !annualRate || !months) return;

//     const monthlyRate = annualRate / 12 / 100;
//     const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
//     setEmiAmount(emi.toFixed(2));
//   };

//   return (
//     <Grid container spacing={3} sx={{ padding: '16px' }}>
//       <Grid item xs={12} md={6}>
//         <Typography variant="h4" gutterBottom>
//           Loan EMI Calculator
//         </Typography>
//         <TextField
//           label="Loan Amount"
//           type="number"
//           fullWidth
//           value={loanAmount}
//           onChange={(e) => setLoanAmount(e.target.value)}
//         />
//         <TextField
//           label="Interest Rate (%)"
//           type="number"
//           fullWidth
//           value={interestRate}
//           onChange={(e) => setInterestRate(e.target.value)}
//           sx={{ marginTop: '16px' }}
//         />
//         <TextField
//           label="Tenure (months)"
//           type="number"
//           fullWidth
//           value={tenure}
//           onChange={(e) => setTenure(e.target.value)}
//           sx={{ marginTop: '16px' }}
//         />
//         <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '16px' }} onClick={calculateEMI}>
//           Calculate EMI
//         </Button>

//         {emiAmount && (
//           <Typography variant="h6" sx={{ marginTop: '16px' }}>
//             Monthly EMI: ₹{emiAmount}
//           </Typography>
//         )}
//       </Grid>

//       <Grid item xs={12} md={6}>
//         {emiAmount && <ExchangeRates baseCurrency={baseCurrency} emiAmount={emiAmount} />}
//       </Grid>
//     </Grid>
//   );
// };

// export default Home;
