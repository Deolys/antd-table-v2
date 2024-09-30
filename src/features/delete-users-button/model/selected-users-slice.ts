import { createSlice } from '@reduxjs/toolkit';

interface selectedUsersState {
  users: number[];
}

const initialState: selectedUsersState = {
  users: [],
};

const selectedUsersSlice = createSlice({
  name: 'selectedUsers',
  initialState,
  reducers: {
    setSelectedUsers: (state, action) => {
      state.users = action.payload;
    },
    clearSelectedUsers: (state) => {
      state.users = [];
    },
  },
  selectors: {
    selectedUserIds: (state) => state.users,
  },
});

export const {
  reducer: selectedUsersReducer,
  actions: { setSelectedUsers, clearSelectedUsers },
  selectors: { selectedUserIds },
} = selectedUsersSlice;
