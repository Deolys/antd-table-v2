import { Flex, Spin } from 'antd';
import React, { type JSX, type PropsWithChildren, type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { useCheckAuthQuery } from '@/features/auth/api';
import { LoginPage } from '@/pages/login-page';
import { MainPage } from '@/pages/main-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { RegisterPage } from '@/pages/register-page';
import { UserPage } from '@/pages/user-page';
import { pageRoutes } from '@/shared/consts';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path={pageRoutes.MAIN}
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path={pageRoutes.USER_FORM_ID}
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route path={pageRoutes.LOGIN} element={<LoginPage />} />
      <Route path={pageRoutes.REGISTER} element={<RegisterPage />} />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};

function PrivateRoute({ children }: PropsWithChildren): ReactNode {
  const { data: user, isFetching } = useCheckAuthQuery();
  const location = useLocation();

  if (isFetching) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!user) {
    return <Navigate to={pageRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}
