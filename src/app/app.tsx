import React, { type JSX, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { usersApi } from '@/shared/api/users-api';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';

import { PageRoutes } from './routes';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(usersApi.initUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
};

export default App;
