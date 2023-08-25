import React, { useEffect } from 'react';
import { fetchMessageSections } from '@/store/reducer/message';
import Loading from '@/components/loading';
import ErrorMessage from '@/components/common/error-message';
import { Avatar, Flex, Heading, HStack, Pressable, ScrollView, Text, VStack } from 'native-base';
import { formatDate } from '@/utils';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks';
import EmptyMessage from '@/components/common/empty-message';

export default function MessageList(props: any) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { messageSections, loading, error } = useAppSelector((state) => state.message);
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) dispatch(fetchMessageSections());
  }, [isFocus]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage errors={error} />;

  return !messageSections.filter((messageSection) => messageSection.messages.length > 0).length ? (
    <EmptyMessage message='Bạn không có tin nhắn nào'/>
  ) : (
    <ScrollView
      refreshControl={<RefreshControl refreshing={loading} onRefresh={() => dispatch(fetchMessageSections())} />}
      h='100%'
      backgroundColor='coolGray.100'
    >
      <VStack py='4' h='100%' space={1}>
        {messageSections.map((section) => {
          const messages = section.messages;
          const from = messages.length && messages[0].from;
          const fromId = messages.length && messages[0].fromId;
          const otherUser = section.users.find((userInSection) => userInSection.id !== user.currentUser.id);

          return !messages.length ? null : (
            <Pressable
              onPress={() =>
                navigation.navigate('SendMessage', {
                  messageSectionId: section.id,
                  fromId: user.currentUser.id === fromId ? otherUser.id : fromId,
                  avatar: user.currentUser.id === fromId ? otherUser.avatar : from.avatar,
                  name: user.currentUser.id === fromId ? otherUser.name : from.name,
                })
              }
              my='2'
              h='100px'
              key={section.id}
              w='full'
            >
              {({ isPressed }) => (
                <HStack borderRadius={12} h='full' alignItems='center' mx='6' space={2} backgroundColor={isPressed ? 'muted.200' : '#fff'} px='4'>
                  <Flex mr={2} pr={2} w='1/6'>
                    <Avatar size='md' borderRadius='full' source={{ uri: otherUser.avatar }} />
                  </Flex>
                  <VStack w='1/2' space={1.5}>
                    <Heading fontSize='md' color='#000'>
                      {otherUser.name}
                    </Heading>

                    <Text isTruncated maxW='300' noOfLines={1} fontSize='xs' color='muted.500'>
                      {fromId === user?.currentUser?.id && 'Bạn: '} {messages[0].text}
                    </Text>
                  </VStack>
                  <Flex wrap='wrap' left={4} w='auto' mt='12' h='full'>
                    <Text color='muted.500' fontSize='xs'>
                      {formatDate(messages[0].createdAt, 'MM/DD HH:mm')}
                    </Text>
                  </Flex>
                </HStack>
              )}
            </Pressable>
          );
        })}
      </VStack>
    </ScrollView>
  );
}
