import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { URLs } from '@/__data__/urls';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URLs.api.main}`,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['user', 'users', 'userTypes'],
  endpoints: () => ({}),
});
