import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BackButton(props: any) {
  const { navigation } = props;
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name='chevron-back-outline' size={32} color='#fff' />
    </TouchableOpacity>
  );
}
