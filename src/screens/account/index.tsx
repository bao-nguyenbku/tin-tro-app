import React, { useState } from 'react';
import * as FormData from 'form-data';
import { Avatar, Center, Pressable, ScrollView, Text, useToast, VStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RefreshControl } from 'react-native';
import { authMe } from '@/store/reducer/user';
import * as ImagePicker from 'expo-image-picker';
import sendFileRequest from '@/utils/sendFileRequest';
import CustomToast from '@/components/custom-toast';
import Loading from '@/components/loading';
import UserMenu from './UserMenu';
import AdminMenu from './AdminMenu';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { USER_ROLE } from '@/types/data-types';

const mapRoleToText = (role) => {
  switch (role) {
    case 'USER':
      return 'Thuê trọ';
    case 'ADMIN':
      return 'Quản trị';
    default:
      return 'Khách';
  }
};

export default function AccountMenu (props) {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      const uri = result.assets[0].uri;
      const fileExtension = uri.substr(uri.lastIndexOf('.') + 1);

      formData.append('file', {
        name: `${new Date()}_avatar.${fileExtension}`,
        uri,
        type: `image/${fileExtension}`,
      });
      try {
        await sendFileRequest.post('/users/upload-avatar', formData);
        toast.show({
          render: () => <CustomToast title='Cập nhật ảnh đại diện thành công.' status='success' />,
          placement: 'top',
        });
        setImage(result.assets[0].uri);
      } catch (err) {
        return false;
      }
    }
  };
  if (user.loading) {
    return <Loading />;
  }
  return (
    <ScrollView mb={12} refreshControl={<RefreshControl refreshing={user.loading} onRefresh={() => dispatch(authMe())} />}>
      <VStack py={4}>
        <Center>
          <Pressable onPress={pickImage}>
            <Avatar
              size={127}
              borderRadius={127}
              bg='muted.300'
              source={{
                uri: !image ? user.currentUser.avatar : image,
              }}
              alt={user.currentUser.name}
            >
              <Ionicons name='image-outline' size={40}/>
            </Avatar>
          </Pressable>
          <Text pt={2} color='tertiary.600' bold fontSize='2xl'>
            {user.currentUser.name}
          </Text>
          <Text color='muted.500'>{user.currentUser.role ? mapRoleToText(user.currentUser.role) : 'Khách'}</Text>
        </Center>

        {user.currentUser.role === USER_ROLE.RENTER && <UserMenu loading={loading} setLoading={setLoading} dispatch={dispatch} {...props} />}
        {user.currentUser.role === USER_ROLE.OWNER && <AdminMenu loading={loading} setLoading={setLoading} dispatch={dispatch} {...props} />}
      </VStack>
    </ScrollView>
  );
};

