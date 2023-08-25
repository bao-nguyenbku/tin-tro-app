import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from './hooks';
import { authMe } from '@/store/reducer/user';
import Loading from '@/components/loading';
import LoginScreen from '@/screens/login';
import RegisterScreen from '@/screens/register';
import AccommodationList from '@/screens/explore/accommodation-list';
import AccommodationDetailsScreen from '@/screens/explore/accommodation-details';
import MainTabNavigator from '@/navigation/main-tab-navigator';
import RoomMenu from '@/screens/my-room/RoomMenu';
import ParkingScreen from '@/screens/my-room/parking';
import RegisterParking from '@/screens/my-room/parking/register-parking';
import WifiScreen from '@/screens/my-room/wifi';
import RegisterWifi from '@/screens/my-room/wifi/register-wifi';
import { enableScreens } from 'react-native-screens';
import RentRequestScreen from '@/screens/rent-request';
import SearchIcon from '@/screens/explore/SearchIcon';
import SearchScreen from '@/screens/search';
import { COLORS } from '@/constants';
import { USER_ROLE } from '@/types/data-types';
import AccountMenu from '@/screens/account';
import AcceptCheckoutFromAdmin from '@/screens/accept-checkout-from-admin';
import AdminRoomStatistics from '@/screens/account/AdminRoomStatistics';
import AdminRequestCheckoutRoomScreen from '@/screens/admin-request-checkout-room';
import CreateCheckoutRequestScreen from '@/screens/admin-request-checkout-room/create-checkout-request';
import AdminMyAccommodation from '@/screens/admin-my-accommodation';
import CreateNewRoom from '@/screens/admin-my-accommodation/create-new-room';
import RequestList from '@/screens/admin-rent-request/request-list';
import MessageList from '@/screens/message/message-list';
import MessageBox from '@/screens/message/message-box';
import {
  ADMIN_ROUTES,
  COMMON_ROUTES,
  RENTER_ROUTES,
} from './navigation/map-screen-name';
import CustomHeader from './components/common/custom-header';

enableScreens(false);

