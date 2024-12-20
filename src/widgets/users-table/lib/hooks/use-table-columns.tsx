import { Button, type TableColumnsType } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import editIcon from '@/assets/icons/edit-icon.svg';
import type { User } from '@/entities/user';
import { DATE_FORMAT } from '@/shared/consts';

export function useTableColumns(numberSkip: number = 0): TableColumnsType<AnyObject> {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const columns = useMemo(
    (): TableColumnsType<AnyObject> => [
      {
        title: '№',
        dataIndex: '_id',
        key: 'identifier',
        fixed: 'left',
        width: 50,
        render: (_text, _record, index: number) => <span>{index + numberSkip + 1}</span>,
      },
      { title: t('user.email'), dataIndex: 'email', key: 'email', width: 150, ellipsis: true },
      { title: t('user.name'), dataIndex: 'name', key: 'name', width: 150 },
      { title: t('user.typeName'), dataIndex: 'type', key: 'type', width: 150 },
      { title: t('user.project'), dataIndex: 'project', key: 'project', width: 150 },
      {
        title: t('user.lastVisitDate'),
        dataIndex: 'last_visit_date',
        key: 'last_visit_date',
        width: 150,
        render: (date: string) => dayjs(date).format(DATE_FORMAT),
      },
      {
        title: t('user.description'),
        dataIndex: 'description',
        key: 'description',
        width: 400,
        ellipsis: true,
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (_text, record: User) => (
          <Button
            icon={
              <img
                width={24}
                height={24}
                src={editIcon}
                title={t('common.edit')}
                alt={t('common.edit')}
              />
            }
            onClick={() =>
              navigate(URLs.ui.userId.getUrl(record._id), {
                state: { searchParams: `${searchParams}` },
              })
            }
          />
        ),
        fixed: 'right',
        width: 48,
      },
    ],
    [navigate, t, numberSkip, searchParams],
  );

  return columns;
}
