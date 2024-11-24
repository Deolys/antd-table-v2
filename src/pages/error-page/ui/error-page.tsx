import { Button, Flex } from 'antd';
import { Layout, Typography } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import catFailImage from '@/assets/images/cat-fail.jpg';

const { Content } = Layout;

export function ErrorPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout>
      <Content>
        <Flex justify="center" align="center" vertical style={{ height: '100vh' }}>
          <Typography.Title level={3}>{t('messages.error.something')}</Typography.Title>
          <img src={catFailImage} alt="error" width={400} />
          <Button type="primary" onClick={() => navigate(URLs.baseUrl)} style={{ marginTop: 16 }}>
            {t('common.toMain')}
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
}
