import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks';
import { mockOptions } from '@/shared/test/__mocks__/mock-data';
import { renderWithProviders } from '@/shared/test/utils';

import { useUserForm } from '../lib/hooks';
import { UserForm } from './user-form';

jest.mock('../lib/hooks', () => ({
  useUserForm: jest.fn(),
}));

jest.mock('@/features/user-type-select/lib/hooks', () => ({
  useUserTypeSelect: jest.fn(),
}));

describe('UserForm', () => {
  const mockOnFinish = jest.fn();

  beforeEach(() => {
    (useUserForm as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      onFinish: mockOnFinish,
    });
    (useUserTypeSelect as jest.Mock).mockReturnValue({ options: mockOptions });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with initial values', async () => {
    renderWithProviders(<UserForm />);

    await waitFor(() => {
      expect(screen.getByLabelText('Имя пользователя')).toBeInTheDocument();
      expect(screen.getByLabelText('Почта пользователя')).toBeInTheDocument();
      expect(screen.getByLabelText('Пароль пользователя')).toBeInTheDocument();
      expect(screen.getByLabelText('Тип пользователя')).toBeInTheDocument();
    });
  });

  it('displays loading skeleton when loading', () => {
    (useUserForm as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      onFinish: mockOnFinish,
    });

    renderWithProviders(<UserForm />);

    expect(screen.getByTestId('user-form-skeleton')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithProviders(<UserForm />);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Имя пользователя');
      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.change(nameInput, { target: { value: '' } });
    });
    await waitFor(() => {
      const emailInput = screen.getByLabelText('Почта пользователя');
      fireEvent.change(emailInput, { target: { value: 'Email' } });
      fireEvent.change(emailInput, { target: { value: '' } });
    });
    await waitFor(() => {
      const passInput = screen.getByLabelText('Пароль пользователя');
      fireEvent.change(passInput, { target: { value: 'Pass123' } });
      fireEvent.change(passInput, { target: { value: '' } });
    });

    await waitFor(() => {
      expect(screen.getByText('Заполните поле имени')).toBeInTheDocument();
      expect(screen.getByText('Заполните поле почты')).toBeInTheDocument();
      expect(screen.getByText('Заполните поле пароля')).toBeInTheDocument();
    });
  });
});
