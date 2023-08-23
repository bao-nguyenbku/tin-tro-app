import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '@/components/home-header';
import RequestList from '@/screens/admin-rent-request/request-list';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function AdminRentRequest () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AdminRentRequests"
        options={{
          headerShown: true,
          header: (stackProps) => <CustomHeader {...stackProps} />,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          title: 'Yêu cầu thuê phòng',
        }}
        component={RequestList}
      />
    </Stack.Navigator>
  );
};

