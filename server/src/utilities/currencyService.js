import axios from "axios";
import "dotenv/config";

const API_ENDPOINT = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = process.env.CURRENCY_API_KEY;

export const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}?apikey=${API_KEY}&base_currency=${baseCurrency}`
    );
    if (!response || !response.data || !response.data.data) {
      throw new Error("API response is not valid.");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};
