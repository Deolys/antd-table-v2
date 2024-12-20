import { Breadcrumb, Button, Flex, Layout } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import { LogoutButton } from '@/features/auth';
import { LanguageSelect } from '@/features/language-select';
import { UserForm } from '@/widgets/user-form';

const { Header, Content } = Layout;

export function UserPage(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const screen = useBreakpoint();

  return (
    <Layout>
      <Header style={{ backgroundColor: '#52618d', paddingInline: screen.md ? 50 : 10 }}>
        <Flex justify="space-between" gap={14} align="center" style={{ height: '100%' }}>
          <Link
            to={`${URLs.ui.table}?${location.state?.searchParams || 'page=1'}`}
            style={{ display: 'contents' }}
          >
            <Button>{t('pages.table')}</Button>
          </Link>
          <Flex gap={14}>
            <LanguageSelect />
            <LogoutButton />
          </Flex>
        </Flex>
      </Header>
      <Content style={{ paddingInline: screen.md ? 50 : 10 }}>
        <Breadcrumb
          items={[
            {
              title: (
                <Link
                  to={URLs.baseUrl}
                  state={{ searchParams: `${location.state?.searchParams || 'page=1'}` }}
                >
                  {t('pages.home')}
                </Link>
              ),
            },
            {
              title: (
                <Link to={`${URLs.ui.table}?${location.state?.searchParams || 'page=1'}`}>
                  {t('pages.table')}
                </Link>
              ),
            },
            { title: t('pages.user') },
            { title: location.pathname.split('/').pop() },
          ]}
          style={{ position: 'absolute', left: screen.md ? 50 : 10 }}
        />
        <UserForm />
      </Content>
    </Layout>
  );
}

export default UserPage;
