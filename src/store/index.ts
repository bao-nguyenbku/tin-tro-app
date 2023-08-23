import { configureStore } from '@reduxjs/toolkit';
import accommodationSlice from '@/store/reducer/accommodation';
import userReducer from './reducer/user';
import messageReducer from './reducer/message';
import rentingReducer from './reducer/renting';
import adminAccommodationReducer from './reducer/admin-accommodation';
import parkingReducer from './reducer/parking';
import wifiReducer from './reducer/wifi';
import reviewReducer from './reducer/review';

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        [accommodationSlice.name]: accommodationSlice.reducer,
        renting: rentingReducer,
        adminAccommodation: adminAccommodationReducer,
        parking: parkingReducer,
        wifi: wifiReducer,
        review: reviewReducer
    },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;