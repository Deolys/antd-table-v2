import { waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error-page';
import { pageRoutes } from '@/shared/consts';
import { renderWithProviders } from '@/shared/test/utils';

import App from './app';
import { PageRoutes } from './routes';

describe('Routes', () => {
  it('app renders without crashing', async () => {
    const { container } = renderWithProviders(<App />);

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('renders the main page without crashing', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={[pageRoutes.MAIN]}>
        <PageRoutes />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('renders the user form page without crashing', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={[pageRoutes.NEW_USER_FORM]}>
        <PageRoutes />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('renders the error page without crashing', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
