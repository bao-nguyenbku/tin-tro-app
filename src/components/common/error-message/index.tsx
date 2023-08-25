import React from 'react';
import { Text } from 'native-base';

export default function ErrorMessage({ name, errors }) {
  return errors[name] ? <Text color='danger.600'>{errors[name]}</Text> : null;
}
