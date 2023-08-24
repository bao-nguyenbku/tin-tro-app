import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { setCurrentUser } from '@/store/reducer/user';
import { deleteToken } from '@/utils/token';
import { ADMIN_ROUTES } from '@/navigation/map-screen-name';
import { COLORS } from '@/constants';

const iconStyles = {
  size: 24,
  color: 'black',
};
export default function AdminMenu({
  setLoading,
  dispatch,
  navigation,
}) {
  const menu = [
    {
      id: 1,
      title: 'Quản lý yêu cầu sửa chữa',
      description: 'Xem và quản lý yêu cầu từ người thuê',
      icon: <Ionicons name='person-outline' {...iconStyles} />,
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Yêu cầu trả phòng',
      description: 'Quản lý yêu cầu trả phòng',
      icon: <Ionicons name='checkmark-circle-outline' {...iconStyles} />,
      onPress: () => navigation.navigate(ADMIN_ROUTES.REQUEST_CHECKOUT_ROOM),
    },
    {
      id: 3,
      title: 'Hóa đơn',
      description: 'Quản lý hóa đơn',
      icon: <Ionicons name='document-text-outline' {...iconStyles} />,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Thống kê',
      description: 'Xem thống kê số lượng phòng, hóa đơn...',
      icon: <Ionicons name='stats-chart-outline' {...iconStyles} />,
      onPress: () => navigation.navigate(ADMIN_ROUTES.ROOM_STATISTICS),
    },
  ];

  return (
    <Box m='4' borderRadius='xl'>
      <VStack
        borderRadius='xl'
        space='4'
        bgColor='white'
        shadow='2'
        style={{
          shadowRadius: 8,
          shadowColor: '#9ca3af',
        }}
      >
        {menu.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            style={{
              padding: 8,
            }}
          >
            <HStack alignItems='center' space='2' direction='row'>
              <Box
                borderRadius='full'
                p='2'
                alignItems='center'
                justifyContent='center'
                bgColor={COLORS.CONTAINER}
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
              <Ionicons
                name='chevron-forward-outline'
                style={{ marginLeft: 'auto' }}
                size={24}
              />
            </HStack>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#fee2e2',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12
          }}
          onPress={() => {
            setLoading(true);
            deleteToken().then(() => {
              setLoading(false);
              dispatch(setCurrentUser(undefined));
            });
          }}
        >
          <HStack alignItems='center' space={4} direction='row'>
            <Box
              borderRadius='full'
              p={1.5}
              alignItems='center'
              justifyContent='center'
            >
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
            <Ionicons
              name='chevron-forward-outline'
              style={{ marginLeft: 'auto' }}
              size={24}
            />
          </HStack>
        </TouchableOpacity>
      </VStack>
    </Box>
  );
}
