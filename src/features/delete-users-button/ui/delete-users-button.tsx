import { Button, Popconfirm } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeleteUsersMutation } from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { showErrorMessage, showSuccessMessage } from '@/shared/lib/utils';

import { clearSelectedUsers, selectedUserIds } from '../model/selected-users-slice';

export function DeleteUsersButton(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedUsers = useAppSelector(selectedUserIds);
  const [deleteUsers] = useDeleteUsersMutation();

  const handleDelete = async (): Promise<void> => {
    try {
      const res = await deleteUsers(selectedUsers);

      if (!res.error) {
        const count = selectedUsers.length;
        const tKey = count === 1 ? 'one' : 'many';
        showSuccessMessage(t(`messages.success.deleteUsers.${tKey}`, { count }));
        dispatch(clearSelectedUsers());
      }
    } catch {
      showErrorMessage(t(`messages.error.deleteUsers`));
    }
  };

  return (
    <Popconfirm
      title={t('common.deletion')}
      description={t('messages.warn.deleteUsers')}
      onConfirm={handleDelete}
      okText={t('common.yes')}
      cancelText={t('common.no')}
      okButtonProps={{ style: { width: 70 } }}
      cancelButtonProps={{ style: { width: 70 } }}
    >
      <Button danger disabled={selectedUsers.length === 0}>
        {t('user.delete')}
      </Button>
    </Popconfirm>
  );
}
