import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import axios from "axios";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const data = [
  { label: 'ABC', value: '1' },
  { label: 'ABC', value: '2' },
  { label: 'ABC', value: '3' },
  { label: 'ABC', value: '4' },
  { label: 'ABC', value: '5' },
  { label: 'ABC', value: '6' },
  { label: 'ABC', value: '7' },
  { label: 'ABC', value: '8' },
];

const DropdownCurrency = () => {
  // const [currencyData, setCurrencyData] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  //? THIS CODE BELLOW IS THE 1ST TRY TO FETCH THE DATA FROM THE API
  // useEffect(() => {
  //   let freecurrencyapi = new Freecurrencyapi(
  //     "fca_live_XQtHu6XOEUff6EQwMQrpZ8G5PPGbyp3DZJq0DA2J"
  //   );
  //   freecurrencyapi
  //     .latest({
  //       base_currency: "USD",
  //       currencies: "EUR",
  //     })
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       const currency = Object.keys(response.data).length;
  //       const currencyArray = [];
  //       for (let i = 0; i < currency; i++) {
  //         currencyArray.push({
  //           value: response.data[i],
  //         });
  //       }
  //       setCurrencyData(currencyArray);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  //  ?  THIS CODE BELLOW IS THE 2ND TRY TO FETCH THE DATA FROM THE API
  // fetch(
  //   `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_XQtHu6XOEUff6EQwMQrpZ8G5PPGbyp3DZJq0DA2J`
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return (
    <View className="mt-4">
      <Dropdown
        className=" bg-lightGray rounded-md w-[380px]  text-xl p-4 text-[#999] "
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Choose Currency' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownCurrency;

const styles = StyleSheet.create({
  dropdown: {
    height: 43,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: -15,
    marginBottom: -15,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
