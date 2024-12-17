import { baseApi as api } from '../../api/base-api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: 'POST',
        body: queryArg.user,
        headers: {
          authorization: queryArg.authorization,
        },
      }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        headers: {
          authorization: queryArg.authorization,
          projectkey: queryArg.projectkey,
        },
        params: {
          email: queryArg.email,
          name: queryArg.name,
          type_id: queryArg.typeId,
          dateRange: queryArg.dateRange,
          project: queryArg.project,
          skip: queryArg.skip,
          limit: queryArg.limit,
        },
      }),
    }),
    deleteUsers: build.mutation<DeleteUsersApiResponse, DeleteUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: 'DELETE',
        body: queryArg.body,
        headers: {
          authorization: queryArg.authorization,
        },
      }),
    }),
    getUsersById: build.query<GetUsersByIdApiResponse, GetUsersByIdApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.id}`,
        headers: {
          authorization: queryArg.authorization,
          projectkey: queryArg.projectkey,
        },
      }),
    }),
    putUsersById: build.mutation<PutUsersByIdApiResponse, PutUsersByIdApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.user,
        headers: {
          authorization: queryArg.authorization,
        },
      }),
    }),
    getUserTypes: build.query<GetUserTypesApiResponse, GetUserTypesApiArg>({
      query: (queryArg) => ({
        url: `/user-types`,
        headers: {
          authorization: queryArg.authorization,
          projectkey: queryArg.projectkey,
        },
      }),
    }),
    postAuthLogin: build.mutation<PostAuthLoginApiResponse, PostAuthLoginApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: 'POST',
        body: queryArg.body,
        headers: {
          projectkey: queryArg.projectkey,
        },
      }),
    }),
    postAuthRegister: build.mutation<PostAuthRegisterApiResponse, PostAuthRegisterApiArg>({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: 'POST',
        body: queryArg.body,
        headers: {
          projectkey: queryArg.projectkey,
        },
      }),
    }),
    getAuthCheck: build.query<GetAuthCheckApiResponse, GetAuthCheckApiArg>({
      query: (queryArg) => ({
        url: `/auth/check`,
        headers: {
          authorization: queryArg.authorization,
          projectkey: queryArg.projectkey,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as usersApi };
export type PostUsersApiResponse = unknown;
export type PostUsersApiArg = {
  /** Authorization token */
  authorization: string;
  user: User;
};
export type GetUsersApiResponse = /** status 200 List of users */ User[];
export type GetUsersApiArg = {
  /** Authorization token */
  authorization: string;
  /** Project key */
  projectkey: string;
  email?: string;
  name?: string;
  typeId?: number;
  dateRange?: string;
  project?: string;
  skip?: number;
  limit?: number;
};
export type DeleteUsersApiResponse = unknown;
export type DeleteUsersApiArg = {
  /** Authorization token */
  authorization: string;
  body: string[];
};
export type GetUsersByIdApiResponse = /** status 200 User data */ User;
export type GetUsersByIdApiArg = {
  /** Authorization token */
  authorization: string;
  /** Project key */
  projectkey: string;
  id: string;
};
export type PutUsersByIdApiResponse = unknown;
export type PutUsersByIdApiArg = {
  /** Authorization token */
  authorization: string;
  id: string;
  user: User;
};
export type GetUserTypesApiResponse = /** status 200 List of user types */ UserType[];
export type GetUserTypesApiArg = {
  /** Authorization token */
  authorization: string;
  /** Project key */
  projectkey: string;
};
export type PostAuthLoginApiResponse = /** status 200 Login successful */ User;
export type PostAuthLoginApiArg = {
  /** Project key */
  projectkey: string;
  body: {
    email: string;
    password: string;
  };
};
export type PostAuthRegisterApiResponse = /** status 201 Registration successful */ User;
export type PostAuthRegisterApiArg = {
  /** Project key */
  projectkey: string;
  body: {
    email: string;
    password: string;
  };
};
export type GetAuthCheckApiResponse = /** status 200 Authorized */ User;
export type GetAuthCheckApiArg = {
  /** Authorization token */
  authorization: string;
  /** Project key */
  projectkey: string;
};
export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  type_id?: number;
  project: string;
  description?: string;
  map_data?: {
    [key: string]: string;
  };
  last_visit_date?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
export type UserType = {
  id?: number;
  name?: string;
  allow_edit?: boolean;
};
export const {
  usePostUsersMutation,
  useGetUsersQuery,
  useDeleteUsersMutation,
  useGetUsersByIdQuery,
  usePutUsersByIdMutation,
  useGetUserTypesQuery,
  usePostAuthLoginMutation,
  usePostAuthRegisterMutation,
  useGetAuthCheckQuery,
} = injectedRtkApi;
