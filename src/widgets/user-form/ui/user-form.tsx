import { Flex, Form, type FormProps, Input, Select, Typography } from 'antd';
import React, { type JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormSubmitButton } from '@/features/form-submit-button';
import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks/use-user-type-select';
import {
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '@/shared/api/users-api';
import { showErrorMessage, showSuccessMessage } from '@/shared/lib/utils/messages';
import type { CreateUser } from '@/shared/types/user';

export function UserForm(): JSX.Element {
  const { id } = useParams();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (error) {
      showErrorMessage('Пользователь не найден');
    }
  }, [error]);

  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();

  const { options } = useUserTypeSelect();
  const [form] = Form.useForm();

  const onFinish: FormProps<CreateUser>['onFinish'] = async (values) => {
    if (user) {
      const res = await updateUser({ ...values, _id: id });
      if (res.data) {
        showSuccessMessage('Данные пользователя успешно обновлены');
      }
      if (res.error) {
        showErrorMessage('Произошла ошибка при обновлении данных пользователя');
      }
    } else {
      const res = await createUser(values);
      if (res.data) {
        showSuccessMessage('Пользователь успешно создан');
      }
      if (res.error) {
        showErrorMessage('Произошла ошибка при создании пользователя');
      }
    }
  };

  return (
    <>
      {!isLoading && (
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
      )}
    </>
  );
}
