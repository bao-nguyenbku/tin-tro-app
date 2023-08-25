import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  FormControl,
  KeyboardAvoidingView,
  ScrollView,
  useToast,
  Text,
  Badge,
  HStack,
  useDisclose,
} from 'native-base';
import Input from '@/components/ui/input';

import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorMessage from '@/components/common/error-message';
import {
  createNewRoom,
  deleteRoom,
  editRoom,
} from '@/store/reducer/accommodation';
import ConfirmModal from '@/components/confirm-modal';
import { useAppDispatch, useAppSelector } from '@/hooks';

const mapRoomStatusToText = (roomStatus) => {
  switch (roomStatus) {
    case 'AVAILABLE':
      return 'Còn trống';
    case 'RENTING':
      return 'Đang thuê';
    default:
      return 'Không xác định';
  }
};

const newRoomSchema = yup.object().shape({
  roomName: yup.string().required('Tên phòng không được để trống'),
  personNumber: yup.number(),
});

export default function CreateNewRooom({ navigation, route }) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { error } = useAppSelector((state) => state.accommodation);
  const { isOpen, onOpen, onClose } = useDisclose();

  const isEdit = route.params?.isEdit;
  const room = route.params?.room;

  const handleDeleteRoom = () => {
    dispatch(
      deleteRoom({
        roomId: room.id,
        done: () => {
          toast.show({
            title: 'Xóa phòng thành công',
            status: 'success',
            duration: 2000,
            isClosable: true,
            placement: 'top',
          });
          navigation.goBack();
        },
      })
    );
  };

  const handleSubmitNewRoom = (values) => {
    if (!isEdit) {
      dispatch(
        createNewRoom({
          values,
          done: () => {
            toast.show({
              title: 'Tạo phòng thành công',
              status: 'success',
              duration: 2000,
              isClosable: true,
              placement: 'top',
            });
            navigation.goBack();
          },
        })
      );
    } else {
      dispatch(
        editRoom({
          values,
          roomId: room.id,
          done: () => {
            toast.show({
              title: 'Cập nhật phòng thành công',
              status: 'success',
              duration: 2000,
              isClosable: true,
              placement: 'top',
            });
            navigation.goBack();
          },
        })
      );
    }
  };

  useEffect(() => {
    if (isEdit) {
      navigation.setOptions({
        title: 'Chi tiết phòng',
      });
    }
  });

  return (
    <KeyboardAvoidingView w='100%' alignItems='center' flex={1}>
      <ScrollView w='100%' py={4} h='full'>
        <Center>
          <Heading fontSize={20}> Thông tin chung </Heading>
          {isEdit && (
            <Badge
              mt={1}
              variant='subtle'
              colorScheme={room.status === 'RENTING' ? 'error' : 'success'}
              alignSelf='center'
            >
              {mapRoomStatusToText(room.status)}
            </Badge>
          )}
          <Text color='danger.500'> {error} </Text>
        </Center>
        <Box alignItems='center' h='full' p='4'>
          <Formik
            validationSchema={newRoomSchema}
            initialValues={{
              roomName: !isEdit ? '' : room.roomName,
              personNumber: !isEdit ? '' : room.personNumber.toString(),
            }}
            onSubmit={(values) => handleSubmitNewRoom(values)}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              isValid,
              errors,
              touched,
            }) => (
              <FormControl h='full'>
                <Box mb={6}>
                  <FormControl.Label isRequired>Tên phòng</FormControl.Label>
                  {errors.roomName && touched.roomName && (
                    <ErrorMessage name='roomName' errors={errors} />
                  )}
                  <Input
                    placeholder='Tên phòng'
                    value={values.roomName}
                    onChangeText={handleChange('roomName')}
                    onBlur={handleBlur('roomName')}
                  />
                </Box>
                <Box mb={6}>
                  <FormControl.Label isRequired>
                    Số người tối đa
                  </FormControl.Label>
                  {errors.personNumber && touched.personNumber && (
                    <ErrorMessage name='personNumber' errors={errors} />
                  )}
                  <Input
                    placeholder='Số người tối đa'
                    value={values.personNumber}
                    onChangeText={handleChange('personNumber')}
                    onBlur={handleBlur('personNumber')}
                  />
                </Box>
                {!isEdit ? (
                  <Button
                    onPress={() => handleSubmit()}
                    bgColor='primary.500'
                    mt='16'
                    _text={{
                      fontSize: 'lg',
                    }}
                    isDisabled={!isValid}
                    h='16'
                    borderRadius='xl'
                  >
                    Tạo phòng
                  </Button>
                ) : (
                  <HStack space={3} mt='10' justifyContent='flex-end' h='16'>
                    <Button
                      onPress={onOpen}
                      flex={1}
                      h='full'
                      _text={{
                        fontSize: 'lg',
                      }}
                      isDisabled={room.status !== 'AVAILABLE'}
                      bg={
                        room.status === 'AVAILABLE' ? 'danger.500' : 'muted.200'
                      }
                      borderRadius='xl'
                    >
                      Xóa
                    </Button>
                    <Button
                      onPress={() => handleSubmit()}
                      bgColor='primary.500'
                      borderRadius='xl'
                      _text={{
                        fontSize: 'lg',
                      }}
                      flex={1}
                      h='full'
                    >
                      Cập nhật
                    </Button>
                  </HStack>
                )}
              </FormControl>
            )}
          </Formik>
        </Box>
        <ConfirmModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          onConfirm={handleDeleteRoom}
          cancelTitle='Hủy'
          headerTitle='Bạn chắc chắn muốn xóa?'
          content='Sau khi nhấn “Đồng ý”, phòng sẽ bị xóa khỏi hệ thống và không thể khôi phục.'
          saveTitle='Đồng ý'
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
