import { Button } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import { baseApi } from '@/shared/api';
import { useAppDispatch } from '@/shared/lib/hooks';

import { logout } from '../model/auth-slice';

export function LogoutButton(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    dispatch(baseApi.util.resetApiState());
  };

  return (
    <Link to={URLs.ui.login} style={{ display: 'contents' }}>
      <Button type="primary" onClick={handleClick}>
        {t('form.logout')}
      </Button>
    </Link>
  );
}
