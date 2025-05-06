

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   TablePagination,
//   CircularProgress,
// } from '@mui/material';

// const ExchangeRates = ({ baseCurrency, emiAmount }) => {
//   const [exchangeRates, setExchangeRates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchExchangeRates = async () => {
//     try {
//       const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
//       const response = await axios.get(
//         `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
//       );
//       const rates = response.data.conversion_rates;
//       const formattedRates = Object.entries(rates).map(([currency, rate]) => ({
//         currency,
//         rate,
//         convertedEMI: (emiAmount * rate).toFixed(2),
//       }));
//       setExchangeRates(formattedRates);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch exchange rates');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExchangeRates();
//   }, [baseCurrency]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   if (loading) return <CircularProgress sx={{ mt: 4 }} />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Paper sx={{ mt: 4, p: 2 }}>
//     <Typography variant="h6" gutterBottom>
//       Current EMI in 160+ Currencies (Base: {baseCurrency})
//     </Typography>
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Currency</strong></TableCell>
//             <TableCell><strong>Exchange Rate</strong></TableCell>
//             <TableCell><strong>Converted EMI</strong></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {exchangeRates
//             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             .map((row) => (
//               <TableRow key={row.currency}>
//                 <TableCell>{row.currency}</TableCell>
//                 <TableCell>{row.rate}</TableCell>
//                 <TableCell>{row.convertedEMI}</TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <TablePagination
//       component="div"
//       count={exchangeRates.length}
//       page={page}
//       onPageChange={handleChangePage}
//       rowsPerPage={rowsPerPage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//       rowsPerPageOptions={[10, 25, 50, 100]}
//     />
//   </Paper>
//   );
// };

// export default ExchangeRates;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  CircularProgress,
  Box,
} from '@mui/material';

const ExchangeRates = ({ baseCurrency = 'USD', emiAmount = 500 }) => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchExchangeRates = async () => {
    try {
      const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
      );
      const rates = response.data.conversion_rates;
      const formattedRates = Object.entries(rates).map(([currency, rate]) => ({
        currency,
        rate,
        convertedEMI: (emiAmount * rate).toFixed(2),
      }));
      setExchangeRates(formattedRates);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch exchange rates');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Current EMI in 160+ Currencies (Base: {baseCurrency})
      </Typography>

      <TableContainer component={Box} sx={{ mt: 2, borderRadius: 2, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.5 }}>Currency</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.5 }}>Exchange Rate</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.5 }}>Converted EMI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchangeRates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.currency}
                  sx={{
                    backgroundColor: index % 2 === 0 ? 'action.hover' : 'background.paper',
                  }}
                >
                  <TableCell sx={{ py: 1.5 }}>{row.currency}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>{row.rate}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>{row.convertedEMI}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={exchangeRates.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        sx={{ mt: 2 }}
      />
    </Paper>
  );
};

export default ExchangeRates;


