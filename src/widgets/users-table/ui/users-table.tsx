import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import React, { type JSX, type Key, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import editIcon from '@/assets/icons/edit-icon.svg';
import { selectedUserIds, setSelectedUsers } from '@/features/delete-users-button';
import { useGetFilteredUsersQuery } from '@/shared/api/users-api';
import { DATE_FORMAT, FILTER_START_DATE } from '@/shared/consts';
import { pageRoutes } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/hooks';
import { useAppSelector } from '@/shared/lib/hooks';
import { showErrorMessage } from '@/shared/lib/utils';
import type { User } from '@/shared/types';

import { userTableHeaders } from '../consts';

export function UsersTable(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const {
    data: users,
    error,
    isFetching,
  } = useGetFilteredUsersQuery({
    name: params.get('name'),
    type_id: +params.get('type_id'),
    dateRange: params.get('dateRange')?.split(',') || [
      dayjs(FILTER_START_DATE).format(DATE_FORMAT),
      dayjs().format(DATE_FORMAT),
    ],
  });

  useEffect(() => {
    if (error) {
      console.log('er');
      showErrorMessage('Возникла ошибка при получении списка пользователей');
    }
  }, [error]);

  const selectedIds = useAppSelector(selectedUserIds);

  console.log('userTableHeaders: ', userTableHeaders);
  const columns = [
    ...userTableHeaders,
    {
      title: 'Время последнего посещения',
      dataIndex: 'last_visit_date',
      key: 'last_visit_date',
      width: '18%',
      render: (date: string) => dayjs(date).format(DATE_FORMAT),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (record: User) => (
        <Button
          icon={
            <img width={24} height={24} src={editIcon} title="Редактировать" alt="Редактирование" />
          }
          onClick={() => navigate(`${pageRoutes.USER_FORM}/${record._id}`)}
        />
      ),
      width: '4%',
    },
  ];

  const rowSelection = {
    onChange: (_: Key[], selectedRows: User[]) => {
      dispatch(setSelectedUsers(selectedRows.map((r) => r._id)));
    },
    selectedRowKeys: selectedIds,
  };

  return (
    <Table
      bordered
      loading={isFetching}
      dataSource={users}
      columns={columns}
      rowKey={(record) => record._id}
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
    />
  );
}
