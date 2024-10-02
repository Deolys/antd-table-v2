import { Button, Flex, Layout, Spin } from 'antd';
import React, { type JSX, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteUsersButton } from '@/features/delete-users-button';
import { pageRoutes } from '@/shared/consts';
import { UsersTable } from '@/widgets/users-table';

const { Header, Sider, Content } = Layout;
const FiltersForm = lazy(() => import('@/widgets/filters-form'));

export function MainPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header style={{ backgroundColor: '#52618d', position: 'sticky', top: 0, zIndex: 1 }}>
        <Flex justify="end" gap={14} align="center" style={{ height: '100%' }}>
          <Button onClick={() => navigate(pageRoutes.NEW_USER_FORM)}>Добавить пользователя</Button>
          <DeleteUsersButton />
        </Flex>
      </Header>
      <Layout>
        <Content style={{ marginInline: 50 }}>
          <UsersTable />
        </Content>
        <Sider
          width={320}
          defaultCollapsed
          collapsible
          collapsedWidth={0}
          zeroWidthTriggerStyle={{
            insetInlineStart: '-40px',
            borderRadius: '6px 0 0 6px',
            backgroundColor: '#d5dfff',
            color: '#1890ff',
          }}
          style={{
            height: 'calc(100vh - 64px)',
            position: 'sticky',
            top: 64,
            right: 0,
            display: 'block',
            backgroundColor: '#f7f9ff',
            boxShadow: '-10px 0 10px -4px rgba(59, 84, 108, 0.1)',
          }}
        >
          <Suspense fallback={<Spin />}>
            <FiltersForm />
          </Suspense>
        </Sider>
      </Layout>
    </Layout>
  );
}

export default MainPage;
