import type { CreateUser, User } from '@/entities/user';
import { baseApi } from '@/shared/api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User & { token?: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),

    register: builder.mutation<User & { token?: string }, CreateUser>({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
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