const Stack = createNativeStackNavigator();
export default function App() {
  const { currentUser, loggedIn, loading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authMe());
  }, [loggedIn]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Stack.Navigator
          initialRouteName={
            !loading && loggedIn ? 'main-tab' : 'authentication'
          }
          screenOptions={{
            headerShown: true,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: COLORS.PRIMARY,
            },
            header: (props) => <CustomHeader {...props} />,
            headerBackTitleVisible: false,
          }}
        >
          {loggedIn ? (
            <>
              {/* Tab Stack */}
              <Stack.Group
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name={COMMON_ROUTES.MAIN_TAB}
                  component={MainTabNavigator}
                />
              </Stack.Group>

              {/* Account Stack */}
              <Stack.Group
                screenOptions={{
                  headerShown: true,
                }}
              >
                <Stack.Screen
                  name={COMMON_ROUTES.ACCOUNT}
                  component={AccountMenu}
                />
                {/* ======== MESSAGE ======== */}
                <Stack.Screen
                  name={RENTER_ROUTES.MESSAGE}
                  options={{
                    headerShown: true,
                    // header: (stackProps) => <CustomHeader {...stackProps} />,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    title: 'Tin nhắn',
                  }}
                  component={MessageList}
                />
                <Stack.Screen
                  name='send-message'
                  component={MessageBox}
                  options={({ route, navigation }) => ({
                    // header: () => <TitleHeaderOfMessage navigation={navigation} name={route.params.name} avatar={route.params.avatar} />,

                    headerTitleAlign: 'center',
                  })}
                />

                {/**
                 * =================TENANT STACK ===================
                 */}
                {currentUser && currentUser.role === USER_ROLE.RENTER && (
                  <>
                    {/* Accommodation Stack */}
                    <Stack.Group
                      screenOptions={{
                        headerShown: true,
                      }}
                    >
                      <Stack.Screen
                        name='AllAccommodations'
                        options={{
                          title: 'Tìm phòng trọ',
                          headerRight: (props) => <SearchIcon {...props} />,
                        }}
                        children={(props) => <AccommodationList {...props} />}
                      />
                      <Stack.Screen
                        name='AccommodationDetails'
                        options={{
                          title: 'Chi tiết',
                        }}
                        children={(props) => (
                          <AccommodationDetailsScreen {...props} />
                        )}
                      />
                      <Stack.Screen
                        name='SearchAccommodation'
                        options={{
                          title: 'Tìm kiếm',
                        }}
                        children={(props) => <SearchScreen {...props} />}
                      />
                    </Stack.Group>

                    {/* Room Menu Stack */}
                    <Stack.Group
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen name='room-menu' component={RoomMenu} />
                      <Stack.Screen name='parking' component={ParkingScreen} />
                      <Stack.Screen
                        name='register-parking'
                        component={RegisterParking}
                      />
                      <Stack.Screen name='wifi' component={WifiScreen} />
                      <Stack.Screen
                        name='register-wifi'
                        component={RegisterWifi}
                      />
                    </Stack.Group>

                    {/* Renter Account Menu Stack  */}
                    <Stack.Group>
                      <Stack.Screen
                        name='RentRequestList'
                        component={RentRequestScreen}
                        options={{
                          title: 'Danh sách yêu cầu thuê phòng',
                        }}
                      />
                      <Stack.Screen
                        name='AcceptCheckoutFromAdmin'
                        component={AcceptCheckoutFromAdmin}
                        options={{
                          title: 'Yêu cầu trả phòng từ chủ trọ',
                        }}
                      />
                    </Stack.Group>
                  </>
                )}
                {/**
                 * =================ADMIN STACK ===================
                 */}
                {currentUser && currentUser.role === USER_ROLE.OWNER && (
                  <>
                    {/* ======== ADMIN MANAGE ACCOMMODATION ======== */}
                    <Stack.Group>
                      <Stack.Screen
                        name={ADMIN_ROUTES.MY_ACCOMMODATION}
                        component={AdminMyAccommodation}
                      />
                      <Stack.Screen
                        name={ADMIN_ROUTES.CREATE_NEW_ROOM}
                        options={{
                          headerShown: true,
                          // header: (stackProps) => <CustomHeader {...stackProps} />,
                          headerBackTitleVisible: false,
                          headerTitleAlign: 'center',
                          title: 'Thêm phòng mới',
                        }}
                        component={CreateNewRoom}
                      />
                    </Stack.Group>
                    {/* ======== ADMIN MANAGE REQUEST RENTING ======== */}
                    <Stack.Group>
                      <Stack.Screen
                        name='AdminRentRequests'
                        options={{
                          headerShown: true,
                          // header: (stackProps) => <CustomHeader {...stackProps} />,
                          headerBackTitleVisible: false,
                          headerTitleAlign: 'center',
                          title: 'Yêu cầu thuê phòng',
                        }}
                        component={RequestList}
                      />
                    </Stack.Group>
                    {/* ======= MENU OPTION ======= */}
                    <Stack.Group>
                      <Stack.Screen
                        options={{
                          title: 'Thống kê',
                        }}
                        name={ADMIN_ROUTES.ROOM_STATISTICS}
                        component={AdminRoomStatistics}
                      />
                      <Stack.Screen
                        name={ADMIN_ROUTES.RENT_REQUEST_LIST}
                        component={RentRequestScreen}
                        options={{
                          title: 'Danh sách yêu cầu thuê phòng',
                        }}
                      />
                      <Stack.Screen
                        name={ADMIN_ROUTES.REQUEST_CHECKOUT_ROOM}
                        component={AdminRequestCheckoutRoomScreen}
                        options={{
                          title: 'Yêu cầu trả phòng',
                        }}
                      />
                      <Stack.Screen
                        name={ADMIN_ROUTES.CREATE_REQUEST_CHECKOUT_ROOM}
                        component={CreateCheckoutRequestScreen}
                        options={{
                          title: 'Tạo yêu cầu trả phòng',
                        }}
                      />
                    </Stack.Group>
                  </>
                )}
              </Stack.Group>
            </>
          ) : (
            <Stack.Group
              navigationKey='authentication'
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name={COMMON_ROUTES.LOGIN}
                component={LoginScreen}
              />
              <Stack.Screen
                name={COMMON_ROUTES.REGISTER}
                component={RegisterScreen}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      )}
    </>
  );
}
