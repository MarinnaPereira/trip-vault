import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '@env';

const baseUrl = `${BASE_URL}`;

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const registerUser = async newUser => {
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, newUser, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

export const loginUser = async userData => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

export const updateUser = async updatedUser => {
  try {
    const token = await getToken();
    const res = await axios.patch(
      `${baseUrl}/user/${updatedUser._id}`,
      updatedUser,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

export const deleteUser = async user => {
  try {
    const token = await getToken();
    const res = await axios.delete(`${baseUrl}/user/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

export const getAllTrips = async () => {
  try {
    const token = await getToken();
    const res = await axios.get(`${baseUrl}/trips`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

export const addTrip = async newTrip => {
  try {
    const token = await getToken();
    const res = await axios.post(`${baseUrl}/trips`, newTrip, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

export const updateTrip = async updatedTrip => {
  try {
    const token = await getToken();
    const res = await axios.patch(
      `${baseUrl}/trips/${updatedTrip._id}`,
      updatedTrip,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

export const deleteTrip = async trip => {
  try {
    const token = await getToken();
    const res = await axios.delete(`${baseUrl}/trips/${trip._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    const errMessage = err.response.data.message;
    return errMessage;
  }
};

export const addExpense = async formData => {
  try {
    const token = await getToken();
    const response = await fetch(`${baseUrl}/expenses`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.error}`);
    }
    return data;
  } catch (err) {
    return err.message;
  }
};

export const updateExpense = async (formData, expenseId) => {
  try {
    const token = await getToken();
    const response = await fetch(`${baseUrl}/expenses/${expenseId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.error}`);
    }
    return data;
  } catch (err) {
    return err.message;
  }
};

export const deleteExpense = async expense => {
  try {
    const token = await getToken();
    const res = await axios.delete(`${baseUrl}/expenses/${expense._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    const errMessage = err.response.data.message;
    return errMessage;
  }
};
