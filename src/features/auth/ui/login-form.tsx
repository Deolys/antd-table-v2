import { Button, Form, type FormProps, Input, Typography } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';

import { pageRoutes } from '@/shared/consts';
import { showErrorMessage } from '@/shared/lib/utils';

import { useLoginMutation } from '../api';

type FieldType = {
  email?: string;
  password?: string;
};

export function LoginForm(): JSX.Element {
  const { t } = useTranslation();
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      return;
    }
    const res = await login({ email, password });
    if (res.error || !res.data) {
      showErrorMessage(t('messages.error.login'));
      return;
    }
    if ('token' in res.data) {
      window.localStorage.setItem('token', res.data.token);
    }
  };

  if (isSuccess) {
    return <Navigate to={pageRoutes.MAIN} />;
  }

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        {t('form.login')}
      </Typography.Title>
      <Form name="login" layout={'vertical'} initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label={t('form.label.email')}
          name="email"
          rules={[
            { required: true, message: t('form.validation.userEmail') },
            {
              type: 'email',
              message: t('form.validation.incorrectEmail'),
            },
          ]}
          validateDebounce={700}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label={t('form.label.password')}
          name="password"
          rules={[{ required: true, message: t('form.validation.userPass') }]}
          validateDebounce={700}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {t('form.button.login')}
        </Button>
        {t('form.dontHaveAccount')}{' '}
        <Link to={pageRoutes.REGISTER} style={{ color: '#1677ff' }}>
          {t('form.button.register')}
        </Link>
      </Form>
    </>
  );
}
