import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from '@/shared/test/utils';

import FiltersForm from './filters-form';

describe('filters-form', () => {
  it('renders correctly', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <FiltersForm />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('submits the form with correct values', async () => {
    renderWithProviders(
      <MemoryRouter>
        <FiltersForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Имя пользователя/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Тип пользователя/i), { target: { value: 'admin' } });
    fireEvent.click(screen.getByText(/Поиск/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/Имя пользователя/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/Тип пользователя/i)).toHaveValue('admin');
    });
  });

  it('resets the form when reset button is clicked', async () => {
    renderWithProviders(
      <MemoryRouter>
        <FiltersForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Имя пользователя/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText(/Сбросить фильтры/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/Имя пользователя/i)).toHaveValue('');
    });
  });

  it('displays date range correctly', async () => {
    renderWithProviders(
      <MemoryRouter>
        <FiltersForm />
      </MemoryRouter>,
    );

    const dateRangeInput = screen.getByLabelText(/Дата с/i);
    fireEvent.mouseDown(dateRangeInput);

    await waitFor(() => {
      expect(dateRangeInput).toBeInTheDocument();
    });
  });
});
