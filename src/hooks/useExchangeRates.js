import { useEffect, useState } from 'react';
import axios from 'axios';

export const useExchangeRates = ({baseCurrency}) => {
  const [rates, setRates] = useState({ USD: 1 });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
   axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
    )
    // axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`)
      .then(res => setRates(res.data.conversion_rates))
      .catch(() => setRates({ USD: 1 }));
  }, []);

  return rates;
};