import { Empty, Table } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { useTableColumns, useTableParams } from '../lib/hooks';

export function UsersTable(): JSX.Element {
  const { tableParams, handleTableChange, users, skip, isFetching, rowSelection } =
    useTableParams();
  const columns = useTableColumns(skip);
  const { t } = useTranslation();

  if (!isFetching && !users?.length) {
    return <Empty description={t('messages.error.emptyData')} />;
  }

  return (
    <Table
      bordered
      virtual
      size="middle"
      loading={isFetching}
      dataSource={users}
      columns={columns}
      pagination={tableParams.pagination}
      rowKey={(record) => record._id}
      rowSelection={{
        type: 'checkbox',
        columnWidth: 50,
        ...rowSelection,
      }}
      scroll={{ x: 1148, y: document.documentElement.clientHeight * 0.95 - 208 }}
      onChange={handleTableChange}
    />
  );
}
