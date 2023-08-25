import React from 'react';
import { Text } from 'native-base';

type Props = {
  name?: string;
  errors: any;
}
export default function ErrorMessage({ name, errors }: Props) {
  return errors[name] ? <Text color='danger.600'>{errors[name]}</Text> : null;
}
