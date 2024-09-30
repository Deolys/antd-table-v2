import { Button, Table } from 'antd';
import React, { type JSX, type Key, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import editIcon from '@/assets/icons/edit-icon.svg';
import {
  selectedUserIds,
  setSelectedUsers,
} from '@/features/delete-users-button/model/selected-users-slice';
import { userFilter } from '@/features/user-filter/model/user-filter-slce';
import { usersApi } from '@/shared/api/users-api';
import { pageRoutes } from '@/shared/consts/page-routes';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';
import { User } from '@/shared/types/user';

import { userTableHeaders } from '../consts/user-table-headers';
import { usersInitiating, usersList, usersLoading } from '../model/users-slice';

export function UsersTable(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectedUserIds);
  const users = useAppSelector(usersList);
  const loading = useAppSelector(usersLoading);
  const initiating = useAppSelector(usersInitiating);
  const filters = useAppSelector(userFilter);

  useEffect(() => {
    if (!initiating) {
      dispatch(usersApi.fetchFilteredUsers(filters));
    }
  }, [dispatch, filters, initiating]);

  const columns = [
    ...userTableHeaders,
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (record: User) => (
        <Button
          icon={
            <img width={24} height={24} src={editIcon} title="Редактировать" alt="Редактирование" />
          }
          onClick={() => navigate(`${pageRoutes.USER_FORM}/${record.id}`)}
        />
      ),
      width: '4%',
    },
  ];

  const rowSelection = {
    onChange: (_: Key[], selectedRows: User[]) => {
      dispatch(setSelectedUsers(selectedRows.map((r) => r.id)));
    },
    selectedRowKeys: selectedIds,
  };

  return (
    <Table
      bordered
      loading={loading || initiating}
      dataSource={users}
      columns={columns}
      rowKey={(record) => record.id}
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
    />
  );
}
