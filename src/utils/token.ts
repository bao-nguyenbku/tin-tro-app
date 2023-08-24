// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const jwtParse = (accessToken: string) => {
  const decoded = jwt_decode(accessToken);
  return decoded;
};

export const tokenKey = 'accessToken';

export const setToken = async (accessToken: string) => {
  try {
    return AsyncStorage.setItem(tokenKey, accessToken);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(tokenKey);
    if (token) return token;
    return false;
  } catch (err) {
    return false;
  }
};

export const deleteToken = async () => {
  try {
    return AsyncStorage.removeItem(tokenKey);
  } catch (err) {
    console.log(err);
    return false;
  }
};
