import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { CURRENCY_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD'); // Default base currency
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  const fetchExchangeRates = async baseCurrency => {
    const storedData = await AsyncStorage.getItem('exchangeRates');
    const lastFetched = storedData ? JSON.parse(storedData).lastFetched : null;
    const now = new Date();

    if (
      lastFetched &&
      new Date(lastFetched).toDateString() === now.toDateString()
    ) {
      setExchangeRates(JSON.parse(storedData).data);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${CURRENCY_API_KEY}&base_currency=${baseCurrency}`,
      );
      if (!response || !response.data || !response.data.data) {
        throw new Error('API response is not valid.');
      }
      const newData = {
        lastFetched: now,
        data: response.data.data,
      };
      await AsyncStorage.setItem('exchangeRates', JSON.stringify(newData));
      setExchangeRates(response.data.data);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const fetchAvailableCurrencies = async () => {
    try {
      const response = await axios.get(
        `https://api.freecurrencyapi.com/v1/currencies?apikey=${CURRENCY_API_KEY}`,
      );
      if (!response || !response.data || !response.data.data) {
        throw new Error('API response is not valid.');
      }
      const currencyList = Object.keys(response.data.data).map(code => ({
        code,
        name: response.data.data[code].name,
        symbol: response.data.data[code].symbol,
      }));
      setAvailableCurrencies(currencyList);
    } catch (error) {
      console.error('Error fetching available currencies:', error);
    }
  };

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency])
      return amount;
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    return (amount * rate).toFixed(2);
  };

  function getCurrencySymbol(code) {
    if (!code) return '';
    const currency = availableCurrencies.find(curr => curr.code === code);
    return currency ? currency.symbol : '';
  }

  const calculateTotalExpenses = (expenses, baseCurrency) => {
    return expenses.reduce((total, expense) => {
      const amountInBaseCurrency = convertCurrency(
        expense.value,
        expense.currency,
        baseCurrency,
      );
      return total + amountInBaseCurrency;
    }, 0);
  };

  const calculateDailyAverage = (totalExpenses, tripDuration) => {
    return tripDuration ? totalExpenses / tripDuration : 0;
  };

  const calculateRemainingBalance = (budget, totalExpenses) => {
    return budget - totalExpenses;
  };

  useEffect(() => {
    fetchExchangeRates(baseCurrency);
    fetchAvailableCurrencies();
  }, [baseCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        exchangeRates,
        availableCurrencies,
        baseCurrency,
        setBaseCurrency,
        fetchExchangeRates,
        convertCurrency,
        getCurrencySymbol,
        calculateTotalExpenses,
        calculateDailyAverage,
        calculateRemainingBalance,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => useContext(CurrencyContext);
