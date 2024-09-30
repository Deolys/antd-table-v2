import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '@/shared/api/users-api';
import { User } from '@/shared/types/user';

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: {
    id: null,
    name: '',
    login: '',
    password: '',
    type_id: null,
    type: '',
    last_visit_date: '',
  },
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
    },
  },
  selectors: {
    userData: (state) => state.user,
    userLoading: (state) => state.status === 'loading',
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersApi.fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(usersApi.fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(usersApi.fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const {
  reducer: userReducer,
  actions: { clearUserData },
  selectors: { userData, userLoading },
} = userSlice;
