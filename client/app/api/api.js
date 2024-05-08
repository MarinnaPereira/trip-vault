import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://192.168.0.237:8080';

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

// * all the requests should be called after 'await' keyword

// ? auth requests

export const registerUser = async newUser => {
  // * newUser as parameter
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, newUser, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data);
    return res.data; // return object with the registered user info
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async userData => {
  // * userData {credential, password} as parameter
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data);
    return res.data; // return object with 'token' and 'user' properties
  } catch (err) {
    console.error(err);
  }
};

// ? user requests (i think we won't need getUser)

export const updateUser = async updatedUser => {
  // * updatedUser (with complete information, not just the changed ones inside) as parameter
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
    console.log(res.data);
    return res.data; // return object with the updated user info
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async user => {
  // * user as parameter (should have _id inside)
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
    console.error(err);
  }
};

// ? trips requests (i think we won't need getTrip)

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
    console.error(err);
  }
};

export const addTrip = async newTrip => {
  // * newTrip as parameter
  try {
    const token = await getToken();
    console.log(token);
    const res = await axios.post(`${baseUrl}/trips`, newTrip, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data; // return object with the new trip info
  } catch (err) {
    console.error(err);
  }
};

export const updateTrip = async updatedTrip => {
  // * updatedTrip (with complete information, not just the changed ones inside) as parameter
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
    console.error(err);
  }
};

export const deleteTrip = async trip => {
  // * trip as parameter (should have _id inside)
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
    console.error(err);
  }
};

// ? expenses requests (getAll and get????????????)

// export const addExpense = async formData => {
//   // *formData with expense info as parameter
//   try {
//     const token = await getToken();
//     console.log(token);
//     console.log(formData);
//     const res = await axios.post(`${baseUrl}/expenses`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(res.data);
//     return res.data; // return object with the new expense info
//   } catch (err) {
//     console.error(err);
//   }
// };

export const addExpense = async formData => {
  try {
    const token = await getToken();
    console.log(token);
    console.log(formData);

    const response = await fetch(`${baseUrl}/expenses`, {
      method: 'POST',
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
    return data; // return object with the new expense info
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to propagate it to the caller
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
    console.error(err);
    throw err; // Re-throw the error to propagate it to the caller
  }
};
// !update trip

export const deleteExpense = async expense => {};
// !update trip
