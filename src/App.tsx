import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from './hooks';
import LoginNav from '@/navigation/authentication';
import HomeNav from '@/navigation/home';
import { authMe } from '@/store/reducer/user';
import Loading from '@/components/loading';

const Stack = createNativeStackNavigator();
export default function App () {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, [dispatch, user.loggedIn]);

  return (
    <>
      <StatusBar style="auto" />
      {user.loading ? (
        <Loading />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!user.loggedIn ? <Stack.Screen name="Authentication" component={LoginNav} /> : <Stack.Screen name="Home" component={HomeNav} />}
        </Stack.Navigator>
      )}
    </>
  );
};
