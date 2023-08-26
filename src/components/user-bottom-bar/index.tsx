import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RENTER_ROUTES } from '@/navigation/map-screen-name';
import { Ionicons } from '@expo/vector-icons';
import AccommodationList from '@/screens/explore/accommodation-list';
import RoomMenu from '@/screens/my-room/RoomMenu';
import MessageList from '@/screens/message/message-list';
import AccountMenu from '@/screens/account';
import HomeHeader from '@/components/home-header';
import { COLORS } from '@/constants';
import CustomHeader from '@/components/common/custom-header';

const Tab = createBottomTabNavigator();

const renderIcon = ({ route, focused, color, size }) => {
  let iconName;
  if (route.name === RENTER_ROUTES.EXPLORE) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === RENTER_ROUTES.MY_ROOM) {
    iconName = focused ? 'albums' : 'albums-outline';
  } else if (route.name === RENTER_ROUTES.MESSAGE) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (route.name === RENTER_ROUTES.ACCOUNT) {
    iconName = focused ? 'person' : 'person-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function UserBottomBar(props: any) {
  return (
    <Tab.Navigator
      initialRouteName={RENTER_ROUTES.EXPLORE}
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
        headerTintColor: COLORS.WHITE,
        header: (props) => <CustomHeader {...props} />,
        headerShown: true,
      })}
    >
      <Tab.Screen
        name={RENTER_ROUTES.EXPLORE}
        options={{
          title: 'Tìm phòng trọ',
          header: (props) => <HomeHeader {...props} />,
        }}
        children={() => <AccommodationList {...props} />}
      />
      <Tab.Screen
        name={RENTER_ROUTES.MY_ROOM}
        options={{
          title: 'Phòng của tôi',
        }}
        children={() => <RoomMenu {...props} />}
      />
      <Tab.Screen
        name={RENTER_ROUTES.MESSAGE}
        options={{
          title: 'Tin nhắn',
        }}
        children={() => <MessageList {...props} />}
      />
      <Tab.Screen
        name={RENTER_ROUTES.ACCOUNT}
        options={{
          title: 'Tài khoản',
          headerShown: false,
        }}
        children={() => <AccountMenu {...props} />}
      />
    </Tab.Navigator>
  );
}
