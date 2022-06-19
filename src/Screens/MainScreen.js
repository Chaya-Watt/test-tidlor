import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';

import {Button, CardInfo} from '../Components';
import {COLORS, FONTS, KEY_LOCAL_STORAGE} from '../Constants';
import {getData, storeData} from '../Helper';
import {fetchUsers, deleteUser} from '../Redux/actions';

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listUser = useSelector(state => state.user);

  const [modalDeleteInfo, setModalDeleteInfo] = useState({});
  const [isModalConfirmDelete, setIsModalConfirmDelete] = useState(false);

  console.log('listUser', listUser); // To see storage redux data

  const fetchUserDataLocal = async () => {
    const userLocal = await getData(KEY_LOCAL_STORAGE.USER);

    dispatch(fetchUsers(userLocal));
  };

  const handleShowModalDelete = id => {
    setIsModalConfirmDelete(!isModalConfirmDelete);

    const [userDelete] = listUser.filter(item => item.id === id);

    setModalDeleteInfo(userDelete);
  };

  const handleDeleteUser = async id => {
    await storeData(
      KEY_LOCAL_STORAGE.USER,
      listUser.filter(item => item.id !== id),
    );

    dispatch(deleteUser(id));
    setIsModalConfirmDelete(false);
  };

  useEffect(() => {
    fetchUserDataLocal();
  }, []);

  return (
    <View style={styles.containerMain}>
      {listUser.length === 0 ? (
        <DefaultState />
      ) : (
        <FlatList
          data={listUser}
          showsVerticalScrollIndicator={false}
          style={styles.styleFlatList}
          renderItem={({item}) => (
            <CardInfo data={item} onPressDelete={handleShowModalDelete} />
          )}
        />
      )}
      <View style={styles.positionCreateButton}>
        <Button
          onPress={() =>
            navigation.navigate('CreateScreen', {name: 'เพิ่มสมาชิก'})
          }
          text="เพิ่มสมาชิก"
        />
      </View>
      <Modal isVisible={isModalConfirmDelete}>
        <View style={styles.containerModal}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.headerTitleModal}>ลบสมาชิก</Text>
            <Text style={styles.detailModal}>ต้องการลบ</Text>
            <Text style={styles.detailModal} numberOfLines={1}>
              {modalDeleteInfo.name}
            </Text>
          </View>
          <View style={styles.containerButtonModal}>
            <Button
              text="ไม่"
              onPress={() => setIsModalConfirmDelete(false)}
              customStyle={{width: 150, padding: 10}}
            />
            <Button
              text="ใช่"
              onPress={() => handleDeleteUser(modalDeleteInfo.id)}
              customStyle={{
                width: 150,
                padding: 10,
                backgroundColor: '#90EE90',
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DefaultState = () => {
  return (
    <View style={styles.containerDefaultState}>
      <Text style={styles.textDefaultState}>
        คุณยังไม่มีสมาชิก กรุณาเพิ่มสมาชิก
      </Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: COLORS.SOFT_BLUE,
    padding: 10,
  },

  containerDefaultState: {
    backgroundColor: COLORS.GRAY,
    width: '100%',
    height: 125,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  textDefaultState: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
  },

  styleFlatList: {
    flexGrow: 0,
    padding: 1,
  },

  positionCreateButton: {
    marginVertical: 20,
    alignSelf: 'center',
  },

  containerModal: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    minHeight: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },

  headerTitleModal: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 18,
    color: COLORS.DARK_BLUE,
    marginBottom: 5,
  },

  detailModal: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.BLACK,
    marginBottom: 5,
  },

  containerButtonModal: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
