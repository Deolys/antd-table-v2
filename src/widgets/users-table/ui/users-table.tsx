import { Table } from 'antd';
import dayjs from 'dayjs';
import React, { type JSX, type Key, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import type { User } from '@/entities/user';
import { useGetFilteredUsersQuery } from '@/entities/user';
import { selectedUserIds, setSelectedUsers } from '@/features/delete-users-button';
import { DATE_FORMAT, FILTER_START_DATE } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/hooks';
import { useAppSelector } from '@/shared/lib/hooks';
import { showErrorMessage } from '@/shared/lib/utils';

import { useTableColumns } from '../lib/hooks';

export function UsersTable(): JSX.Element {
  const { t } = useTranslation();
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
      showErrorMessage(t('messages.error.userList'));
    }
  }, [error, t]);

  const columns = useTableColumns();
  const selectedIds = useAppSelector(selectedUserIds);

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
