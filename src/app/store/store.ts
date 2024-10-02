import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { selectedUsersReducer } from '@/features/delete-users-button';
import { usersApi } from '@/shared/api/users-api';

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  selectedUsers: selectedUsersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
