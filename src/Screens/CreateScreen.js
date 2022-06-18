import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';

import {createUser, editUser} from '../Redux/actions';
import {Button, Input} from '../Components';
import {COLORS, KEY_LOCAL_STORAGE} from '../Constants';
import {storeData} from '../Helper';

const CreateScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const listUser = useSelector(state => state.user);
  const id = route?.params?.id || null;
  const isEdit = route?.params?.isEdit || false;

  const initialValue = {
    id: '',
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

  useEffect(() => {
    if (isEdit) {
      const [userEdit] = listUser.filter(item => item.id === id);
      const firstName = userEdit.name.split(' ')[0];
      const lastName = userEdit.name.split(' ')[1];

      setDataForm({
        id: userEdit.id,
        firstName,
        lastName,
        citizenId: userEdit.citizenId,
        phone: userEdit.phone,
      });
    }
  }, []);

  const handleCreateUser = async () => {
    const dataCreate = {
      id: uuid.v4(),
      name: `${dataForm.firstName} ${dataForm.lastName}`,
      citizenId: dataForm.citizenId,
      phone: dataForm.phone,
    };

    await storeData(KEY_LOCAL_STORAGE.USER, listUser.concat(dataCreate));

    dispatch(createUser(dataCreate));
    navigation.goBack();
  };

  const handleEditUser = async () => {
    const dataEdit = {
      id: dataForm.id,
      name: `${dataForm.firstName} ${dataForm.lastName}`,
      citizenId: dataForm.citizenId,
      phone: dataForm.phone,
    };

    await storeData(
      KEY_LOCAL_STORAGE.USER,
      listUser.map(item => (item.id === dataEdit.id ? dataEdit : item)),
    );

    dispatch(editUser(dataEdit));
    navigation.goBack();
  };

  return (
    <View style={styles.containerCreate}>
      {formInput.map(item => (
        <Input
          key={item.key}
          value={dataForm[item.key]}
          label={item.label}
          onChangeText={text => setDataForm({...dataForm, [item.key]: text})}
        />
      ))}

      <View style={styles.positionButton}>
        <Button
          text="ยืนยัน"
          onPress={() => (isEdit ? handleEditUser() : handleCreateUser())}
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
