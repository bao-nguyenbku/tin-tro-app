import React from 'react';
import { useAppSelector } from '@/hooks';
import { ScrollView } from 'react-native';
import { Box, Text, Image } from 'native-base';
// import { getRentRequestByRenter, selectAccommodationState } from '@/store/reducer/accommodation';
import { getRoomInfo, selectRentingState } from '@/store/reducer/renting';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CommonInfo from './CommonInfo';
import OwnerContact from './OwnerContact';
import Description from './Description';
import RequestRentalButton from './RequestRentalButton';
import ImageGallery from './ImageGallery';
import Utility from './Utility';
import { COLORS } from '@/constants';

const isCurrentRenting = (roomInfo, item) => {
  return (
    roomInfo.data?.accommodationId === item.id &&
    roomInfo.data?.status === 'RENTING'
  );
};

export default function AccommodationDetailsScreen(props: any) {
  const navigation = useNavigation();
  console.log("🚀 ~ file: index.tsx:26 ~ AccommodationDetailsScreen ~ navigation:", navigation.getState())
  const { route } = props;
  const item = route.params ? route.params.item : undefined;
  const { roomInfo } = useAppSelector(selectRentingState);
  // const rentRequestLoading = rentRequest.loading;

  const handlePressMessageIcon = () => {
    const owner = item?.owner;
    navigation.navigate('send-message', {
      // screen: 'send-message',
      params: {
        fromId: owner?.id,
        avatar: owner?.avatar,
        name: owner?.name,
      },
    });
  };
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: COLORS.CONTAINER,
        }}
      >
        <Box flex={1} p='4'>
          <Box bgColor='transparent'>
            <Box height='222px'>
              <Image
                source={{
                  uri: item?.thumbnail,
                }}
                defaultSource={require('@/assets/images/fallback-2.jpg')}
                alt='thumbnail'
                size='full'
                rounded='12'
              />
              <Box
                alignItems='center'
                flexDirection='row'
                position='absolute'
                top={1}
                right={1}
                bgColor='black:alpha.40'
                rounded='xl'
                p='1'
              >
                <Ionicons name='star-sharp' size={20} color='#FACC15' />
                <Text marginLeft='4px' color='white'>
                  {item?.reviewStar}
                </Text>
              </Box>
            </Box>
            <Text fontSize='2xl' fontWeight='700' marginTop='2'>
              {item?.name}
            </Text>
            <CommonInfo item={item} />
            <OwnerContact
              item={item}
              handlePressMessageIcon={handlePressMessageIcon}
            />
            <Description item={item} />
            <Utility item={item} />
            <ImageGallery images={item?.images} />
          </Box>
        </Box>
      </ScrollView>
      <Box px='4' pb='4'>
        {!isCurrentRenting(roomInfo, item) && (
          <RequestRentalButton item={item} />
        )}
      </Box>
    </>
  );
}
