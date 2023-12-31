import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '@/navigation/routes.config';
import { Ionicons } from '@expo/vector-icons';
import AccommodationList from '@/screens/explore/accommodation-list';
import RoomMenu from '@/screens/my-room/RoomMenu';
import MessageList from '@/screens/message/message-list';
import AccountMenu from '@/screens/account';
import HomeHeader from '@/components/home-header';
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
          // header: (props) => <HomeHeader {...props} />,
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
        children={() => <MessageList {...props} />}
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
