import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { useDeleteUsersMutation } from '@/entities/user';
import { renderWithProviders } from '@/shared/test/utils';

import { DeleteUsersButton } from './delete-users-button';

const preloadedState = {
  selectedUsers: {
    users: [1, 2, 3],
  },
};

jest.mock('@/entities/user', () => ({
  useDeleteUsersMutation: jest.fn(),
}));

describe('DeleteUsersButton', () => {
  const deleteUsers = jest.fn().mockResolvedValue({});
  (useDeleteUsersMutation as jest.Mock).mockReturnValue([deleteUsers]);

  it('renders correctly', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <DeleteUsersButton />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('disables the button when no users are selected', async () => {
    renderWithProviders(
      <MemoryRouter>
        <DeleteUsersButton />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /Удалить выбранных/i });
    expect(button).toBeDisabled();
  });

  it('enables the button when users are selected', async () => {
    renderWithProviders(
      <MemoryRouter>
        <DeleteUsersButton />
      </MemoryRouter>,
      { preloadedState },
    );

    const button = screen.getByRole('button', { name: /Удалить выбранных/i });
    expect(button).not.toBeDisabled();
  });

  it('shows confirmation pop-up when delete button is clicked', async () => {
    renderWithProviders(
      <MemoryRouter>
        <DeleteUsersButton />
      </MemoryRouter>,
      { preloadedState },
    );

    const button = screen.getByRole('button', { name: /Удалить выбранных/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/Вы уверены, что хотите удалить выбранных пользователей?/i),
      ).toBeInTheDocument();
    });
  });

  it('calls handleDelete when confirmation is accepted', async () => {
    renderWithProviders(
      <MemoryRouter>
        <DeleteUsersButton />
      </MemoryRouter>,
      { preloadedState },
    );

    const button = screen.getByRole('button', { name: /Удалить выбранных/i });
    fireEvent.click(button);

    const confirmButton = screen.getByRole('button', { name: 'Да' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteUsers).toHaveBeenCalled();
    });
  });
});
