import { Flex, Spin } from 'antd';
import React, { type JSX, type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import { selectAuthLoading, selectIsAuth } from '@/features/auth';
import { useCheckAuthQuery } from '@/features/auth/api';
import { LoginPage } from '@/pages/login-page';
import { MainPage } from '@/pages/main-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { RegisterPage } from '@/pages/register-page';
import { UserPage } from '@/pages/user-page';
import { useAppSelector } from '@/shared/lib/hooks';

export const PageRoutes = (): JSX.Element => {
  useCheckAuthQuery();

  return (
    <Routes>
      <Route
        path={URLs.baseUrl}
        element={
          <PrivateRoute condition={false} redirect={URLs.ui.login}>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path={URLs.ui.userId.url}
        element={
          <PrivateRoute condition={false} redirect={URLs.ui.login}>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={URLs.ui.login}
        element={
          <PrivateRoute condition={true} redirect={URLs.baseUrl}>
            <LoginPage />
          </PrivateRoute>
        }
      />
      <Route
        path={URLs.ui.register}
        element={
          <PrivateRoute condition={true} redirect={URLs.baseUrl}>
            <RegisterPage />
          </PrivateRoute>
        }
      />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
};

interface PrivateRouteProps {
  children?: ReactNode;
  condition?: boolean;
  redirect: string;
}

function PrivateRoute({ children, condition, redirect }: PrivateRouteProps): ReactNode {
  const loading = useAppSelector(selectAuthLoading);
  const isAuth = useAppSelector(selectIsAuth);
  const location = useLocation();

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (isAuth === condition) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  return children;
}
