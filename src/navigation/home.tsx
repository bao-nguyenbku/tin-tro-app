import React from 'react';
import { useAppSelector } from '@/hooks';
import { Box } from 'native-base';
import { selectUserState } from '@/store/reducer/user';
import UserBottomBar from '@/components/user-bottom-bar';
import AdminBottomBar from '@/components/admin-bottom-bar';
import Loading from '@/components/loading';
import { USER_ROLE } from '@/constants';

export default function Home() {
  const { currentUser, loading } = useAppSelector(selectUserState);
  if (loading) {
    return <Loading />;
  }
  if (currentUser.role === USER_ROLE.RENTER) {
    return <UserBottomBar />;
  }
  if (currentUser.role === USER_ROLE.OWNER) {
    return <AdminBottomBar />;
  }
  return null;
};
