import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import localforage from 'localforage';

import type { CreateUser, UpdateUser, User, UserType, UsersFilters } from '@/shared/types/user';

import userTypesData from '../../config/data/UserTypes.json';
import usersData from '../../config/data/Users.json';

const USERS_KEY = 'users';
const USER_TYPES_KEY = 'userTypes';

const initUsers = createAsyncThunk('users/initUsers', async () => {
  const data = await localforage.getItem(USERS_KEY);
  if (!data) {
    const usersWithTypes = usersData.map((user) => {
      const userType = userTypesData.find((type) => type.id === user.type_id);
      return { ...user, type: userType?.name };
    });

    await localforage.setItem(USERS_KEY, usersWithTypes);
    await localforage.setItem(USER_TYPES_KEY, userTypesData);

    return { usersWithTypes, userTypesData };
  }
});

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users: User[] = (await localforage.getItem(USERS_KEY)) || [];
  const userTypes: UserType[] = (await localforage.getItem(USER_TYPES_KEY)) || [];
  const usersWithTypes = users.map((user) => {
    const userType = userTypes.find((type) => type.id === user.type_id);
    return { ...user, type: userType?.name };
  });

  return usersWithTypes;
});

const fetchUserTypes = createAsyncThunk('users/fetchUserTypes', async () => {
  return (await localforage.getItem(USER_TYPES_KEY)) || [];
});

const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: number) => {
  const users: User[] = (await localforage.getItem(USERS_KEY)) || [];
  const user = users.find((u) => u.id === id) || null;

  return user;
});

const fetchFilteredUsers = createAsyncThunk(
  'users/fetchFilteredUsers',
  async (filters: UsersFilters) => {
    const { name, type_id, dateRange } = filters;
    const users: User[] = (await localforage.getItem(USERS_KEY)) || [];
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const lowerCaseName = name ? name.toLowerCase() : null;
    const validDateFrom = dayjs(dateRange[0]).isValid() ? dayjs(dateRange[0]).valueOf() : null;
    const validDateTo = dayjs(dateRange[1]).isValid() ? dayjs(dateRange[1]).valueOf() : null;

    const filteredUsers = users.filter((user) => {
      const userLastVisitTime = dayjs(user.last_visit_date).valueOf();

      return (
        (!lowerCaseName || user.name.toLowerCase().includes(lowerCaseName)) &&
        (!type_id || user.type_id === type_id) &&
        (!validDateFrom || userLastVisitTime >= validDateFrom) &&
        (!validDateTo || userLastVisitTime <= validDateTo)
      );
    });

    const userTypes: UserType[] = (await localforage.getItem(USER_TYPES_KEY)) || [];
    const usersWithTypes = filteredUsers.map((user) => {
      const userType = userTypes.find((type) => type.id === user.type_id);
      return { ...user, type: userType?.name };
    });

    return usersWithTypes;
  },
);

const createUser = createAsyncThunk('users/createUser', async (user: CreateUser) => {
  const users = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const duplicateLoginIndex = users.findIndex((u) => u.login === user.login);
  if (duplicateLoginIndex !== -1) {
    throw new Error('Пользователь с указанным логином уже существует');
  }
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const lastVisitDate = dayjs()
    .toISOString()
    .replace(/\.\d+Z$/, '');
  users.push({ id: newId, ...user, last_visit_date: lastVisitDate });
  await localforage.setItem(USERS_KEY, users);

  return users;
});

const updateUser = createAsyncThunk('users/updateUser', async (user: UpdateUser) => {
  const users = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const userIndex = users.findIndex((u) => u.id === user.id);
  if (userIndex === -1) {
    throw new Error(`Пользователь с id ${user.id} не найден`);
  }
  const duplicateLoginIndex = users.findIndex((u) => u.login === user.login && u.id !== user.id);
  if (duplicateLoginIndex !== -1) {
    throw new Error('Пользователь с указанным логином уже существует');
  }
  users[userIndex] = { ...users[userIndex], ...user };
  console.log('user update: ', user);
  await localforage.setItem(USERS_KEY, users);

  return users;
});

const deleteUsers = createAsyncThunk('users/deleteUsers', async (ids: number[]) => {
  const users = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const updatedUsers = users.filter((u) => !ids.includes(u.id));
  await localforage.setItem(USERS_KEY, updatedUsers);

  return updatedUsers;
});

export const usersApi = {
  initUsers,
  fetchUsers,
  fetchUserTypes,
  fetchUserById,
  fetchFilteredUsers,
  createUser,
  updateUser,
  deleteUsers,
};
