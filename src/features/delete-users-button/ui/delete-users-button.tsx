import { Button, Popconfirm } from 'antd';
import React, { type JSX } from 'react';

import { useDeleteUsersMutation } from '@/shared/api/users-api';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';
import { showErrorMessage, showSuccessMessage } from '@/shared/lib/utils/messages';

import { selectedUserIds } from '../model/selected-users-slice';

export function DeleteUsersButton(): JSX.Element {
  const selectedUsers = useAppSelector(selectedUserIds);
  const [deleteUsers] = useDeleteUsersMutation();

  const handleDelete = async (): Promise<void> => {
    try {
      const res = await deleteUsers(selectedUsers);

      if (!res.error) {
        showSuccessMessage('Удаление прошло успешно');
      }
    } catch {
      showErrorMessage('Произошла ошибка при удалении');
    }
  };

  return (
    <Popconfirm
      title="Удаление"
      description="Вы уверены, что хотите удалить выбранных пользователей?"
      onConfirm={handleDelete}
      okText="Да"
      cancelText="Нет"
      okButtonProps={{ style: { width: 70 } }}
      cancelButtonProps={{ style: { width: 70 } }}
    >
      <Button danger disabled={selectedUsers.length === 0}>
        Удалить выбранных
      </Button>
    </Popconfirm>
  );
}
