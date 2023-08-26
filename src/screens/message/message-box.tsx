import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  Avatar,
  Box,
  Flex,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
  KeyboardAvoidingView,
  FlatList,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { pushMessage, sendMessage, setMessages } from '@/store/reducer/message';
import { getToken } from '@/utils/token';
import { useKeyboard } from '@/hooks/useKeyboard';
import { io } from 'socket.io-client';
import { disableBottomTabBar } from '@/utils';
import { Platform, RefreshControl } from 'react-native';
import { useTopHeight } from '@/hooks/useHeaderHeight';
import { COLORS, API_BASE_URL, primaryLinear } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';

const socketUrl = 'ws://192.168.1.5:5000/message';

export default function MessageBox({ route }) {
  const { fromId } = route.params;
  const messageSectionId = route.params?.messageSectionId;
  const topHeight = useTopHeight();
  const dispatch = useAppDispatch();
  const isFocus = useIsFocused();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [messageText, setMessageText] = useState<string>('');
  const message = useAppSelector((state) => state.message);
  const allMessagesFromSection = message.messages;
  const navigation = useNavigation();
  const socketRef = useRef();
  const scrollRef = useRef();
  // *This function will handle send websocket message *//

  // * ------------------ Side effects to init websocket ------------------ * //
  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  // useEffect(() => {
  //   let socket;
  //   if (isFocus) {
  //     // get user token and then init websocket
  //     getToken().then((token) => {
  //       // hide bottom bar
  //       disableBottomTabBar(navigation);
  //       socket = io(socketUrl);
  //       socket.on('connect', () => {
  //         console.log(socket.id);
  //       })
  //       // const socket = io(socketUrl, {
  //       //   auth: {
  //       //     token,
  //       //   },
  //       //   query: {
  //       //     // only one is sent, the other one is gonna be null
  //       //     messageSectionId,
  //       //     receiverId: fromId,
  //       //   },
  //       // });
  //       // // * Add listners to socket * //
  //       // socket.on('connect', () => {
  //       //   console.log('Connected to websocket');
  //       // });
  //       // socket.emit('fetch-all-messages');
  //       // socket.on('client-all-past-messages', (data) => {
  //       //   dispatch(setMessages(data));
  //       //   scrollToBottom();
  //       // });
  //       // socket.on('client-receive-message', (data) => {
  //       //   dispatch(pushMessage({ message: data }));
  //       //   scrollToBottom();
  //       // });
  //       // socketRef.current = socket;
  //     });
  //   }

  //   return () => {
  //     disableBottomTabBar(navigation, { action: 'clean' });
  //     socket?.off('connect');
  //     socket?.off('client-all-past-messages');
  //     socket?.off('client-receive-message');
  //     socket?.disconnect();
  //     dispatch(setMessages({ messagees: [] }));
  // };
  // }, [isFocus, fromId, messageSectionId, navigation]);

  const sendMessageHandler = () => {
    if (messageText === '') return;
    dispatch(sendMessage({ messageText, socket: socketRef.current }));
    setMessageText('');
  };

  let pos = 'row-reverse';
  return (
    <KeyboardAvoidingView
      flex={1}
      keyboardVerticalOffset={95}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <VStack h='full'>
        <Box>
          <FlatList
            h='full'
            contentContainerStyle={{
              height: '100%',
              justifyContent: 'flex-end',
              paddingBottom: 80,
              paddingLeft: 16,
              paddingRight: 16,
            }}
            data={[
              {
                id: 1,
                message: 'Hello',
              },
              {
                id: 2,
                message: 'Hi guy fjsdhfjskhfkwerw-',
              },
              {
                id: 3,
                message: 'Hello kds34098',
              },
            ]}
            keyExtractor={(messageInSection) => String(messageInSection.id)}
            renderItem={({ item }) => {
              return (
                <Box
                  key={item.id}
                  maxWidth='3/4'
                  mt='auto'
                  ml='auto'
                  p='2'
                  mb='2'
                  borderRadius='2xl'
                  bg={primaryLinear}
                >
                  <Text fontSize={16} color='white'>
                    {item.message}
                  </Text>
                </Box>
              );
            }}
          />
        </Box>
        <Box mt='auto' bgColor='white' px='4' py='2'>
          <Input
            backgroundColor='#fff'
            type='text'
            value={messageText}
            placeholder='Aa'
            bgColor='gray.100'
            borderWidth='0'
            multiline
            size='xl'
            h='auto'
            borderRadius='3xl'
            maxH='24'
            onChangeText={(text) => setMessageText(text)}
            InputRightElement={
              <TouchableOpacity
                onPress={sendMessageHandler}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: 40,
                  top: 0,
                  right: 0,
                }}
              >
                <Ionicons
                  name='send-outline'
                  size={24}
                  color={COLORS.PRIMARY}
                />
              </TouchableOpacity>
            }
            // onKeyPress={(e) => {
            //   if (e.nativeEvent.key === 'Enter') sendMessageHandler();
            // }}
          />
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  );
}
