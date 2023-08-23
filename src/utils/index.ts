import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

const parseOption = ['DD/MM/YYYY HH:mm', 'MM/DD/YYYY HH:mm'];
export const formatDate = (date: string | Dayjs, type?: string): string => {
  if (_.isEmpty(date)) return 'Invalid date';
  const formatStr = type ? type : 'DD/MM/YYYY h:mm A';
  if (dayjs(date).isValid()) {
    return dayjs(date).format(formatStr);
  }
  return dayjs(date, parseOption).format(formatStr);
};

export const formatCurrency = (num: number) => {
  if (typeof num === 'number') {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'đ';
  }
  return 0;
};

type Options = {
  action: 'disable' | 'clean';
};
export const disableBottomTabBar = (navigation: any, options?: Options) => {
  if (!options || !options.action || options.action === 'disable') {
    return navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }
  const { action } = options; 
  if (action === 'clean') {
    return navigation.getParent()?.setOptions({
      tabBarStyle: undefined,
    });
  }

  
};
