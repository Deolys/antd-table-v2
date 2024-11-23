import type { CreateUser, User } from '@/entities/user';
import { baseApi } from '@/shared/api';

const PROJECT_KEY = 'antd-table-v2_SECRET_KEY';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User & { token?: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
        headers: { projectkey: PROJECT_KEY },
      }),
    }),

    register: builder.mutation<User & { token?: string }, CreateUser>({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
        headers: { projectkey: PROJECT_KEY },
      }),
      invalidatesTags: ['users'],
    }),

    checkAuth: builder.query<User & { token?: string }, void>({
      query: () => ({
        url: '/auth/check',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCheckAuthQuery } = authApi;
