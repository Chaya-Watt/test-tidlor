import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../Constants';

const Input = ({
  value,
  onChangeText,
  label,
  placeholder,
  isError,
  errorMessage,
  maxLength,
}) => {
  return (
    <View>
      <Text style={styles.styleLabel}>{label}</Text>
      <TextInput
        style={[styles.containerTextInput, isError && styles.styleError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        maxLength={maxLength || null}
      />
      {isError && <Text style={styles.textError}>{errorMessage}</Text>}
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

  styleError: {
    borderColor: 'red',
  },

  textError: {
    fontFamily: FONTS.LIGHT,
    fontSize: 12,
    color: 'red',
    marginTop: 3,
  },
});
