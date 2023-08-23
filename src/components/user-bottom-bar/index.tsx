import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ExploreScreen from '@/screens/explore';
import MyRoomScreen from '@/screens/my-room';
import MessageScreen from '@/screens/message';
import { Text } from 'native-base';
import { ROUTES } from '@/navigation/routes.config';
import { Ionicons } from '@expo/vector-icons';
import AccountNav from '@/navigation/account';
import AccommodationList from '@/screens/explore/accommodation-list';
import RoomMenu from '@/screens/my-room/RoomMenu';
import MessagerList from '@/screens/message/MessagerList';
import AccountMenu from '@/screens/account';
import SearchIcon from '@/screens/explore/SearchIcon';
import CustomHeader from '../home-header';
import { COLORS } from '@/constants';

const Tab = createBottomTabNavigator();

const renderIcon = ({ route, focused, color, size }) => {
  let iconName;
  if (route.name === ROUTES.explore.title) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === ROUTES.myRoom.title) {
    iconName = focused ? 'albums' : 'albums-outline';
  } else if (route.name === ROUTES.message.title) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (route.name === ROUTES.account.title) {
    iconName = focused ? 'person' : 'person-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function UserBottomBar(props: any) {
  return (
    <Tab.Navigator
      initialRouteName='Explore'
      sceneContainerStyle={{
        backgroundColor: COLORS.CONTAINER,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => renderIcon({ focused, color, size, route }),
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.IN_ACTIVE,
        tabBarStyle: {
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          bottom: 0,
          right: 0,
          justifyContent: 'center',
        },
        // TODO: Temporarily disable bottom tab nav header
        // header: (props) => <Header {...props} />,
        headerTintColor: COLORS.WHITE,
        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerShown: true,
      })}
    >
      <Tab.Screen
        name='Explore'
        options={{
          title: 'Tìm phòng trọ',
          header: (props) => <CustomHeader {...props} />,
        }}
        children={() => <AccommodationList {...props} />}
      />
      <Tab.Screen
        name='MyRoom'
        options={{
          title: 'Phòng của tôi',
        }}
        children={() => <RoomMenu {...props} />}
      />
      <Tab.Screen
        name='Message'
        options={{
          title: 'Tin nhắn',
        }}
        children={() => <MessagerList {...props} />}
      />
      <Tab.Screen
        name='Account'
        options={{
          title: 'Tài khoản',
        }}
        children={() => <AccountMenu {...props} />}
      />
    </Tab.Navigator>
  );
}
