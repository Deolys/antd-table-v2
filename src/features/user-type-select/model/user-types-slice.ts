import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '@/shared/api/users-api';
import { UserType } from '@/shared/types/user';

interface UsersState {
  userTypes: UserType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  userTypes: [],
  status: 'idle',
  error: null,
};

const userTypesSlice = createSlice({
  name: 'userTypes',
  initialState,
  reducers: {},
  selectors: {
    userTypes: (state) => state.userTypes,
    userTypesLoading: (state) => state.status === 'loading',
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersApi.initUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.userTypes = action.payload.userTypesData;
        }
      })
      .addCase(usersApi.fetchUserTypes.fulfilled, (state, action) => {
        state.userTypes = action.payload;
      });
  },
});

export const {
  reducer: userTypesReducer,
  selectors: { userTypes, userTypesLoading },
} = userTypesSlice;
