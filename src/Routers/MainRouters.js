import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

import {MainScreen, CreateScreen} from '../Screens';
import {COLORS, FONTS} from '../Constants';

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
            <Button
              onPress={() => navigation.goBack()}
              title="GoBack"
              color="#fff"
            />
          ),
        })}
      />
    </StackMain.Navigator>
  );
};

export default MainRouters;
