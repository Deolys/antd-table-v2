import { waitFor } from '@testing-library/react';
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
});
