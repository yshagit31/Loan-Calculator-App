export const useEMICalculator = (P, annualRate, N) => {
    const R = annualRate / 12 / 100;
    const EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    return isFinite(EMI) ? EMI.toFixed(2) : 0;
  };