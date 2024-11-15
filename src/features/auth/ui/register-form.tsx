import { Button, Form, type FormProps, Input, Typography } from 'antd';
import React, { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';

import { pageRoutes, signUpPasswordRules } from '@/shared/consts';
import { showErrorMessage } from '@/shared/lib/utils';
import { PasswordStrength } from '@/shared/ui';

import { useRegisterMutation } from '../api';
import { rulesValidator } from '../lib/utils';

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  description?: string;
};

export function RegisterForm(): JSX.Element {
  const { t } = useTranslation();
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [passwordValue, setPasswordValue] = useState('');

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { name, email, password, description } = values;
    if (!name || !email || !password) {
      return;
    }
    const res = await register({ name, email, password, type_id: 5, description });
    if (res.error || !res.data) {
      showErrorMessage(t('messages.error.register'));
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
        {t('form.register')}
      </Typography.Title>
      <Form
        name="sign-up"
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label={t('form.label.name')}
          name="name"
          rules={[{ required: true, message: t('form.validation.name') }]}
          hasFeedback
        >
          <Input />
        </Form.Item>
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
          rules={[
            { required: true, message: t('form.validation.userPass') },
            () => ({
              validator(_, value) {
                setPasswordValue(value);
                const result = rulesValidator(signUpPasswordRules, value);
                return new Promise((resolve, reject) =>
                  result.success ? resolve('') : reject(t(result.message || '')),
                );
              },
            }),
          ]}
          validateDebounce={700}
          hasFeedback
        >
          <Input.Password data-testid="password" />
        </Form.Item>
        <PasswordStrength password={passwordValue} />
        <Form.Item<FieldType>
          label={t('form.label.confirmPassword')}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: t('form.validation.userPass') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t('form.validation.passwordsMatch'));
              },
            }),
          ]}
          validateDebounce={700}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t('form.label.aboutMe')}
          name="description"
          rules={[{ max: 400, message: t('form.validation.maxLength400') }]}
        >
          <Input.TextArea placeholder={t('form.placeholder.description')} />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {t('form.button.register')}
        </Button>
        {t('form.haveAccount')}{' '}
        <Link to={pageRoutes.LOGIN} style={{ color: '#1677ff' }}>
          {t('form.button.login')}
        </Link>
      </Form>
    </>
  );
}
