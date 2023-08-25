import React, { useState } from 'react';
import { Box, Button, Center, Flex, Heading, Input, Pressable, VStack, Text, FormControl, KeyboardAvoidingView } from 'native-base';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { logIn } from '@/store/reducer/user';
import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorMessage from '@/components/common/error-message';
import { useTopHeight } from '@/hooks/useHeaderHeight';
import { Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { COLORS, primaryLinear } from '@/constants';

const loginSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Mật khẩu không được để trống'),
});

export default function LoginScreen() {
  const user = useAppSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const topHeight = useTopHeight();
  const handleSubmitLogin = async ({ email, password }) => {
    // done: navigate to home screen

    dispatch(
      logIn({
        email,
        password,
        done: () => {},
      })
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.OS === 'ios' && topHeight}
      >
        <VStack w='100%' space={3} alignItems='center'>
          <Center w='100%' h='1/3'>
            <Heading size='xl' color={COLORS.PRIMARY}>
              {' '}
              Chào mừng trở lại{' '}
            </Heading>
            <Text fontSize='lg'>Đăng nhập vào <Text bold>TinTro</Text> ngay</Text>
            {user.error && <Text color='danger.600'>{user.error}</Text>}
          </Center>
          <Center h='1/3' px='3.5' w='100%' alignItems='center' justifyContent='center'>
            <Formik validationSchema={loginSchema} initialValues={{ email: '', password: '' }} onSubmit={(values) => handleSubmitLogin(values)}>
              {({ handleChange, handleSubmit, handleBlur, values, isValid, errors, touched }) => (
                <FormControl>
                  <Box mb='3.5'>
                    {errors.email && touched.email && <ErrorMessage name='email' errors={errors} />}
                    <Input
                      InputLeftElement={
                        <Box pl='3.5'>
                          <MaterialCommunityIcons name='email-outline' size={24} color='grey' />
                        </Box>
                      }
                      size='lg'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      height='16'
                      borderRadius='xl'
                      bgColor='gray.200'
                      w='100%'
                      placeholder='Email'
                      keyboardType='email-address'
                    />
                  </Box>
                  <Box>
                    <Input
                      px='3'
                      w='100%'
                      size='lg'
                      InputLeftElement={
                        <Box pl='3.5'>
                          <Ionicons name='lock-closed-outline' size={24} color='grey' />
                        </Box>
                      }
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      bgColor='gray.200'
                      height='16'
                      value={values.password}
                      type={show ? 'text' : 'password'}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Box mx='3.5'>
                            <MaterialIcons color='grey' size={24} name={show ? 'visibility' : 'visibility-off'} />
                          </Box>
                        </Pressable>
                      }
                      borderRadius='xl'
                      placeholder='Password'
                    />
                  </Box>
                  <Flex h='auto' mt={12} w='100%'>
                    <Box bg={primaryLinear} w='full' borderRadius='full'>
                      <Button isLoading={user.loading} backgroundColor='transparent' disabled={!isValid} onPress={() => handleSubmit()} h='16' borderRadius='xl'>
                        <Heading size='lg' color='white'>
                          Đăng nhập
                        </Heading>
                      </Button>
                    </Box>
                  </Flex>
                </FormControl>
              )}
            </Formik>
          </Center>

          <Flex pt='12' h='1/3'>
            <Text fontSize='lg' color='text.500'>
              Chưa có tài khoản?{' '}
              <Text bold color='primary.500' onPress={() => navigation.navigate('Register')}>
                Tạo ngay
              </Text>
            </Text>
          </Flex>
        </VStack>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
