import { Flex, Form, Input, Select, Typography } from 'antd';
import React, { type JSX } from 'react';

import { FormSubmitButton } from '@/features/form-submit-button';
import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks';

import { useUserForm } from '../lib/hooks';
import { UserFormSkeleton } from './user-form.skeleton';

export function UserForm(): JSX.Element {
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
        {user ? 'Редактирование пользователя' : 'Создание пользователя'}
      </Typography.Title>
      <Form.Item
        label="Имя пользователя:"
        name="name"
        rules={[{ required: true, message: 'Заполните поле имени' }]}
      >
        <Input allowClear placeholder="Введите имя пользователя" />
      </Form.Item>
      <Form.Item
        label="Логин пользователя:"
        name="login"
        rules={[{ required: true, message: 'Заполните поле логина' }]}
      >
        <Input allowClear placeholder="Введите логин пользователя" />
      </Form.Item>
      <Form.Item
        label="Пароль пользователя:"
        name="password"
        rules={[{ required: true, message: 'Заполните поле пароля' }]}
      >
        <Input allowClear placeholder="Введите пароль пользователя" />
      </Form.Item>
      <Form.Item
        label="Тип пользователя:"
        name="type_id"
        rules={[{ required: true, message: 'Заполните поле типа' }]}
      >
        <Select
          allowClear
          showSearch
          placeholder="Выберите тип пользователя"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={options}
        />
      </Form.Item>
      <Flex justify="end">
        <FormSubmitButton form={form}>Отправить</FormSubmitButton>
      </Flex>
    </Form>
  );
}
