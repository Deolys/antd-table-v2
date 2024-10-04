import React, { type JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error-page';
import { ErrorBoundary } from '@/shared/ui';

import { StoreProvider } from './providers/store-provider';
import { PageRoutes } from './routes';

const App = (): JSX.Element => (
  <StoreProvider>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorPage />}>
        <PageRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
