import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import i18n from '@/shared/config/i18n';
import { pageRoutes } from '@/shared/consts';

import { NotFoundPage } from './not-found-page';

const mockNavigate = jest.fn();
const mockLocation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe('NotFoundPage', () => {
  it('should render the 404 page with correct translations', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(i18n.t('text.pageIsHiding'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('text.canFindIt'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('text.searchHere'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('common.toMain'))).toBeInTheDocument();
  });

  it('should navigate to the main page when clicking the "toMain" button', async () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const toMainButton = screen.getByText(i18n.t('common.toMain'));
    fireEvent.click(toMainButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`${pageRoutes.MAIN}?page=1`);
    });
  });

  it('should navigate to the main page when clicking the "searchHere" button', async () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const searchHereButton = screen.getByRole('button', {
      name: i18n.t('text.searchHere'),
    });
    fireEvent.click(searchHereButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`${pageRoutes.MAIN}?page=1`);
    });
  });
});
