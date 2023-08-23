import { extendTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { COLORS } from '@/constants';

// For Stack Navigation
export const stackTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.CONTAINER,
  },
};

// For Native Base
export const theme = extendTheme({
  colors: {
    primary: {
      500: '#2F4858'
    }
  }
  // fontConfig: {
  //   SF: {
  //     // 100: {
  //     //   normal: "Roboto-Light",
  //     //   italic: "Roboto-LightItalic",
  //     // },
  //     // 200: {
  //     //   normal: "Roboto-Light",
  //     //   italic: "Roboto-LightItalic",
  //     // },
  //     // 300: {
  //     //   normal: "Roboto-Light",
  //     //   italic: "Roboto-LightItalic",
  //     // },
  //     // 400: {
  //     //   normal: "Roboto-Regular",
  //     //   italic: "Roboto-Italic",
  //     // },
  //     500: {
  //       normal: 'SFProDisplay-Medium',
  //     },
  //     // 600: {
  //     //   normal: "Roboto-Medium",
  //     //   italic: "Roboto-MediumItalic",
  //     // },
  //     // Add more variants
  //     //   700: {
  //     //     normal: 'Roboto-Bold',
  //     //   },
  //     //   800: {
  //     //     normal: 'Roboto-Bold',
  //     //     italic: 'Roboto-BoldItalic',
  //     //   },
  //     //   900: {
  //     //     normal: 'Roboto-Bold',
  //     //     italic: 'Roboto-BoldItalic',
  //     //   },
  //   },
  // },

  // Make sure values below matches any of the keys in `fontConfig`
  // fonts: {
  //   heading: 'SF',
  //   body: 'SF',
  //   mono: 'SF',
  // },
});

export const config = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  },
};