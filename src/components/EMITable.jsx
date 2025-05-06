import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from '@mui/material';

const EMITable = ({ schedule }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 2,
        boxShadow: 3,
        overflowX: 'auto',
      }}
    >
      <Table size="small" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: '#1976d2' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Month</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Principal</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Interest</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? 'action.hover' : 'background.paper',
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.principal.toFixed(2)}</TableCell>
              <TableCell>{row.interest.toFixed(2)}</TableCell>
              <TableCell>{row.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EMITable;
