import { Image as Img, IImageProps } from "native-base";

const fallbackImg = require('@/assets/images/fallback-2.jpg');

export default function Image (props: IImageProps) {
  const { source, ...rest } = props;
  if (typeof source === 'string' && !source) {
    return <Img source={fallbackImg} {...rest}/>
  }
  if (Array.isArray(source)) {
    return null;
  }
  if (typeof source !== 'number' && !source.uri) {
    return <Img source={fallbackImg} {...rest} bg='muted.300'/>
  }
  return <Img source={source} {...rest} fallbackSource={fallbackImg}/>
}