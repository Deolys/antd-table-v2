import type { FormProps } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (error) {
      showErrorMessage(t('messages.error.notFoundUser'));
    }
  }, [error, t]);

  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();

  const onFinish: FormProps<CreateUser>['onFinish'] = async (values) => {
    if (user) {
      const res = await updateUser({ ...values, _id: id });

      if (res.data) {
        showSuccessMessage(t('messages.success.updateUser'));
      } else if (res.error) {
        showErrorMessage(t('messages.error.updateUser'));
      }
    } else {
      const res = await createUser(values);

      if (res.data) {
        showSuccessMessage(t('messages.success.createUser'));
      } else if (res.error) {
        showErrorMessage(t('messages.error.createUser'));
      }
    }
  };

  return { user, isLoading, onFinish };
}
