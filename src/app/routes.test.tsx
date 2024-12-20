import { waitFor } from '@testing-library/react';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error-page';
import { pageRoutes } from '@/shared/consts';
import { breakpoints, userMock } from '@/shared/test/__mocks__/mock-data';
import { renderWithProviders } from '@/shared/test/utils';

import App from './app';
import { PageRoutes } from './routes';

jest.mock('antd/lib/grid/hooks/useBreakpoint', () => jest.fn());

jest.mock('@/features/auth/api', () => {
  const original = jest.requireActual('@/features/auth/api');
  return {
    ...original,
    useCheckAuthQuery: jest.fn().mockReturnValue({ data: true, isLoading: false }),
  };
});

breakpoints.forEach((breakpoint) => {
  describe(`Routes with sreen: ${breakpoint.name}`, () => {
    beforeEach(() => {
      (useBreakpoint as jest.Mock).mockReturnValue({
        ...breakpoint.values,
      });
    });

    it('app renders without crashing', async () => {
      const { container } = renderWithProviders(<App />);

      await waitFor(() => {
        expect(container).toBeInTheDocument();
      });
    });

    it('renders the table page without crashing', async () => {
      const { container } = renderWithProviders(
        <MemoryRouter initialEntries={[pageRoutes.TABLE]}>
          <PageRoutes />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              data: userMock,
              status: 'success',
            },
          },
        },
      );

      await waitFor(() => {
        expect(container).toBeInTheDocument();
      });
    });

    it('renders the home page without crashing', async () => {
      const { container } = renderWithProviders(
        <MemoryRouter initialEntries={[pageRoutes.MAIN]}>
          <PageRoutes />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(container).toBeInTheDocument();
      });
    });

    it('renders the main page without crashing different screens', async () => {
      const { container } = renderWithProviders(
        <MemoryRouter initialEntries={[pageRoutes.TABLE]}>
          <PageRoutes />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              data: userMock,
              status: 'success',
            },
          },
        },
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
        {
          preloadedState: {
            auth: {
              data: userMock,
              status: 'success',
            },
          },
        },
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

    it('renders the login page without crashing', async () => {
      const { container } = renderWithProviders(
        <MemoryRouter initialEntries={[pageRoutes.LOGIN]}>
          <PageRoutes />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              data: undefined,
              status: 'success',
            },
          },
        },
      );

      await waitFor(() => {
        expect(container).toBeInTheDocument();
      });
    });

    it('renders the register page without crashing', async () => {
      const { container } = renderWithProviders(
        <MemoryRouter initialEntries={[pageRoutes.REGISTER]}>
          <PageRoutes />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              data: undefined,
              status: 'success',
            },
          },
        },
      );

      await waitFor(() => {
        expect(container).toBeInTheDocument();
      });
    });
  });
});
