export enum USER_ROLE {
  RENTER = 'USER',
  OWNER = 'ADMIN',
}

export interface IUser {
  id: number | string;
  email: string;
  name: string;
  role: USER_ROLE;
  avatar: string;
}
