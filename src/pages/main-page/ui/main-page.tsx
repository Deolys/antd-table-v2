import { Button, Flex, Layout, Menu, Spin } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { type JSX, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import menuIcon from '@/assets/icons/menu-icon.svg';
import { DeleteUsersButton } from '@/features/delete-users-button';
import { LanguageSelect } from '@/features/language-select';
import { pageRoutes } from '@/shared/consts';
import type { MenuItem } from '@/shared/types';
import { UsersTable } from '@/widgets/users-table';

const { Header, Sider, Content } = Layout;
const FiltersForm = lazy(() => import('@/widgets/filters-form'));

export function MainPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const screen = useBreakpoint();

  const handleAddUser = (): void => {
    navigate(pageRoutes.NEW_USER_FORM, { state: { searchParams: `${searchParams}` } });
  };

  const items: MenuItem[] = [
    {
      key: 'menu',
      label: <img src={menuIcon} alt="menu" title="menu" />,
      children: [
        {
          type: 'item',
          key: 'addUser',
          label: (
            <Button onClick={handleAddUser} block={!screen.md}>
              {t('user.add')}
            </Button>
          ),
        },
        {
          type: 'item',
          key: 'deleteUsers',
          label: <DeleteUsersButton />,
        },
      ],
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: '#52618d',
          position: 'sticky',
          top: 0,
          zIndex: 6,
          paddingInline: screen.md ? 50 : 10,
        }}
      >
        <Flex justify="end" gap={14} align="center" style={{ height: '100%' }}>
          {screen.md ? (
            <>
              <Button onClick={handleAddUser} block={!screen.md}>
                {t('user.add')}
              </Button>
              <DeleteUsersButton />
              <LanguageSelect />
            </>
          ) : (
            <>
              <LanguageSelect />
              <Menu mode="horizontal" items={items} style={{ backgroundColor: '#52618d' }} />
            </>
          )}
        </Flex>
      </Header>
      <Layout>
        <Content style={{ paddingInline: screen.md ? 50 : 10, paddingTop: 48 }}>
          <UsersTable />
        </Content>
        <Sider
          width={screen.xs ? 280 : 320}
          breakpoint="xl"
          defaultCollapsed
          collapsible
          collapsedWidth={0}
          zeroWidthTriggerStyle={{
            insetInlineStart: '-40px',
            top: !screen.md && 4,
            borderRadius: '6px 0 0 6px',
            backgroundColor: '#d5dfff',
            color: '#1890ff',
          }}
          style={{
            height: 'calc(100dvh - 64px)',
            position: screen.lg ? 'sticky' : 'absolute',
            zIndex: 5,
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
