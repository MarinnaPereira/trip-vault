import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useCurrencyContext } from '../contexts/currencyContext';

const DropdownCurrency = ({ selectedCurrency, onChange }) => {
  const { availableCurrencies } = useCurrencyContext();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = item => {
    setValue(item.code);
    setIsFocus(false);
    onChange(item.code);
  };

  return (
    <View className="mt-4">
      <Dropdown
        className="bg-lightGray rounded-md w-[380px] text-xl px-3 py-6 text-[#999]"
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={availableCurrencies.map(currency => ({
          label: `${currency.name} (${currency.code})`,
          code: currency.code,
        }))}
        search
        maxHeight={300}
        labelField="label"
        valueField="code"
        placeholder={!isFocus ? 'Choose currency' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
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
  placeholderStyle: {
    fontSize: 18,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
  },
});
