import React from 'react';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchIcon = (props) => {
  const navigation = useNavigation();
  return (
    <Box marginLeft="auto" marginRight={2}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchAccommodation')}
      >
        <Ionicons name="search-outline" size={32} color="white" />
      </TouchableOpacity>
    </Box>
  )
}

export default SearchIcon;
