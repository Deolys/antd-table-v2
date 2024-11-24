import { Button } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import { baseApi } from '@/shared/api';
import { useAppDispatch } from '@/shared/lib/hooks';

import { logout } from '../model/auth-slice';

export function LogoutButton(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    dispatch(baseApi.util.resetApiState());
    navigate(URLs.ui.login);
  };

  return (
    <Button type="primary" onClick={handleClick}>
      {t('form.logout')}
    </Button>
  );
}
