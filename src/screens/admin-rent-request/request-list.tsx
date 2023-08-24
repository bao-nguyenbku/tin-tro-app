import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConfirmModal from '@/components/confirm-modal';
import Loading from '@/components/loading';
import {
  Button,
  Center,
  Heading,
  HStack,
  Menu,
  Pressable,
  Text,
  useDisclose,
  useToast,
  VStack,
  Avatar,
  FlatList,
} from 'native-base';
import { RefreshControl, Linking, SafeAreaView } from 'react-native';

import {
  assignUserToRoom,
  deleteRentRequestById,
  getRentRequestsAdmin,
} from '@/store/reducer/accommodation';
import { formatDate } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import EmptyMessage from '@/components/common/empty-message';

const UserRequestCard = ({
  id,
  name,
  phone,
  createdAt,
  avatar,
  navigation,
  details,
  dispatch,
  loading,
  rentRequestId,
}) => {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const [position] = useState('auto');
  return (
    <VStack
      bg='white'
      space='4'
      rounded='xl'
      justifyContent='space-between'
      px='3'
      pt='3'
    >
      <HStack justifyContent='space-between'>
        <HStack alignItems='center' space={4}>
          <Avatar source={{ uri: avatar }} size='md' />
          <VStack>
            <Heading fontSize='xl' bold>
              {name}
            </Heading>
            <Text fontSize={14} color='muted.500'>
              {phone}
            </Text>
          </VStack>
        </HStack>
        <HStack justifyContent='space-between' space={3} alignItems='center'>
          <Pressable
            onPress={() => {
              navigation.getParent().navigate('Message', {
                screen: 'SendMessage',
                params: {
                  fromId: id,
                  avatar,
                  name,
                },
                initial: false,
              });
            }}
          >
            {({ isPressed }) => (
              <Center
                w={42}
                h={42}
                borderRadius={12}
                bg={isPressed ? '#fff' : 'warmGray.100'}
              >
                <Ionicons
                  name='chatbubble-ellipses'
                  size={24}
                  color='#737373'
                />
              </Center>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL(`tel://${phone}`);
            }}
          >
            {({ isPressed }) => (
              <Center
                w={42}
                h={42}
                borderRadius={12}
                bg={isPressed ? '#fff' : 'warmGray.100'}
              >
                <Ionicons name='call' size={24} color='#737373' />
              </Center>
            )}
          </Pressable>
        </HStack>
      </HStack>

      <HStack justifyContent='space-between'>
        <VStack>
          <Text color='muted.500'>Đã yêu cầu lúc:</Text>
          <Text color='muted.500'>{formatDate(createdAt)}</Text>
        </VStack>
        <HStack space={2}>
          <Button
            isLoading={loading}
            onPress={onOpen}
            variant='ghost'
            _text={{ color: 'danger.500' }}
          >
            Từ chối
          </Button>
          <Menu
            shouldOverlapWithTrigger={shouldOverlapWithTrigger}
            placement={position === 'auto' ? undefined : (position as any)}
            trigger={(triggerProps) => (
              <Button isLoading={loading} {...triggerProps} bg='primary.500'>
                Chấp nhận
              </Button>
            )}
          >
            {details.rooms
              .filter((room) => room.status === 'AVAILABLE')
              .map((room) => (
                <Menu.Item
                  onPress={() => {
                    dispatch(
                      assignUserToRoom({
                        roomId: room.id,
                        userId: id,
                        done: () => {
                          toast.show({
                            title: 'Chấp nhận thành công',
                            status: 'success',
                            duration: 2000,
                            placement: 'top',
                          });
                        },
                      })
                    );
                  }}
                  key={room.id}
                  textValue={room.roomName}
                >
                  {room.roomName}
                </Menu.Item>
              ))}
          </Menu>
        </HStack>
      </HStack>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirm={() => {
          dispatch(
            deleteRentRequestById({
              id: rentRequestId,
              done: () => {
                toast.show({
                  title: 'Xóa thành công',
                  status: 'success',
                  duration: 2000,
                  placement: 'top',
                });
              },
            })
          );
        }}
        cancelTitle='Hủy'
        headerTitle='Bạn chắc chắn muốn xóa?'
        content='Sau khi nhấn “Đồng ý”, Yêu cầu sẽ bị xóa vĩnh viễn.'
        saveTitle='Đồng ý'
      />
    </VStack>
  );
};

export default function RequestList(props: any) {
  const accommodation = useAppSelector((state) => state.accommodation);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getRentRequestsAdmin());
  }, []);

  if (accommodation.loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {accommodation.adminRentRequests.length ? (
        <VStack px='4' pt='4'>
          <FlatList
            h='full'
            refreshControl={
              <RefreshControl
                refreshing={accommodation.loading}
                onRefresh={() => dispatch(getRentRequestsAdmin())}
              />
            }
            data={accommodation.adminRentRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <UserRequestCard
                  key={item.id}
                  name={item.renter.user.name}
                  avatar={item.renter.user.avatar}
                  phone={item.renter.user.phone}
                  createdAt={item.renter.user.createdAt}
                  id={item.renter.user.id}
                  navigation={navigation}
                  details={accommodation.accommodationDetails}
                  dispatch={dispatch}
                />
              );
            }}
          />
        </VStack>
      ) : (
        <EmptyMessage message='Không có yêu cầu thuê phòng' />
      )}
    </SafeAreaView>
  );
}
