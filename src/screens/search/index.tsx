import React, { useEffect, useState } from 'react';
import { Box, Text, ScrollView, Select, CheckIcon } from 'native-base';
import { TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { disableBottomTabBar } from '@/utils';
import { selectAccommodationState, searchAccommodationByKeyword, filterByPrice } from '@/store/reducer/accommodation';
import { useSelector } from 'react-redux';
import SingleItem from '@/screens/explore/single-accommodation';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Loading from '@/components/loading';
import { PRICE_ASCENDING, PRICE_DECENDING, REVIEW_ASCENDING, REVIEW_DECENDING } from '@/constants';
import { useAppDispatch } from '@/hooks';

export default function SearchScreen(props: any) {
  const navigation = useNavigation();
  const { searchAccommodations, loading } = useSelector(selectAccommodationState);
  const [focusStyle, setFocusStyle] = useState({
    borderColor: 'muted.300',
    bgColor: '',
  });
  const [searchText, setSearchText] = useState('');
  const [filterValue, setFilterValue] = React.useState('');
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   disableBottomTabBar(navigation);
  //   return () =>
  //     disableBottomTabBar(navigation, {
  //       action: 'clean',
  //     });
  // }, [navigation]);

  const handleFilterChange = (itemValue) => {
    setFilterValue(itemValue);
    dispatch(filterByPrice(itemValue));
  };
  const submitSearchText = ({ nativeEvent }) => {
    dispatch(searchAccommodationByKeyword(nativeEvent.text)).then(() => setSearchText(nativeEvent.text));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Box padding='2'>
          <Box w='100%' {...focusStyle} borderWidth={1} rounded='md' flexDirection='row' alignItems='center' paddingX='1'>
            <Ionicons name='search-outline' size={24} color='#737373' />
            <TextInput
              placeholder='Tìm kiếm'
              returnKeyType='search'
              onSubmitEditing={submitSearchText}
              autoFocus
              clearButtonMode='while-editing'
              onFocus={() =>
                setFocusStyle({
                  bgColor: '0891B2:alpha.10',
                  borderColor: 'primary.600',
                })
              }
              onBlur={() =>
                setFocusStyle({
                  borderColor: 'muted.300',
                  bgColor: '0891B2:alpha.10',
                })
              }
              style={{
                height: 40,
                paddingLeft: 8,
                flex: 1,
              }}
            />
          </Box>
        </Box>

        {loading ? (
          <Loading />
        ) : (
          <Box alignItems='center' paddingX='2' height='full'>
            {searchAccommodations && searchAccommodations.length > 0 ? (
              <Text fontWeight='600'>Kết quả tìm kiếm cho &ldquo;{searchText}&ldquo;</Text>
            ) : (
              <Text fontWeight='600'>Không tìm thấy kết quả cho &ldquo;{searchText}&ldquo;</Text>
            )}
            {searchAccommodations && searchAccommodations.length > 0 && (
              <Select
                selectedValue={filterValue}
                minWidth='200'
                accessibilityLabel='Lọc theo'
                placeholder='Lọc theo'
                marginLeft='auto'
                _selectedItem={{
                  bg: 'tertiary.600',
                  endIcon: <CheckIcon size='5' color='white' />,
                  rounded: 'xl',
                  color: 'white',
                  _text: {
                    color: 'white',
                  },
                }}
                mt={1}
                onValueChange={(itemValue) => handleFilterChange(itemValue)}
              >
                <Select.Item label='Giá tăng dần' value={PRICE_ASCENDING} />
                <Select.Item label='Giá giảm dần' value={PRICE_DECENDING} />
                <Select.Item label='Đánh giá tăng dần' value={REVIEW_ASCENDING} />
                <Select.Item label='Đánh giá giảm dần' value={REVIEW_DECENDING} />
              </Select>
            )}
            <FlatList
              data={searchAccommodations}
              style={{
                width: '100%',
              }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AccommodationDetails', {
                      item,
                    })
                  }
                >
                  <SingleItem data={item} />
                </TouchableOpacity>
              )}
            />
          </Box>
        )}
      </>
    </TouchableWithoutFeedback>
  );
}
