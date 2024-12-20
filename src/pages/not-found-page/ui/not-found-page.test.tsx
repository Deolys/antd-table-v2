import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import i18n from '@/shared/config/i18n';
import { pageRoutes } from '@/shared/consts';

import { NotFoundPage } from './not-found-page';

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
    expect(screen.getByText(i18n.t('pages.home'))).toBeInTheDocument();
  });

  it('should navigate to the home page when clicking the "Home" button', async () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const toHomeLink = screen.getByRole('link', { name: i18n.t('pages.home') });
    fireEvent.click(toHomeLink);

    await waitFor(() => {
      expect(toHomeLink).toHaveAttribute('href', pageRoutes.MAIN);
    });
  });

  it('should navigate to the home page when clicking the "searchHere" button', async () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const searchHereLink = screen.getByRole('link', {
      name: i18n.t('text.searchHere'),
    });
    fireEvent.click(searchHereLink);

    await waitFor(() => {
      expect(searchHereLink).toHaveAttribute('href', pageRoutes.MAIN);
    });
  });
});
