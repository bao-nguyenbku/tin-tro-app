import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { ADMIN_ROUTES } from '@/navigation/map-screen-name';
import { Ionicons } from '@expo/vector-icons';

import MessageList from '@/screens/message/message-list';
import { COLORS } from '@/constants';
import AdminMyAccommodation from '@/screens/admin-my-accommodation';
import RequestList from '@/screens/admin-rent-request/request-list';
import AccountMenu from '@/screens/account';
import CustomHeader from '../common/custom-header';

const Tab = createBottomTabNavigator();

function renderIcon({ route, focused, color, size }) {
  let iconName;
  if (route.name === ADMIN_ROUTES.MY_ACCOMMODATION) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === ADMIN_ROUTES.REQUEST) {
    iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
  } else if (route.name === ADMIN_ROUTES.MESSAGE) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (route.name === ADMIN_ROUTES.ACCOUNT) {
    iconName = focused ? 'person' : 'person-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
}

export default function AdminBottomBar() {
  return (
    <Tab.Navigator
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
        header: (props) => <CustomHeader {...props} />,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={ADMIN_ROUTES.MY_ACCOMMODATION}
        children={(props) => <AdminMyAccommodation {...props} />}
        options={{
          title: 'Nhà trọ của tôi',
        }}
      />
      <Tab.Screen
        name={ADMIN_ROUTES.REQUEST}
        children={(props) => <RequestList {...props} />}
        options={{
          title: 'Yêu cầu',
          headerShown: true,
          headerTitle: 'Danh sách yêu cầu thuê phòng'
        }}
      />
      <Tab.Screen
        name={ADMIN_ROUTES.MESSAGE}
        children={(props) => <MessageList {...props} />}
        options={{
          title: 'Tin nhắn',
        }}
      />
      <Tab.Screen
        name={ADMIN_ROUTES.ACCOUNT}
        children={(props) => <AccountMenu {...props} />}
        options={{
          title: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
}
