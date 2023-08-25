import { Input as NBInput, IInputProps } from 'native-base';

export default function Input(props: IInputProps) {
  return (
    <NBInput size={24} h='16' borderRadius='xl' bgColor='white' {...props} />
  );
}
