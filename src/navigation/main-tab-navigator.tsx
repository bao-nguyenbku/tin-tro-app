import UserBottomBar from '@/components/user-bottom-bar';
import AdminBottomBar from '@/components/admin-bottom-bar';
import { useAppSelector } from '@/hooks';
import Loading from '@/components/loading';
import { USER_ROLE } from '@/types/data-types';

export default function MainTabNavigator(props: any) {
  const { currentUser, loading, loggedIn } = useAppSelector((state) => state.user);
  if (loading) {
    return <Loading />;
  }
  if (!loading && loggedIn && currentUser && currentUser.role === USER_ROLE.OWNER) {
    return <AdminBottomBar {...props} />;
  }
  if (!loading && loggedIn && currentUser && currentUser.role === USER_ROLE.RENTER) {
    return <UserBottomBar {...props} />;
  }
}
