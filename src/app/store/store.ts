import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { selectedUsersReducer } from '@/features/delete-users-button/model/selected-users-slice';
import { userFilterReducer } from '@/features/user-filter/model/user-filter-slce';
import { userTypesReducer } from '@/features/user-type-select/model/user-types-slice';
import { userReducer } from '@/widgets/user-form/model/user-slice';
import { usersReducer } from '@/widgets/users-table/model/users-slice';

const rootReducer = combineReducers({
  users: usersReducer,
  userTypes: userTypesReducer,
  user: userReducer,
  selectedUsers: selectedUsersReducer,
  userFilter: userFilterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
