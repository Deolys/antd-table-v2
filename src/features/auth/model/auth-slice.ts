import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/entities/user';

import { authApi } from '../api';

interface authState {
  data: User | null;
  status: 'loading' | 'success' | 'error';
}

const initialState: authState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  selectors: {
    selectIsAuth: (state) => Boolean(state.data),
    selectAuthLoading: (state) => state.status === 'loading',
    selectTypeId: (state) => state.data?.type_id,
    selectProject: (state) => state.data?.project,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = 'success';
      })
      .addMatcher(authApi.endpoints.register.matchRejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addMatcher(authApi.endpoints.checkAuth.matchPending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addMatcher(authApi.endpoints.checkAuth.matchFulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = 'success';
      });
  },
});

export const {
  reducer: authReducer,
  actions: { logout },
  selectors: { selectIsAuth, selectAuthLoading, selectTypeId, selectProject },
} = authSlice;
