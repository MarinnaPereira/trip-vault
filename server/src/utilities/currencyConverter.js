export const convertCurrency = (amount, fromRate, toRate) => {
  return (amount * toRate) / fromRate;
};
