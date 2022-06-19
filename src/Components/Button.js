import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../Constants';

const Button = ({onPress, text, customStyle}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.containerButton, customStyle]}>
        <Text style={styles.styleText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  containerButton: {
    width: 200,
    padding: 15,
    backgroundColor: COLORS.RED,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  styleText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: 16,
  },
});
