import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS} from '../Constants';

const CardInfo = ({data, onPressDelete}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerCard}>
      <View style={styles.containerDetail}>
        <Text style={styles.styleLabel} numberOfLines={1}>
          ชื่อ: <Text style={styles.styleData}>{data.name}</Text>
        </Text>
        <Text style={styles.styleLabel} numberOfLines={1}>
          รหัสบัตรประชาชน:{' '}
          <Text style={styles.styleData}>{data.citizenId}</Text>
        </Text>
        <Text style={styles.styleLabel} numberOfLines={1}>
          เบอร์โทรศัพท์: <Text style={styles.styleData}>{data.phone}</Text>
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateScreen', {
              id: data.id,
              isEdit: true,
              name: 'แก้ไขสมาชิก',
            });
          }}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressDelete(data.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: COLORS.GRAY,
    width: '100%',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  styleLabel: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    margin: 5,
    color: COLORS.BLACK,
  },

  styleData: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
  },

  containerDetail: {
    flex: 0.9,
  },

  containerButton: {
    flex: 0.1,
    justifyContent: 'space-between',
    padding: 5,
  },
});
