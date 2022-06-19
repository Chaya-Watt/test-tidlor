import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {useForm, Controller} from 'react-hook-form';

import {createUser, editUser} from '../Redux/actions';
import {Button, Input} from '../Components';
import {COLORS, KEY_LOCAL_STORAGE} from '../Constants';
import {formatCitizenId, formatPhone, storeData} from '../Helper';

const CreateScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const listUser = useSelector(state => state.user);
  const initialValue = {
    id: '',
    firstName: '',
    lastName: '',
    citizenId: '',
    phone: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm(initialValue);

  const id = route?.params?.id || null;
  const isEdit = route?.params?.isEdit || false;

  const formInput = [
    {
      label: 'ชื่อ',
      key: 'firstName',
      messageError: 'กรุณากรอกชื่อ',
      maxLength: null,
    },
    {
      label: 'นามสกุล',
      key: 'lastName',
      messageError: 'กรุณากรอกนามสกุล',
      maxLength: null,
    },
    {
      label: 'เลขบัตรประชาชน',
      key: 'citizenId',
      messageError: 'กรุณากรอกเลขบัตรประชาชน',
      maxLength: 17,
    },
    {
      label: 'เบอร์โทรศัพท์',
      key: 'phone',
      messageError: 'กรุณากรอกเบอร์โทรศัพท์',
      maxLength: 11,
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const [userEdit] = listUser.filter(item => item.id === id);
      const firstName = userEdit.name.split(' ')[0];
      const lastName = userEdit.name.split(' ')[1];

      reset({
        id: userEdit.id,
        firstName,
        lastName,
        citizenId: formatCitizenId(userEdit.citizenId),
        phone: formatPhone(userEdit.phone),
      });
    }
  }, []);

  const handleCreateUser = async dataForm => {
    const dataCreate = {
      id: uuid.v4(),
      name: `${dataForm.firstName} ${dataForm.lastName}`,
      citizenId: dataForm.citizenId.replace(/-/g, ''),
      phone: dataForm.phone.replace(/-/g, ''),
    };

    await storeData(KEY_LOCAL_STORAGE.USER, listUser.concat(dataCreate));

    dispatch(createUser(dataCreate));
    navigation.goBack();
  };

  const handleEditUser = async dataForm => {
    const dataEdit = {
      id: dataForm.id,
      name: `${dataForm.firstName} ${dataForm.lastName}`,
      citizenId: dataForm.citizenId.replace(/-/g, ''),
      phone: dataForm.phone.replace(/-/g, ''),
    };

    await storeData(
      KEY_LOCAL_STORAGE.USER,
      listUser.map(item => (item.id === dataEdit.id ? dataEdit : item)),
    );

    dispatch(editUser(dataEdit));
    navigation.goBack();
  };

  const handleRules = item => {
    if (item.key === 'citizenId') {
      return {
        required: item.messageError,
        pattern: {
          value: /\d{1}-\d{4}-\d{5}-\d{2}-\d{1}/,
          message: 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง',
        },
        validate: value =>
          value
            .replace(/-/g, '')
            .split('')
            .every(char => char === value[0])
            ? 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง'
            : true,
        maxLength: 17,
      };
    } else if (item.key === 'phone') {
      return {
        required: item.messageError,
        pattern: {
          value: /\d{3}-\d{7}/,
          message: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง',
        },
        validate: value =>
          value
            .replace(/-/g, '')
            .split('')
            .every(char => char === value[0])
            ? 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'
            : true,
        maxLength: 11,
      };
    } else {
      return {required: item.messageError};
    }
  };

  const handleOnChange = (item, value, onChange) => {
    const pureValue = value.replace(/-/g, '');

    if (item.key === 'citizenId') {
      if (pureValue.length >= 13) {
        const formatValue = pureValue.replace(
          /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/g,
          '$1-$2-$3-$4-$5',
        );

        return onChange(formatValue);
      } else if (pureValue.length >= 12) {
        const formatValue = pureValue.replace(
          /(\d{1})(\d{4})(\d{5})(\d{2})/g,
          '$1-$2-$3-$4',
        );

        return onChange(formatValue);
      } else if (pureValue.length >= 10) {
        const formatValue = pureValue.replace(
          /(\d{1})(\d{4})(\d{5})/g,
          '$1-$2-$3',
        );

        return onChange(formatValue);
      } else if (pureValue.length >= 5) {
        const formatValue = pureValue.replace(/(\d{1})(\d{4})/g, '$1-$2');

        return onChange(formatValue);
      } else {
        onChange(pureValue);
      }
    } else if (item.key === 'phone') {
      if (pureValue.length >= 10) {
        const formatValue = pureValue.replace(/(\d{3})(\d{7})/g, '$1-$2');

        return onChange(formatValue);
      } else if (pureValue.length >= 4) {
        const formatValue = pureValue.replace(/(\d{3})/, '$1-');

        return onChange(formatValue);
      } else {
        onChange(pureValue);
      }
    } else {
      onChange(pureValue);
    }
  };

  return (
    <View style={styles.containerCreate}>
      {formInput.map(item => (
        <Controller
          key={item.key}
          control={control}
          name={item.key}
          rules={handleRules(item)}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={styles.marginInput}>
              <Input
                key={item.key}
                value={value}
                label={item.label}
                onChangeText={text => handleOnChange(item, text, onChange)}
                isError={errors[item.key]}
                errorMessage={error ? error.message : null}
                maxLength={item.maxLength}
              />
            </View>
          )}
        />
      ))}

      <View style={styles.positionButton}>
        <Button
          text="ยืนยัน"
          onPress={handleSubmit(isEdit ? handleEditUser : handleCreateUser)}
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

  marginInput: {
    marginBottom: 20,
  },
});
