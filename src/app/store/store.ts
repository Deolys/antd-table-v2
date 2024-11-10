import { type Store, combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/features/auth';
import { selectedUsersReducer } from '@/features/delete-users-button';
import { baseApi } from '@/shared/api';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  selectedUsers: selectedUsersReducer,
  auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
