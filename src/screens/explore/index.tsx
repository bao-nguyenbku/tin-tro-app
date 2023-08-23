import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '@/components/home-header';
import AccommodationList from './accommodation-list';

const Stack = createNativeStackNavigator();

export default function ExploreScreen (props: any) {
  const { stack } = props;
  const StackComponent = AccommodationList;
  return (
    <Stack.Group
      screenOptions={{
        header: (stackProps) => <CustomHeader {...stackProps} />,
        headerBackTitleVisible: false,
        headerShown: true,
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen 
        name='AllAccommodations'
        children={(stackProps) => <StackComponent {...stackProps } {...props} />}
      />
      {/* {Object.keys(stack).map(stackScreen => {
        const StackComponent = stack[stackScreen].component;
        return (
          <Stack.Screen 
            name={stack[stackScreen].title}
            options={{
              title: stack[stackScreen].label
            }}
            key={stackScreen}
            children={(stackProps) => <StackComponent {...stackProps } {...props} />}
          />
        )
      })} */}
    </Stack.Group>
  )
}
