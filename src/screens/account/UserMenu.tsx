import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { setCurrentUser } from '@/store/reducer/user';
import { deleteToken } from '@/utils/token';
import { RENTER_ROUTES } from '@/navigation/map-screen-name';

export default function UserMenu({ setLoading, loading, dispatch }) {
  const navigation = useNavigation();
  const menu = [
    {
      id: 1,
      title: 'Tạo yêu cầu sửa chữa',
      description: 'Gửi yêu cầu sửa chữa tới quản trị viên',
      icon: <Ionicons name='person-outline' size={24} color='black' />,
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Yêu cầu trả phòng từ quản trị viên',
      description: 'Quản trị viên yêu cầu xác nhận trả phòng',
      icon: (
        <Ionicons name='checkmark-circle-outline' size={24} color='black' />
      ),
      onPress: () =>
        navigation.navigate(RENTER_ROUTES.ACCEPT_CHECKOUT_FROM_ADMIN),
    },
    {
      id: 3,
      title: 'Hóa đơn',
      description: 'Xem và thanh toán hóa đơn nợ',
      icon: <Ionicons name='document-text-outline' size={24} color='black' />,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Yêu cầu thuê phòng',
      description: 'Xem các yêu cầu thuê phòng đang duyệt',
      icon: <Ionicons name='radio-outline' size={24} color='black' />,
      onPress: () => {
        navigation.navigate(RENTER_ROUTES.RENT_REQUEST_LIST);
      },
    },
  ];

  return (
    <Box pt={2.5} px='4'>
      <VStack borderRadius={12} space={8} px={4} py={6} bgColor='#fff'>
        {menu.map((item) => (
          <Pressable key={item.id} onPress={item.onPress}>
            <Flex
              alignItems='center'
              justifyContent='space-between'
              direction='row'
              rounded='xl'
            >
              <HStack alignItems='center' space='3' direction='row'>
                <Box
                  borderRadius='full'
                  p={1.5}
                  bgColor='blueGray.100'
                  alignItems='center'
                >
                  {item.icon}
                </Box>
                <VStack space={1}>
                  <Text color='black' fontSize='sm' bold>
                    {item.title}
                  </Text>
                  <Text color='muted.400' fontSize='xs'>
                    {item.description}
                  </Text>
                </VStack>
              </HStack>
              <AntDesign name='right' size={24} color='#ABABAB' />
            </Flex>
          </Pressable>
        ))}

        <Pressable
          onPress={() => {
            setLoading(true);
            deleteToken().then(() => {
              setLoading(false);
              dispatch(setCurrentUser({}));
            });
          }}
          isloading={loading}
        >
          {({ isPressed }) => (
            <Flex
              backgroundColor={isPressed ? 'muted.100' : '#fff'}
              alignItems='center'
              justifyContent='space-between'
              direction='row'
              rounded='xl'
            >
              <HStack alignItems='center' space={4} direction='row'>
                <Box borderRadius='full' p={1.5} bgColor='danger.100'>
                  <Ionicons name='log-out-outline' size={24} color='#F43F5E' />
                </Box>
                <VStack space={1}>
                  <Text color='danger.500' fontSize='sm' bold>
                    Đăng xuất
                  </Text>
                  <Text color='muted.400' fontSize='xs'>
                    Thoát khỏi hệ thống
                  </Text>
                </VStack>
              </HStack>
              <AntDesign name='right' size={24} color='#ABABAB' />
            </Flex>
          )}
        </Pressable>
      </VStack>
    </Box>
  );
}
