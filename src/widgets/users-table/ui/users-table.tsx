import { Table } from 'antd';
import React, { type JSX } from 'react';

import { useTableColumns, useTableParams } from '../lib/hooks';

export function UsersTable(): JSX.Element {
  const { tableParams, handleTableChange, users, skip, isFetching, rowSelection } =
    useTableParams();
  const columns = useTableColumns(skip);

  return (
    <Table
      bordered
      size="middle"
      loading={isFetching}
      dataSource={users}
      columns={columns}
      pagination={tableParams.pagination}
      rowKey={(record) => record._id}
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      scroll={{ x: 'max-content', y: 'calc(95vh - 180px)' }}
      onChange={handleTableChange}
    />
  );
}
