import { useEffect, useState } from 'react';
import axios from 'axios';

export const useExchangeRates = () => {
  const [rates, setRates] = useState({ USD: 1 });

  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`)
      .then(res => setRates(res.data.conversion_rates))
      .catch(() => setRates({ USD: 1 }));
  }, []);

  return rates;
};