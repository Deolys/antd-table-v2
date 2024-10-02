import type { FormProps } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { CreateUser } from '@/entities/user';
import { useCreateUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from '@/entities/user';
import { showErrorMessage, showSuccessMessage } from '@/shared/lib/utils';

interface UserFormHook {
  user: CreateUser | null;
  isLoading: boolean;
  onFinish: FormProps<CreateUser>['onFinish'];
}

export function useUserForm(): UserFormHook {
  const { id } = useParams();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (error) {
      showErrorMessage('Пользователь не найден');
    }
  }, [error]);

  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();

  const onFinish: FormProps<CreateUser>['onFinish'] = async (values) => {
    if (user) {
      const res = await updateUser({ ...values, _id: id });

      if (res.data) {
        showSuccessMessage('Данные пользователя успешно обновлены');
      } else if (res.error) {
        showErrorMessage('Произошла ошибка при обновлении данных пользователя');
      }
    } else {
      const res = await createUser(values);

      if (res.data) {
        showSuccessMessage('Пользователь успешно создан');
      } else if (res.error) {
        showErrorMessage('Произошла ошибка при создании пользователя');
      }
    }
  };

  return { user, isLoading, onFinish };
}
