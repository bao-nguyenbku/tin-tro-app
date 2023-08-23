import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAppDispatch } from '@/hooks';
import { Box, Text } from 'native-base';
import { RefreshControl, TouchableOpacity, ScrollView, FlatList, TouchableHighlight, Pressable } from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { getAllAccommodations, selectAccommodationState, getRecommendAccommodations } from '@/store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';
import SingleItem from './single-accommodation';
import SearchIcon from './SearchIcon';
import RecommendAccommodation from './recommend-accommodation';

const AccommodationListScreen = (props: any) => {
  // const { navigation } = props;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  // const bottomBarHeight = useBottomTabBarHeight();
  async function fetchAllAccommodationData() {
    dispatch(getAllAccommodations());
    // dispatch(getRecommendAccommodations());
  }

  const { accommodations, loading } = useSelector(selectAccommodationState);
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchAllAccommodationData();
  //   }, [navigation])
  // );
  useEffect(() => {
    fetchAllAccommodationData();
  }, []);
  // useLayoutEffect(() => {
  //   if (isFocused) {
  //     navigation.setOptions({
  //       headerRight: () => <SearchIcon {...props} />,
  //       title: 'Tìm phòng trọ'
  //     });
  //   }
  //   return () => navigation.setOptions(undefined);
  // }, [isFocused]);
  return (
    <>
      <RecommendAccommodation {...props} />
      <Box paddingX='2' marginTop='8' height='full'>
        <Text fontSize='xl' fontWeight='700'>
          Tiềm năng
        </Text>
        <FlatList
          data={accommodations}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchAllAccommodationData()} />}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.getParent().navigate('AccommodationDetails', {
                    item,
                  })
                }
                key={item.id}
              >
                <SingleItem data={item} />
              </Pressable>
            );
          }}
        />
      </Box>
    </>
  );
};

function arePropsEqual(prevProps: any, currProps: any) {
  // return prevProps.navigation.getState().key === currProps.navigation.getState().key;
  return true;
}
export default memo(AccommodationListScreen, arePropsEqual);
