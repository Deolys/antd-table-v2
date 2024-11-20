import { Flex, Form, Input, Select, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectProject, selectTypeId } from '@/features/auth';
import { rulesValidator } from '@/features/auth/lib/utils';
import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks';
import { ADMIN_TYPE_ID, USER_TYPE_ID, signUpPasswordRules } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib/hooks';
import { FormSubmitButton, PasswordStrength } from '@/shared/ui';

import { useUserForm } from '../lib/hooks';
import { UserFormSkeleton } from './user-form.skeleton';

export function UserForm(): JSX.Element {
  const { t } = useTranslation();
  const [passwordValue, setPasswordValue] = useState('');
  const { user, isLoading, onFinish } = useUserForm();
  const { options } = useUserTypeSelect();
  const [form] = Form.useForm();
  const screen = useBreakpoint();
  const typeId = useAppSelector(selectTypeId);
  const project = useAppSelector(selectProject);
  const isAdmin = typeId === ADMIN_TYPE_ID;

  if (isLoading) {
    return <UserFormSkeleton />;
  }

  return (
    <Form
      form={form}
      style={{
        padding: 20,
        width: screen.sm ? 500 : 300,
        margin: '40px auto',
        borderRadius: 10,
        border: '1px solid #52618d',
      }}
      onFinish={onFinish}
      initialValues={user?.name ? user : { type_id: USER_TYPE_ID, project }}
      layout="vertical"
    >
      <Typography.Title level={4} style={{ textAlign: 'center', marginBottom: 20 }}>
        {user ? t('form.editUserTitle') : t('form.createUserTitle')}
      </Typography.Title>
      <Form.Item
        label={t('form.label.userName')}
        name="name"
        rules={[{ required: true, message: t('form.validation.userName') }]}
      >
        <Input allowClear placeholder={t('form.placeholder.userName')} />
      </Form.Item>
      <Form.Item
        label={t('form.label.userEmail')}
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
        <Input allowClear placeholder={t('form.placeholder.userEmail')} />
      </Form.Item>
      <Form.Item
        label={t('form.label.userPass')}
        name="password"
        rules={[
          { required: !user, message: t('form.validation.userPass') },
          () => ({
            validator(_, value) {
              setPasswordValue(value);
              if (user && !value) {
                return Promise.resolve();
              }
              const result = rulesValidator(signUpPasswordRules, value);
              return new Promise((resolve, reject) =>
                result.success ? resolve('') : reject(t(result.message || '')),
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder={t('form.placeholder.userPass')} />
      </Form.Item>
      <PasswordStrength password={passwordValue} />
      <Form.Item
        label={t('form.label.type')}
        name="type_id"
        rules={[{ required: true, message: t('form.validation.type') }]}
      >
        <Select
          disabled={!isAdmin}
          allowClear
          showSearch
          placeholder={t('form.placeholder.type')}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={options}
        />
      </Form.Item>
      <Form.Item
        label={t('user.project')}
        name="project"
        rules={[{ required: true, message: t('form.validation.project') }]}
      >
        <Input allowClear disabled={!isAdmin} placeholder={t('form.placeholder.project')} />
      </Form.Item>
      <Form.Item
        label={t('form.label.aboutMe')}
        name="description"
        rules={[{ max: 400, message: t('form.validation.maxLength400') }]}
      >
        <Input.TextArea placeholder={t('form.placeholder.description')} />
      </Form.Item>
      <Flex justify="end">
        <FormSubmitButton form={form}>{t('form.button.send')}</FormSubmitButton>
      </Flex>
    </Form>
  );
}
