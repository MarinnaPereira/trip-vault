import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://192.168.0.237:8080';

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
  // const token = '$2b$10$hlfD4HuCOd4xSEkWWmyDsOE0yFUgY6bmY7vwfqF5cVN5u5eDjbWhK';
};

export const registerUser = async newUser => {
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, newUser, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data);
    return res.data; // {user}
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async userData => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data); // {token, user}
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async updatedUser => {
  try {
    const token = getToken();
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
    console.log(res.data); // {updatedUser}
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async user => {
  try {
    const token = getToken();

    const res = await axios.delete(`${baseUrl}/user/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data); // {message}
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
