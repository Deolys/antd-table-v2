import { Button, Flex } from 'antd';
import Layout, { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import catFailImage from '@/assets/images/cat-fail.jpg';
import { pageRoutes } from '@/shared/consts';

export function ErrorPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout>
      <Content>
        <Flex justify="center" align="center" vertical style={{ height: '100vh' }}>
          <Title level={3}>{t('messages.error.something')}</Title>
          <img src={catFailImage} alt="error" width={400} />
          <Button
            type="primary"
            onClick={() => navigate(pageRoutes.MAIN)}
            style={{ marginTop: 16 }}
          >
            {t('common.toMain')}
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
}
