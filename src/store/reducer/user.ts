import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { jwtParse, setToken } from '@/utils/token';

import request from '@/utils/axios';
import { IUser } from '@/types/data-types';

interface UserState {
  currentUser: IUser;
  token: any;
  loading: boolean;
  messagedUsers: any[];
  error: any;
  loggedIn: boolean;
}
// INITIAL STATE
const initialState: UserState = {
  currentUser: undefined,
  token: null,
  loading: false,
  messagedUsers: [],
  error: null,
  loggedIn: false,
};

// --------------------------- THUNKS ---------------------------
export const register = createAsyncThunk('users/register', async ({ name, email, phone, password, reEnterPassword, done }, { rejectWithValue }) => {
  try {
    const response = await request.post('/auth/register', {
      name,
      email,
      phone,
      password,
      reEnterPassword,
    });
    if (done) done();
    return response.data;
  } catch (err) {
    if (!err.response) {
      return rejectWithValue({ statusCode: 500, message: err.message });
    }
    return rejectWithValue({ statusCode: err.response.data.statusCode, message: err.response.data.message });
  }
});

export const saveUser = createAsyncThunk('users/saveUser', async ({ token }, { rejectWithValue }) => {
  try {
    const user = jwtParse(token);
    await setToken(token);
    return user;
  } catch (err) {
    return rejectWithValue({ message: err?.message || 'Something went wrong!' });
  }
});

export const logIn = createAsyncThunk('users/login', async ({ email, password, done }, { rejectWithValue, dispatch }) => {
  try {
    const response = await request.post('/auth/login', {
      email,
      password,
    });
    if (done) done();
    dispatch(saveUser({ token: response.data.access_token }));
    return response.data;
  } catch (err) {
    if (err.response) {
      return rejectWithValue({ statusCode: err.response.data.statusCode, message: err.response.data.message });
    }
    if (!err.response) {
      return rejectWithValue({ statusCode: 500, message: err.message });
    }
    return rejectWithValue({ statusCode: 500, message: 'Something went wrong' });
  }
});

export const authMe = createAsyncThunk('users/authMe', async (_, { rejectWithValue }) => {
  try {
    const response = await request.get('/auth/me');
    return response.data;
  } catch (err) {
    if (!err.response) {
      return rejectWithValue({ statusCode: 500, message: err.message });
    }
    return rejectWithValue({ statusCode: err.response.data.statusCode, message: err.response.data.message });
  }
});

// --------------------------- SLICE ---------------------------
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetData: (state) => {
      state.loading = false;
      state.error = null;
    },
    setCurrentUser: (state) => {
      state.currentUser = {};
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    // --------------------------- REGISTER ---------------------------
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      if (action.payload.statusCode === 400) state.error = 'Email hoặc số điện thoại đã tồn tại.';
      else state.error = Array.isArray(action.payload.message) ? action.payload.message[0] : action.payload.message;
      state.loading = false;
    });
    // --------------------------- LOGIN ---------------------------
    builder.addCase(logIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loggedIn = true;
      state.loading = false;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      if (action.payload.statusCode === 401) state.error = 'Email hoặc mật khẩu không đúng.';
      else state.error = Array.isArray(action.payload.message) ? action.payload.message[0] : action.payload.message;
      state.loading = false;
    });
    // --------------------------- SAVE USER ---------------------------
    builder.addCase(saveUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveUser.fulfilled, (state, action) => {
      state.currentUser = { ...action.payload, id: action.payload.sub };
      state.loading = false;
    });
    builder.addCase(saveUser.rejected, (state, action) => {
      state.error = action.payload.message || 'Something went wrong';
      state.loading = false;
    });
    // --------------------------- AUTH ME ---------------------------
    builder.addCase(authMe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loggedIn = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(authMe.rejected, (state) => {
      state.loading = false;
      state.loggedIn = false;
    });
  },
});
// --------------------------- SELECTORS ---------------------------
export const selectUserState = createSelector([(state) => state.user], (userState) => userState);
// Action creators are generated for each case reducer function
const { resetData, setCurrentUser } = userSlice.actions;
export { resetData, setCurrentUser };

export default userSlice.reducer;
