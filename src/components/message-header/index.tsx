import { primaryLinear } from '@/constants';
import { Text, Box, Avatar, HStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../common/back-button';

export default function MessageHeader(props: any) {
  const {
    navigation,
    route: { params },
  } = props;
  console.log(params);
  return (
    <Box
      bg={primaryLinear}
      h='24'
      flexDirection='row'
      alignItems='flex-end'
      py='2'
      px='4'
    >
      <HStack alignItems='center' space='2'>
        {navigation.canGoBack && <BackButton navigation={navigation} />}

        <Avatar
          source={{
            uri: params.avatar,
          }}
          size='md'
        />
        <Text bold fontSize='lg' color='white'>
          {params.name}
        </Text>
      </HStack>
    </Box>
  );
}
