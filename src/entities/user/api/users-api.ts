import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import prettier from 'prettier/standalone';

import { baseApi } from '@/shared/api';

import type {
  CreateUser,
  FilterQuery,
  FilterResponse,
  UpdateUser,
  User,
  UserType,
} from '../model/types';

interface Result {
  data?: [] | null;
  error?: { message: string; status: number } | null;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredUsers: builder.query<FilterResponse, FilterQuery>({
      query: ({ email, name, type_id, project, dateRange, skip, limit }) => {
        const queryObject = {
          email: email || '',
          name: name || '',
          type_id: type_id ? `${type_id}` : '',
          project: project || '',
          dateRange: dateRange?.length ? JSON.stringify(dateRange) : '',
          skip: `${skip}`,
          limit: `${limit}`,
        };

        const queryParams = new URLSearchParams(queryObject);

        return `/users?${queryParams.toString()}`;
      },
      providesTags: (result) =>
        result && result?.data?.length > 0
          ? [...result.data.map(({ _id }) => ({ type: 'users' as const, id: _id })), 'users']
          : ['users'],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'user' as const, id }],
      transformResponse: async (response: User) => {
        if (response.map_data) {
          try {
            const formattedMapData = await prettier.format(
              JSON.stringify(response.map_data, null, 2),
              {
                parser: 'json',
                plugins: [parserBabel, parserEstree],
              },
            );
            response.map_data = formattedMapData;
          } catch (error) {
            console.error('Ошибка форматирования:', error);
          }
        }
        return response;
      },
    }),

    createUser: builder.mutation<User, CreateUser>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['users'],
    }),

    updateUser: builder.mutation<User, UpdateUser>({
      query: (user) => ({
        url: `/users/${user._id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (result, error, user) => [
        { type: 'users' as const, id: user._id },
        { type: 'user' as const, id: user._id },
      ],
    }),

    deleteUsers: builder.mutation<Result, number[]>({
      query: (ids) => ({
        url: '/users',
        method: 'DELETE',
        body: ids,
      }),
      invalidatesTags: (result, error, ids) =>
        result && result?.data && ids.length > 0
          ? [...ids.map((id) => ({ type: 'users' as const, id: id })), 'users']
          : ['users'],
    }),

    getUserTypes: builder.query<UserType[], void>({
      query: () => '/user-types',
      providesTags: (result) =>
        result && result.length > 0
          ? [...result.map(({ id }) => ({ type: 'userTypes' as const, id })), 'userTypes']
          : ['userTypes'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetFilteredUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUsersMutation,
  useGetUserTypesQuery,
} = usersApi;
