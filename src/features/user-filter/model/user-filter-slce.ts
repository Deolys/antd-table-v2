import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { UsersFilters } from '@/shared/types/user';

import { FILTER_START_DATE } from '../consts/initial-filters';

interface UserFilterState {
  userFilter: UsersFilters;
}

const initialState: UserFilterState = {
  userFilter: {
    name: '',
    type_id: null,
    dateRange: [dayjs(FILTER_START_DATE).toString(), dayjs().toString()],
  },
};

const userFilterSlice = createSlice({
  name: 'userFilter',
  initialState,
  reducers: {
    setUserFilter: (state, action: PayloadAction<UsersFilters>) => {
      state.userFilter = action.payload;
    },
    resetUserFilter: (state) => {
      state.userFilter.name = '';
      state.userFilter.type_id = null;
      state.userFilter.dateRange = [dayjs(FILTER_START_DATE).toString(), dayjs().toString()];
    },
  },
  selectors: {
    userFilter: (state) => state.userFilter,
  },
});

export const {
  reducer: userFilterReducer,
  actions: { setUserFilter, resetUserFilter },
  selectors: { userFilter },
} = userFilterSlice;
