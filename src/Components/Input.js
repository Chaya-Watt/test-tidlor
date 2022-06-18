import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../Constants';

const Input = ({value, onChangeText, label, placeholder}) => {
  return (
    <View>
      <Text style={styles.styleLabel}>{label}</Text>
      <TextInput
        style={styles.containerTextInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  styleLabel: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    marginBottom: 5,
  },

  containerTextInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
  },
});
