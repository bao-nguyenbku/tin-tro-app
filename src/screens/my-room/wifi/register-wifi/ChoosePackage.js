import React, { useState } from 'react';
import { Box, HStack, Text, Pressable } from 'native-base';
import { formatCurrency } from '@/utils';


const wifiPackage = [
  {
    speed: '52Mbps',
    price: 120000
  },
  {
    speed: '80Mbps',
    price: 190000
  },
  {
    speed: '120Mbps',
    price: 240000
  },
]

const ChoosePackage = (props) => {
  const { onChangeValue } = props;
  const [selected, setSelected] = useState(-1);
  const activeStyle = {
    bgColor: 'tertiary.50',
    borderWidth: 2,
    borderColor: 'tertiary.600'
  }
  const handleChange = (index) => {
    onChangeValue(wifiPackage[index]);
    setSelected(index);
  }
  return (
    <HStack
      flexDirection='row'
      w='full'
      marginLeft='-2'
      flexWrap='wrap'
    >
      {wifiPackage.map((item, index) => {
        return (
          <Pressable
            key={item.speed}
            width='150px'
            height='20'
            margin='2'
            onPress={() => handleChange(index)}
          >
            <Box
              bgColor={index === selected ? activeStyle.bgColor: 'blueGray.100'}
              borderColor={index === selected ? activeStyle.borderColor : 'tertiary.600'}
              borderWidth={index === selected ? activeStyle.borderWidth : 0}
              rounded='xl'
              alignItems='center'
              justifyContent='center'
              flex={1}
            >
              <Text fontSize='md'>{item.speed}</Text>
              <Text fontWeight='700' color='tertiary.600' fontSize='lg'>{formatCurrency(item.price)}</Text>
            </Box>
          </Pressable>
        )
      })}
    </HStack>
  )
}

export default ChoosePackage;

