import React, { type JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from './providers/store-provider';
import { PageRoutes } from './routes';

const App = (): JSX.Element => (
  <StoreProvider>
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  </StoreProvider>
);

export default App;
