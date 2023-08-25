import React, { useCallback, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  Box,
  Center,
  FlatList,
  Flex,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { Dimensions, RefreshControl } from 'react-native';
import { fetchAccomodationByOwnerId } from '@/store/reducer/accommodation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ADMIN_ROUTES } from '@/navigation/map-screen-name';

const mapRoomStatusToText = (roomStatus) => {
  switch (roomStatus) {
    case 'AVAILABLE':
      return 'Còn trống';
    case 'RENTING':
      return 'Đã thuê';
    default:
      return 'Không xác định';
  }
};

const HeaderAdminMyAccomodation = ({ details }) => {
  const { width } = Dimensions.get('window');
  const countRentingRoom = details.rooms.filter(
    (room) => room.status === 'RENTING'
  ).length;
  const countAvailableRoom = details.rooms.filter(
    (room) => room.status === 'AVAILABLE'
  ).length;

  return (
    <VStack px={4} h='165px'>
      <Center>
        <Image
          source={{ uri: details.thumbnail }}
          alt={details.name}
          size={width}
          position='absolute'
          blurRadius={2}
        />
      </Center>
      <VStack
        px={4}
        bg='#fff'
        py={2}
        borderRadius={12}
        height='3/4'
        zIndex={2}
        top={100}
      >
        <Center w='full' mb={4}>
          <Heading size='lg'>{details.name}</Heading>
          <Text color='muted.500'>
            {details.addressNumber}, {details.addressStreet},{' '}
            {details.addressDistrict}
          </Text>
        </Center>
        <Flex justify='space-between' flexDir='row'>
          <Text color='error.500'>Đã thuê {countRentingRoom} phòng</Text>
          <Text color='tertiary.500'>{countAvailableRoom} phòng còn trống</Text>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default function AdminMyAccommodation(props: any) {
  const accommodation = useAppSelector((state) => state.accommodation);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAccomodationByOwnerId());
    }, [])
  );

  const details = accommodation.accommodationDetails;
  useEffect(() => {
    if (details.thumbnail) {
      navigation.setOptions({
        header: () => <HeaderAdminMyAccomodation details={details} />,
      });
    }
    return () => {
      navigation.setOptions({
        headerShown: undefined,
        headerTintColor: undefined,
        header: undefined,
      });
    };
  }, [details]);

  return (
    <Box px='4'>
      <HStack pt={24} alignItems='center' justifyContent='space-between'>
        <Text fontSize={20}>Phòng trọ của tôi</Text>
        <Pressable
          onPress={() =>
            navigation.navigate(ADMIN_ROUTES.CREATE_NEW_ROOM as never)
          }
          bgColor='primary.500'
          borderRadius='full'
          p='2'
        >
          <Ionicons
            name='add-outline'
            size={24}
            color='white'
            style={{ alignItems: 'center', justifyContent: 'center' }}
          />
        </Pressable>
      </HStack>

      <FlatList
        h='full'
        pt='6'
        _contentContainerStyle={{
          flexDirection: 'row',
        }}
        refreshControl={
          <RefreshControl
            refreshing={accommodation.loading}
            onRefresh={() => dispatch(fetchAccomodationByOwnerId())}
          />
        }
        data={details.rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Pressable
              key={item.id}
              w='full'
              p='1'
              onPress={() =>
                navigation.navigate(ADMIN_ROUTES.CREATE_NEW_ROOM, {
                  isEdit: true,
                  room: item,
                })
              }
            >
              <Center
                bgColor='white'
                p='1'
                px='2'
                borderRadius='xl'
                shadow='2'
                style={{
                  shadowRadius: 10,
                  shadowOpacity: 0.1,
                }}
              >
                <VStack
                  alignItems='center'
                  justifyContent='center'
                  py={2.5}
                  space={2}
                >
                  <Box
                    w={84}
                    h={84}
                    alignItems='center'
                    justifyContent='center'
                    bg={
                      item.status === 'AVAILABLE' ? 'success.200' : 'error.100'
                    }
                    borderRadius='full'
                  >
                    <Text
                      isTruncated
                      fontWeight='700'
                      noOfLines={1}
                      color={
                        item.status === 'AVAILABLE'
                          ? 'tertiary.600'
                          : 'error.600'
                      }
                    >
                      {item.roomName}
                    </Text>
                  </Box>
                  <Text
                    bold
                    color={
                      item.status === 'AVAILABLE' ? 'tertiary.600' : 'error.600'
                    }
                  >
                    {mapRoomStatusToText(item.status)}
                  </Text>
                </VStack>
              </Center>
            </Pressable>
          );
        }}
      />
    </Box>
  );
}
