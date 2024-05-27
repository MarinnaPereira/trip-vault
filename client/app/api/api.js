import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '@env';

const baseUrl = `${BASE_URL}`;

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

// * auth requests

export const registerUser = async newUser => {
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, newUser, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 200) {
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
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

// * user requests

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
    console.log(res.data);
    return res.data; // return just a message
  } catch (err) {
    const errMessage = err.response.data.error;
    return errMessage;
  }
};

// * trips requests

export const getAllTrips = async () => {
  try {
    const token = await getToken();
    const res = await axios.get(`${baseUrl}/trips`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data; // return an array with all trips
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
    console.log(res.data);
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
    console.log(res.data);
    return res.data; // return object with the updated trip info
  } catch (err) {
    console.error(err.message);
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
    console.log(res.data);
    return res.data; // return just a message
  } catch (err) {
    console.error(err.message);
  }
};

// * expenses requests

export const addExpense = async formData => {
  try {
    const token = await getToken();
    console.log(token);
    console.log('type', typeof formData);

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
    if (response.status !== 201) {
      throw new Error(`${data.error}`);
    }
    data.status = 201;
    return data; // return object with the new expense info
  } catch (err) {
    return err.message;
  }
};

export const updateExpense = async (formData, expenseId) => {
  try {
    const token = await getToken();
    console.log(token);
    console.log(formData);

    const response = await fetch(`${baseUrl}/expenses/${expenseId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data; // return object with the updated expense info
  } catch (err) {
    console.error(err.message);
  }
};
// !update trip

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
    console.log('err', err);
    const errMessage = err.response.data.message;
    console.log('errMessage', errMessage);
    return errMessage;
  }
};
