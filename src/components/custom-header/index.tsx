import React from 'react';
import { Box, Text } from 'native-base';
import { getHeaderTitle } from '@react-navigation/elements';
import BackButton from '@/components/back-button';
import { COLORS } from '@/constants';

export default function HomeHeader(props: any) {
  const { navigation, route, options, back } = props;
  const { headerRight } = options;
  const title = getHeaderTitle(options, route.name);
  return (
    <Box
      bg={{
        linearGradient: {
          colors: [COLORS.PRIMARY_2, COLORS.PRIMARY],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      height='90px'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      paddingTop='40px'
      paddingX='5'
    >
      <Box flexDirection='row' alignItems='center' justifyContent='center' width='full' position='relative'>
        {back && navigation.canGoBack() && (
          <Box marginLeft={0} marginRight='auto' width='10' height='10' alignItems='center' justifyContent='center'>
            <BackButton {...props} />
          </Box>
        )}
        <Text bold fontSize='lg' color='white' position='absolute'>
          {title}
        </Text>
        {headerRight && headerRight()}
      </Box>
    </Box>
  );
}
