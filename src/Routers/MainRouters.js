import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Button, Image, TouchableOpacity} from 'react-native';

import {MainScreen, CreateScreen} from '../Screens';
import {COLORS, FONTS} from '../Constants';
import backIcon from '../../assets/icons/back.png';

const StackMain = createNativeStackNavigator();

const MainRouters = () => {
  const navigation = useNavigation();

  return (
    <StackMain.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.DARK_BLUE,
        },
        headerTitleStyle: {color: COLORS.WHITE, fontFamily: FONTS.MEDIUM},
        headerTitleAlign: 'center',
      }}>
      <StackMain.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: 'สมาชิก',
        }}
      />
      <StackMain.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={({route}) => ({
          title: route.params.name,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={backIcon}
                style={{width: 20, height: 20, tintColor: COLORS.WHITE}}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </StackMain.Navigator>
  );
};

export default MainRouters;
