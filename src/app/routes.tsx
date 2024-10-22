import React, { type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from '@/pages/main-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { UserPage } from '@/pages/user-page';
import { pageRoutes } from '@/shared/consts';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={pageRoutes.MAIN} element={<MainPage />} />
      <Route path={pageRoutes.USER_FORM_ID} element={<UserPage />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};
