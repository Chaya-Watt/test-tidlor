import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {Button} from '../Components';
import {COLORS, KEY_LOCAL_STORAGE} from '../Constants';
import {storeData} from '../Helper';

const LandingScreen = () => {
  const navigation = useNavigation();

  const onPressStart = () => {
    storeData(KEY_LOCAL_STORAGE.IS_START, true);
    storeData(KEY_LOCAL_STORAGE.USER, []);

    navigation.navigate('MainRouters');
    navigation.reset({
      index: 0,
      routes: [{name: 'MainRouters'}],
    });
  };

  return (
    <SafeAreaView style={styles.containerLanding}>
      <View style={styles.positionButton}>
        <Button text="Get Started" onPress={onPressStart} />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  containerLanding: {
    flex: 1,
    backgroundColor: COLORS.SOFT_BLUE,
  },

  positionButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
