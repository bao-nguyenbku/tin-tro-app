import React from 'react';
import { Box, Text } from 'native-base';
import { getHeaderTitle } from '@react-navigation/elements';
import BackButton from '@/components/common/back-button';
import SearchIcon from '@/screens/explore/SearchIcon';
import { COLORS } from '@/constants';

export default function HomeHeader(props: any) {
  const { navigation, route, options, back } = props;
  return (
    <Box
      bg={{
        linearGradient: {
          colors: [COLORS.PRIMARY_2, COLORS.PRIMARY],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      height='120px'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      paddingTop='40px'
      paddingX='5'
    >
      <Box flexDirection='row' alignItems='center' justifyContent='center' width='full' position='relative'>
        <Box marginRight='auto'>
          <Text fontSize='lg' color='white'>
            Tìm phòng
          </Text>
          <Text bold fontSize='xl' color='white'>
            Tốt nhất cho bạn
          </Text>
        </Box>
        <SearchIcon />
      </Box>
    </Box>
  );
}
