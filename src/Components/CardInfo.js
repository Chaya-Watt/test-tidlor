import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {deleteUser} from '../Redux/actions';
import {COLORS, FONTS} from '../Constants';

const CardInfo = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.containerCard}>
      <View>
        <Text style={styles.styleLabel}>
          ชื่อ: <Text style={styles.styleData}>{data.name}</Text>
        </Text>
        <Text style={styles.styleLabel}>
          รหัสบัตรประชาชน:{' '}
          <Text style={styles.styleData}>{data.citizenId}</Text>
        </Text>
        <Text style={styles.styleLabel}>
          เบอร์โทรศัพท์: <Text style={styles.styleData}>{data.phone}</Text>
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateScreen', {
              id: data.id,
              isEdit: true,
            })
          }>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteUser(data.id))}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  containerCard: {
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

  containerButton: {
    justifyContent: 'space-between',
    padding: 5,
  },
});
