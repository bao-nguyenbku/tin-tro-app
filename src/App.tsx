import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from './hooks';
import { authMe } from '@/store/reducer/user';
import Loading from '@/components/loading';
import LoginScreen from '@/screens/login';
import RegisterScreen from '@/screens/register';
import AccommodationList from '@/screens/explore/accommodation-list';
import AccommodationDetailsScreen from '@/screens/explore/accommodation-details';
import MainTabNavigator from '@/navigation/main-tab-navigator';
import RoomMenu from './screens/my-room/RoomMenu';
import ParkingScreen from './screens/my-room/parking';
import RegisterParking from './screens/my-room/parking/register-parking';
import WifiScreen from './screens/my-room/wifi';
import RegisterWifi from './screens/my-room/wifi/register-wifi';
import { enableScreens } from 'react-native-screens';
import RentRequestScreen from './screens/rent-request';
import SearchIcon from '@/screens/explore/SearchIcon';
import SearchScreen from './screens/search';
import { COLORS } from './constants';

enableScreens(false);
const Stack = createNativeStackNavigator();
export default function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { loggedIn } = user;
  useEffect(() => {
    dispatch(authMe());
  }, [user.loggedIn]);

  return (
    <>
      {user.loading ? (
        <Loading />
      ) : (
        <Stack.Navigator
          initialRouteName={!user.loading && user.loggedIn ? 'main-tab' : 'authentication'}
          screenOptions={{
            headerShown: true,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: COLORS.PRIMARY,
            },
            headerBackTitleVisible: false,
          }}
        >
          {loggedIn ? (
            <>
              {/* Accommodation Stack */}
              <Stack.Group
                screenOptions={{
                  headerShown: true,
                }}
              >
                <Stack.Screen
                  name='AllAccommodations'
                  options={{
                    title: 'Tìm phòng trọ',
                    headerRight: (props) => <SearchIcon {...props} />,
                  }}
                  children={(props) => <AccommodationList {...props} />}
                />
                <Stack.Screen
                  name='AccommodationDetails'
                  options={{
                    title: 'Chi tiết',
                  }}
                  children={(props) => <AccommodationDetailsScreen {...props} />}
                />
                <Stack.Screen
                  name='SearchAccommodation'
                  options={{
                    title: 'Tìm kiếm',
                  }}
                  children={(props) => <SearchScreen {...props} />}
                />
              </Stack.Group>
              {/* Tab Stack */}
              <Stack.Group
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name='main-tab' component={MainTabNavigator} />
              </Stack.Group>

              {/* Room Menu Stack */}
              <Stack.Group
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name='room-menu' component={RoomMenu} />
                <Stack.Screen name='parking' component={ParkingScreen} />
                <Stack.Screen name='register-parking' component={RegisterParking} />
                <Stack.Screen name='wifi' component={WifiScreen} />
                <Stack.Screen name='register-wifi' component={RegisterWifi} />
              </Stack.Group>

              {/* Account Stack */}
              <Stack.Group
                screenOptions={{
                  headerShown: true,
                }}
              >
                <Stack.Screen
                  name='RentRequestList'
                  options={{
                    title: 'Yêu cầu thuê phòng',
                  }}
                  component={RentRequestScreen}
                />
                {/* <Stack.Screen name='parking' component={ParkingScreen} />
                <Stack.Screen name='register-parking' component={RegisterParking} />
                <Stack.Screen name='wifi' component={WifiScreen} />
                <Stack.Screen name='register-wifi' component={RegisterWifi} /> */}
              </Stack.Group>
            </>
          ) : (
            <Stack.Group
              navigationKey='authentication'
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      )}
    </>
  );
}
