import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { ADMIN_ROUTES } from '@/navigation/routes.config';
import { Ionicons } from '@expo/vector-icons';

import MessageList from '@/screens/message/message-list';
import { COLORS } from '@/constants';
import AdminMyAccommodation from '@/screens/admin-my-accommodation';
import RequestList from '@/screens/admin-rent-request/request-list';
import AccountMenu from '@/screens/account';

const Tab = createBottomTabNavigator();

function renderIcon({ route, focused, color, size }) {
  let iconName;
  if (route.name === ADMIN_ROUTES.myAccomm.title) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === ADMIN_ROUTES.request.title) {
    iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
  } else if (route.name === ADMIN_ROUTES.message.title) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (route.name === ADMIN_ROUTES.account.title) {
    iconName = focused ? 'person' : 'person-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
}

export default function AdminBottomBar() {
  return (
    <Tab.Navigator
      initialRouteName={ADMIN_ROUTES.myAccomm.title}
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
        // TODO: Temporary disable bottom tab nav header
        // header: (props) => <Header {...props} />
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='MyAccomm'
        children={(props) => <AdminMyAccommodation {...props} />}
        options={{
          title: 'Nhà trọ của tôi',
        }}
      />
      <Tab.Screen
        name='Request'
        children={(props) => <RequestList {...props} />}
        options={{
          title: 'Yêu cầu',
        }}
      />
      <Tab.Screen
        name='Message'
        children={(props) => <MessageList {...props} />}
        options={{
          title: 'Tin nhắn',
        }}
      />
      <Tab.Screen
        name='Account'
        children={(props) => <AccountMenu {...props} />}
        options={{
          title: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
}
