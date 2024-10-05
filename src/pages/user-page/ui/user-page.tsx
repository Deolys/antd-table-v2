import { Button, Flex, Layout } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { LanguageSelect } from '@/features/language-select';
import { pageRoutes } from '@/shared/consts';
import { UserForm } from '@/widgets/user-form';

const { Header, Content } = Layout;

export function UserPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <Header style={{ backgroundColor: '#52618d' }}>
        <Flex justify="space-between" gap={14} align="center" style={{ height: '100%' }}>
          <Button
            onClick={() =>
              navigate(`${pageRoutes.MAIN}?${location.state.searchParams || 'page=1'}`)
            }
          >
            {t('common.toMain')}
          </Button>
          <LanguageSelect />
        </Flex>
      </Header>
      <Content style={{ marginInline: 50 }}>
        <UserForm />
      </Content>
    </Layout>
  );
}

export default UserPage;
