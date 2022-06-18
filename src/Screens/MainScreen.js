import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {Button, CardInfo} from '../Components';
import {COLORS, FONTS, KEY_LOCAL_STORAGE} from '../Constants';
import {getData, storeData} from '../Helper';
import {fetchUsers, deleteUser} from '../Redux/actions';

const MainScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const listUser = useSelector(state => state.user);

  const fetchUserDataLocal = async () => {
    const userLocal = await getData(KEY_LOCAL_STORAGE.USER);

    dispatch(fetchUsers(userLocal));
  };

  const handleDeleteUser = async id => {
    await storeData(
      KEY_LOCAL_STORAGE.USER,
      listUser.filter(item => item.id !== id),
    );

    dispatch(deleteUser(id));
  };

  useEffect(() => {
    fetchUserDataLocal();
  }, [isFocused]);

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
            <CardInfo data={item} onPressDelete={handleDeleteUser} />
          )}
        />
      )}
      <View style={styles.positionCreateButton}>
        <Button
          onPress={() => navigation.navigate('CreateScreen')}
          text="เพิ่มสมาชิก"
        />
      </View>
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
});
