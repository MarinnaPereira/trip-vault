import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@expo/vector-icons';

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
    <View className="w-[380px] py-[14px] bg-lightGray rounded-md flex flex-row justify-start items-center pl-3">
      <MaterialIcons name="currency-exchange" size={23} color="#333" />
      <Dropdown
        className="w-[345px] text-[18px] px-2 text-[#333]"
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
        placeholder={!isFocus ? 'Currency' : '...'}
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
    color: '#333',
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
