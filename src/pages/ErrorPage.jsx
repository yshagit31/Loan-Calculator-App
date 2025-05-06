import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We're sorry, but an unexpected error occurred.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
