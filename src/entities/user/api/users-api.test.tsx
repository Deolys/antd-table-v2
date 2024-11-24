import { screen, waitFor } from '@testing-library/react';
import React, { type JSX, useEffect } from 'react';

import { mockUsers } from '@/shared/test/__mocks__/mock-data';
import { renderWithProviders } from '@/shared/test/utils';

import {
  useCreateUserMutation,
  useDeleteUsersMutation,
  useGetFilteredUsersQuery,
  useGetUserByIdQuery,
  useGetUserTypesQuery,
  useUpdateUserMutation,
} from '.';
import mockUserTypes from '../../../../stubs/mock-data/UserTypes.json';

xdescribe('usersApi', () => {
  it('fetches filtered users', async () => {
    const TestComponent = (): JSX.Element => {
      const { data } = useGetFilteredUsersQuery({
        name: '',
        email: '',
        type_id: 0,
        project: '',
        dateRange: [],
        skip: 0,
        limit: 10,
      });
      return <div>{data && JSON.stringify(data)}</div>;
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => expect(screen.getByText(JSON.stringify(mockUsers))).toBeInTheDocument());
  });

  it('fetches user by id', async () => {
    const TestComponent = (): JSX.Element => {
      const { data } = useGetUserByIdQuery('1');
      return <div>{data && JSON.stringify(data)}</div>;
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => expect(screen.getByText(JSON.stringify(mockUsers[0]))).toBeInTheDocument());
  });

  it('deletes users', async () => {
    const TestComponent = (): JSX.Element => {
      const [deleteUsers, { data }] = useDeleteUsersMutation();
      useEffect(() => {
        deleteUsers([1]);
      }, [deleteUsers]);
      return <div>{data && JSON.stringify(data[0])}</div>;
    };

    renderWithProviders(<TestComponent />);
    // При удалении пользователя с id: 1 первым должен стать пользователь с id: 2
    await waitFor(() => expect(screen.getByText(/User2@mail.ru/i)).toBeInTheDocument());
  });

  it('creates a new user', async () => {
    const newUser = { ...mockUsers[0], name: 'Created name' };
    const TestComponent = (): JSX.Element => {
      const [createUser, { data }] = useCreateUserMutation();
      useEffect(() => {
        createUser(newUser);
      }, [createUser]);
      return <div>{data && JSON.stringify(data)}</div>;
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => expect(screen.getByText(/Created name/i)).toBeInTheDocument());
  });

  it('updates a user', async () => {
    const newUser = { ...mockUsers[0], name: 'Updated name' };
    const TestComponent = (): JSX.Element => {
      const [updateUser, { data }] = useUpdateUserMutation();
      useEffect(() => {
        updateUser(newUser);
      }, [updateUser]);
      return <div>{data && JSON.stringify(data)}</div>;
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => expect(screen.getByText(/Updated name/i)).toBeInTheDocument());
  });

  it('fetches user types', async () => {
    const TestComponent = (): JSX.Element => {
      const { data } = useGetUserTypesQuery();
      return <div>{data && JSON.stringify(data)}</div>;
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByText(JSON.stringify(mockUserTypes))).toBeInTheDocument(),
    );
  });
});
