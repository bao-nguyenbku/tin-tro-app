import { Button as NBButton, IButtonProps } from 'native-base';

export default function Button(props: IButtonProps) {
  return <NBButton borderRadius='xl' h='16' {...props} />;
}
