import React from "react";
import { Text } from "native-base";

type Props = {
  message: string;
};
export default function EmptyMessage({ message }: Props) {
  return <Text>{message}</Text>;
}
