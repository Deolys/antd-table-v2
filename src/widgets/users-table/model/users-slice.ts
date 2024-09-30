import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '@/shared/api/users-api';
import { User } from '@/shared/types/user';

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    usersList: (state) => state.users,
    usersLoading: (state) => state.status === 'loading',
    usersInitiating: (state) => state.status === 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersApi.initUsers.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(usersApi.initUsers.fulfilled, (state) => {
        state.status = 'loading';
      })
      .addCase(usersApi.fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(usersApi.fetchFilteredUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(usersApi.fetchFilteredUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'succeeded';
      })
      .addCase(usersApi.fetchFilteredUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(usersApi.deleteUsers.fulfilled, (state, action) => {
        state.users = state.users.filter((user) =>
          action.payload.some((deletedUser) => deletedUser.id === user.id),
        );
      });
  },
});

export const {
  reducer: usersReducer,
  selectors: { usersList, usersLoading, usersInitiating },
} = usersSlice;
