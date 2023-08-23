import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, ScrollView } from 'native-base';
import { Pressable } from 'react-native';
import { getRecommendAccommodations, selectAccommodationState } from '@/store/reducer/accommodation';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '@/components/loading';
import RecommendSingleItem from './RecommendSingleItem';
import { useAppDispatch } from '@/hooks';
import { COLORS } from '@/constants';

const RecommendAccommodation = (props) => {
  const { navigation, stack } = props;
  const dispatch = useAppDispatch();
  const { recommendAccommodations, loading } = useSelector(selectAccommodationState);
  useEffect(() => {
    dispatch(getRecommendAccommodations());
  }, [dispatch]);
  if (loading) return <Loading />;
  if (recommendAccommodations && recommendAccommodations.length === 0) return <Box />;
  return (
    <LinearGradient colors={[COLORS.PRIMARY, 'transparent']} locations={[0.6, 0.6]}>
      <ScrollView horizontal indicatorStyle='default' showsHorizontalScrollIndicator={false}>
        <Box flexDirection='row' padding='4'>
          {recommendAccommodations &&
            recommendAccommodations.map((data) => {
              return (
                <Pressable key={data.id} onPress={() => navigation.navigate('AccommodationDetails', { item: data })}>
                  <RecommendSingleItem data={data} />
                </Pressable>
              );
            })}
        </Box>
      </ScrollView>
    </LinearGradient>
  );
};

export default RecommendAccommodation;
