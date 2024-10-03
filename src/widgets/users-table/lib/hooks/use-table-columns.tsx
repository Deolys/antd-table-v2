import { Button, type TableColumnProps } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import editIcon from '@/assets/icons/edit-icon.svg';
import type { User } from '@/entities/user';
import { DATE_FORMAT, pageRoutes } from '@/shared/consts';

export function useTableColumns(): TableColumnProps<AnyObject>[] {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { title: 'ID', dataIndex: '_id', key: 'identifier', width: '2%' },
      { title: t('user.login'), dataIndex: 'login', key: 'login', width: '18%' },
      { title: t('user.password'), dataIndex: 'password', key: 'password', width: '18%' },
      { title: t('user.name'), dataIndex: 'name', key: 'name', width: '18%' },
      { title: t('user.typeName'), dataIndex: 'type', key: 'type', width: '18%' },
      {
        title: t('user.lastVisitDate'),
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
              <img
                width={24}
                height={24}
                src={editIcon}
                title={t('common.edit')}
                alt={t('common.edit')}
              />
            }
            onClick={() => navigate(`${pageRoutes.USER_FORM}/${record._id}`)}
          />
        ),
        width: '4%',
      },
    ],
    [navigate, t],
  );

  return columns;
}
