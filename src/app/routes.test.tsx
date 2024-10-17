import { waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { pageRoutes } from '@/shared/consts';
import { renderWithProviders } from '@/shared/test/utils';

import App from './app';
import { PageRoutes } from './routes';

describe('Routes', () => {
  it('App renders without crashing', async () => {
    const { container } = renderWithProviders(<App />);

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('Renders the main page without crashing', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={[pageRoutes.MAIN]}>
        <PageRoutes />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('Renders the user form page without crashing', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={[pageRoutes.NEW_USER_FORM]}>
        <PageRoutes />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
