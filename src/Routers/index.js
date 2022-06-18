import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LandingScreen} from '../Screens';
import MainRouters from './MainRouters';
import {getData} from '../Helper';
import {KEY_LOCAL_STORAGE} from '../Constants';

const Stack = createNativeStackNavigator();

const Routers = () => {
  const [isStarted, setIsStarted] = useState(null);

  const handelCheckIsStarted = async () => {
    const isStartedLocal = await getData(KEY_LOCAL_STORAGE.IS_START);

    if (isStartedLocal === null) {
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  };

  useEffect(() => {
    handelCheckIsStarted();
  }, []);

  if (isStarted === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isStarted ? 'MainRouters' : 'LandingScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="MainRouters" component={MainRouters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
