import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Navigate } from 'react-router-dom';

import { showErrorMessage } from '@/shared/lib/utils';
import { renderWithProviders } from '@/shared/test/utils';

import { useRegisterMutation } from '../api';
import { RegisterForm } from './register-form';

jest.mock('../api', () => {
  const original = jest.requireActual('@/features/auth/api');
  return {
    ...original,
    useRegisterMutation: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    Navigate: jest.fn(),
  };
});

jest.mock('@/shared/lib/utils', () => {
  const original = jest.requireActual('@/shared/lib/utils');
  return {
    ...original,
    showErrorMessage: jest.fn(),
  };
});

describe('RegisterForm', () => {
  const mockRegister = jest.fn();
  const mockNavigate = <div data-testid={'navigate'} />;
  const mockShowErrorMessage = jest.fn();

  beforeEach(() => {
    (useRegisterMutation as jest.Mock).mockReturnValue([
      mockRegister,
      { isLoading: false, isSuccess: false },
    ]);
    (Navigate as jest.Mock).mockReturnValue(mockNavigate);
    (showErrorMessage as jest.Mock).mockReturnValue(mockShowErrorMessage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form correctly', () => {
    renderWithProviders(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Почта')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Подтвердите пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithProviders(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() => {
      expect(screen.getByText('Заполните поле имени')).toBeInTheDocument();
      expect(screen.getByText('Заполните поле почты')).toBeInTheDocument();
      expect(screen.getAllByText('Заполните поле пароля')[0]).toBeInTheDocument();
    });
  });

  it('shows error message on register failure', async () => {
    mockRegister.mockResolvedValue({ error: true });

    renderWithProviders(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Почта'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'Password1@' } });
    fireEvent.change(screen.getByLabelText('Подтвердите пароль'), {
      target: { value: 'Password1@' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() => {
      expect(showErrorMessage).toHaveBeenCalledWith('При регистрации возникла ошибка');
    });
  });

  it('navigates to main page on register success', async () => {
    mockRegister.mockResolvedValue({ data: { token: 'test-token' } });
    (useRegisterMutation as jest.Mock).mockReturnValue([
      mockRegister,
      { isLoading: false, isSuccess: true },
    ]);

    renderWithProviders(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('navigate')).toBeInTheDocument();
    });
  });

  it('displays loading state when submitting', () => {
    (useRegisterMutation as jest.Mock).mockReturnValue([
      mockRegister,
      { isLoading: true, isSuccess: false },
    ]);

    renderWithProviders(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: 'loading Зарегистрироваться' })).toBeInTheDocument();
  });
});
