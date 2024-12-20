import { Button, Flex, Layout, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import image404 from '@/assets/icons/404.svg';
import { LanguageSelect } from '@/features/language-select';

const { Header, Content } = Layout;

export function NotFoundPage(): JSX.Element {
  const { t } = useTranslation();
  const screen = useBreakpoint();

  return (
    <Layout>
      <Header style={{ backgroundColor: '#52618d', paddingInline: screen.md ? 50 : 10 }}>
        <Flex justify="space-between" gap={14} align="center" style={{ height: '100%' }}>
          <Link to={URLs.baseUrl} style={{ display: 'contents' }}>
            <Button>{t('pages.home')}</Button>
          </Link>
          <LanguageSelect />
        </Flex>
      </Header>
      <Content>
        <Flex align="center" justify="center" vertical style={{ height: '80dvh' }}>
          <Typography.Title style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            {t('text.pageIsHiding')}
          </Typography.Title>
          <img src={image404} alt="404 page" style={{ width: '70%', marginBottom: 20 }} />
          <Flex gap={16}>
            <Typography.Text style={{ fontSize: 18 }}>{t('text.canFindIt')}</Typography.Text>
            <Link to={URLs.baseUrl} style={{ display: 'contents' }}>
              <Button type="primary">{t('text.searchHere')}</Button>
            </Link>
          </Flex>
        </Flex>
      </Content>
    </Layout>
  );
}
