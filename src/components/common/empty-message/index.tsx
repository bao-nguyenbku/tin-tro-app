import React from 'react';
import { Text } from 'native-base';
import { SafeAreaView } from 'react-native';

type Props = {
  message: string;
};
export default function EmptyMessage({ message }: Props) {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <Text color='primary.500'>{message}</Text>
    </SafeAreaView>
  );
}
