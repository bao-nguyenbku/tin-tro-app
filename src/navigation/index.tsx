import Loading from '@/components/loading';
import { useAppSelector } from '@/hooks';
import UserBottomBar from '@/components/user-bottom-bar';
import AdminBottomBar from '@/components/admin-bottom-bar';
import { selectUserState } from '@/store/reducer/user';
import { USER_ROLE } from '@/constants';

export default function NavigationStore(props: any) {
  const { children } = props;
  const { currentUser, loading } = useAppSelector(selectUserState);
  if (loading) {
    return <Loading />;
  }
  if (currentUser.role === USER_ROLE.RENTER) {
    return <UserBottomBar {...props} />;
  }
  if (currentUser.role === USER_ROLE.OWNER) {
    return <AdminBottomBar {...props} />;
  }
  return null;
}
