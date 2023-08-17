import React from "react";
import { Box, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "@/utils"; 
import { useDispatch } from "react-redux";
import { deleteWifi } from "@/store/reducer/wifi";
import { formatCurrency } from "@/utils";
import DeleteRegister from "./DeleteRegister";

const ParkingBill = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteWifi(data.id));
  }
  return (
    <Box
      bgColor='white'
      borderColor='muted.500'
      borderWidth='1'
      borderStyle='dashed'
      rounded='xl'
      p='4'
    >
      <Box
        alignItems='center'
      >
        <Ionicons name="checkmark-circle" size={40} color='#22C55E' />
        <Text color='success.500' fontSize='2xl'>Đã thanh toán</Text>
      </Box>
      <Box>
        <Text>Ngày bắt đầu</Text>
        <Box
          bgColor='blueGray.100'
          rounded='xl'
          p='4'
        >
          <Text fontSize='md' fontWeight='700'>{formatDate(data.startDate)}</Text>
        </Box>
      </Box>
      <Box
        marginTop='4'
      >
        <Text>Giá gói</Text>
        <Box
          bgColor='blueGray.100'
          rounded='xl'
          p='4'
        >
          <Text fontSize='md' fontWeight='700'>{formatCurrency(data.price)}</Text>
        </Box>
      </Box>
      <Box
        marginTop='4'
        marginBottom='20'
      >
        <Text>Dung lượng</Text>
        <Box
          bgColor='blueGray.100'
          rounded='xl'
          p='4'
        >
          <Text fontSize='md' fontWeight='700'>{data.speed}</Text>
        </Box>
      </Box>
      <DeleteRegister 
        onPress={handleDelete}
      />
    </Box>
  )
}

export default ParkingBill;