export const PRICE_ASCENDING = 'price-asc';
export const PRICE_DECENDING = 'price-dec';
export const REVIEW_ASCENDING = 'review-asc';
export const REVIEW_DECENDING = 'review-dec';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
export enum COLORS {
  PRIMARY = '#2F4858',
  PRIMARY_2 = '#486677',
  CONTAINER = '#F6FBFB',
  WHITE = '#fff',
  IN_ACTIVE = '#9ca3af',
}

export const CONFIRM_MODAL = {
  SUCCESS: COLORS.PRIMARY,
  DELETE: 'danger.600',
};

export enum USER_ROLE {
  RENTER = 'USER',
  OWNER = 'ADMIN',
}



export const primaryLinear = {
  linearGradient: {
    colors: [COLORS.PRIMARY_2, COLORS.PRIMARY],
    start: [0, 0],
    end: [1, 0],
  },
};
