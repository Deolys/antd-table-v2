import type { TableProps } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import type { User } from '@/entities/user';
import { useGetFilteredUsersQuery } from '@/entities/user';
import { selectedUserIds, setSelectedUsers } from '@/features/delete-users-button';
import { DATE_FORMAT, FILTER_START_DATE } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/hooks';
import { useAppSelector } from '@/shared/lib/hooks';
import { showErrorMessage } from '@/shared/lib/utils';

import type { TableParams } from '../../model';

interface TableParamsHook {
  tableParams: TableParams;
  handleTableChange: TableProps<AnyObject>['onChange'];
  users?: User[];
  skip: number;
  isFetching: boolean;
  rowSelection: TableRowSelection;
}

export function useTableParams(): TableParamsHook {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
    },
  });

  const currentPage = tableParams.pagination.current;

  const limit = tableParams.pagination.pageSize;
  const skip = (currentPage - 1) * limit;

  const {
    data: users,
    error,
    isFetching,
  } = useGetFilteredUsersQuery({
    email: searchParams.get('email'),
    name: searchParams.get('name'),
    type_id: +searchParams.get('type_id'),
    dateRange: searchParams.get('dateRange')?.split(',') || [
      dayjs(FILTER_START_DATE).format(DATE_FORMAT),
      dayjs().format(DATE_FORMAT),
    ],
    skip,
    limit,
  });

  useEffect(() => {
    if (users && !error) {
      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: users?.count || 0,
        },
      }));
    }
  }, [users, error]);

  useEffect(() => {
    if (error) {
      showErrorMessage(t('messages.error.userList'));
    }
  }, [error, t]);

  const selectedIds = useAppSelector(selectedUserIds);

  const rowSelection = {
    onChange: (_: Key[], selectedRows: User[]) => {
      dispatch(setSelectedUsers(selectedRows.map((r) => r._id)));
    },
    selectedRowKeys: selectedIds,
  };

  const handleTableChange: TableProps<AnyObject>['onChange'] = (pagination) => {
    setTableParams((prevTableParams) => ({
      ...prevTableParams,
      pagination,
    }));
    const page = `${pagination.current}`;
    setSearchParams((prev) => {
      prev.set('page', page);
      return prev;
    });
  };

  return {
    tableParams,
    handleTableChange,
    users: users?.data,
    skip,
    isFetching,
    rowSelection,
  };
}
