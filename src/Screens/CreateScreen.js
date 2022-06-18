import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';

import {createUser} from '../Redux/actions';
import {Button, Input} from '../Components';
import {COLORS} from '../Constants';

const CreateScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = route?.params?.id || null;
  const isEdit = route?.params?.isEdit || false;

  const initialValue = {
    firstName: '',
    lastName: '',
    citizenId: '',
    phone: '',
  };

  const [dataForm, setDataForm] = useState(initialValue);

  const formInput = [
    {
      label: 'ชื่อ',
      key: 'firstName',
    },
    {
      label: 'นามสกุล',
      key: 'lastName',
    },
    {
      label: 'เลขบัตรประชาชน',
      key: 'citizenId',
    },
    {
      label: 'เบอร์โทรศัพท์',
      key: 'phone',
    },
  ];

  return (
    <View style={styles.containerCreate}>
      {formInput.map(item => (
        <Input
          value={dataForm[item.key]}
          label={item.label}
          onChangeText={text => setDataForm({...dataForm, [item.key]: text})}
        />
      ))}

      <View style={styles.positionButton}>
        <Button
          text="ยืนยัน"
          onPress={() => {
            dispatch(
              createUser({
                id: uuid.v4(),
                name: `${dataForm.firstName} ${dataForm.lastName}`,
                citizenId: dataForm.citizenId,
                phone: dataForm.phone,
              }),
            );
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  containerCreate: {
    flex: 1,
    backgroundColor: COLORS.SOFT_BLUE,
    padding: 15,
  },

  positionButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
