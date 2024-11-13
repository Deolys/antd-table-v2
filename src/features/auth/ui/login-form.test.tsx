import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { showErrorMessage } from '@/shared/lib/utils';
import { renderWithProviders } from '@/shared/test/utils';

import { useLoginMutation } from '../api';
import { LoginForm } from './login-form';

jest.mock('../api', () => {
  const original = jest.requireActual('@/features/auth/api');
  return {
    ...original,
    useLoginMutation: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: jest.fn(),
  };
});

jest.mock('@/shared/lib/utils', () => {
  const original = jest.requireActual('@/shared/lib/utils');
  return {
    ...original,
    showErrorMessage: jest.fn(),
  };
});

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();
  const mockShowErrorMessage = jest.fn();

  beforeEach(() => {
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false, isSuccess: false },
    ]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (showErrorMessage as jest.Mock).mockReturnValue(mockShowErrorMessage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form correctly', () => {
    renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('Почта')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Авторизоваться' })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Авторизоваться' }));

    await waitFor(() => {
      expect(screen.getByText('Заполните поле почты')).toBeInTheDocument();
      expect(screen.getByText('Заполните поле пароля')).toBeInTheDocument();
    });
  });

  it('shows error message on login failure', async () => {
    mockLogin.mockResolvedValue({ error: true });

    renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Почта'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Авторизоваться' }));

    await waitFor(() => {
      expect(showErrorMessage).toHaveBeenCalledWith('При авторизации произошла ошибка');
    });
  });

  it('navigates to main page on login success', async () => {
    mockLogin.mockResolvedValue({ data: { token: 'test-token' } });
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false, isSuccess: true },
    ]);

    renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Почта'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Авторизоваться' }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/antd-table-v2');
    });
  });

  it('displays loading state when submitting', () => {
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: true, isSuccess: false },
    ]);

    renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: 'loading Авторизоваться' })).toBeInTheDocument();
  });
});
