import { Button, Popconfirm } from 'antd';
import React, { type JSX } from 'react';

import { usersApi } from '@/shared/api/users-api';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';

import { selectedUserIds } from '../model/selected-users-slice';

export function DeleteUsersButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedUsers = useAppSelector(selectedUserIds);

  return (
    <Popconfirm
      title="Удаление"
      description="Вы уверены, что хотите удалить выбранных пользователей?"
      onConfirm={() => dispatch(usersApi.deleteUsers(selectedUsers))}
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
