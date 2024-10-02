import { Button, Layout } from 'antd';
import React, { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/shared/consts';
import { UserForm } from '@/widgets/user-form';

const { Header, Content } = Layout;

export function UserPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header style={{ backgroundColor: '#52618d' }}>
        <Button onClick={() => navigate(pageRoutes.MAIN)}>На главную</Button>
      </Header>
      <Content style={{ marginInline: 50 }}>
        <UserForm />
      </Content>
    </Layout>
  );
}

export default UserPage;
