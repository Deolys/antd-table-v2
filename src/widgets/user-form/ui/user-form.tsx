import { Flex, Form, Input, Select, Typography } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { FormSubmitButton } from '@/features/form-submit-button';
import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks';

import { useUserForm } from '../lib/hooks';
import { UserFormSkeleton } from './user-form.skeleton';

export function UserForm(): JSX.Element {
  const { t } = useTranslation();
  const { user, isLoading, onFinish } = useUserForm();
  const { options } = useUserTypeSelect();
  const [form] = Form.useForm();

  if (isLoading) {
    return <UserFormSkeleton />;
  }

  return (
    <Form
      form={form}
      style={{
        padding: 20,
        maxWidth: 500,
        margin: '40px auto',
        borderRadius: 10,
        border: '1px solid #52618d',
      }}
      onFinish={onFinish}
      initialValues={user?.name ? user : undefined}
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
        rules={[{ required: true, message: t('form.validation.userEmail') }]}
      >
        <Input allowClear placeholder={t('form.placeholder.userEmail')} />
      </Form.Item>
      <Form.Item
        label={t('form.label.userPass')}
        name="password"
        rules={[{ required: true, message: t('form.validation.userPass') }]}
      >
        <Input.Password placeholder={t('form.placeholder.userPass')} />
      </Form.Item>
      <Form.Item
        label={t('form.label.type')}
        name="type_id"
        rules={[{ required: true, message: t('form.validation.type') }]}
      >
        <Select
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
      <Flex justify="end">
        <FormSubmitButton form={form}>{t('form.button.send')}</FormSubmitButton>
      </Flex>
    </Form>
  );
}
