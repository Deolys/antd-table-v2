import { Button, Flex, Layout, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { URLs } from '@/__data__/urls';
import smileIcon from '@/assets/icons/smile.svg';
import linearCirclesImage from '@/assets/images/linear-circles.png';
import robotImage from '@/assets/images/robot.png';
import { LogoutButton, selectIsAuth } from '@/features/auth';
import { LanguageSelect } from '@/features/language-select';
import { useAppSelector } from '@/shared/lib/hooks';

import './home-page.css';

const { Header, Content, Footer } = Layout;

export function HomePage(): JSX.Element {
  const isAuth = useAppSelector(selectIsAuth);
  const { t } = useTranslation();
  const location = useLocation();
  const screen = useBreakpoint();

  return (
    <Layout style={{ backgroundColor: 'transparent' }}>
      <Header style={{ backgroundColor: '#52618d', paddingInline: screen.md ? 50 : 10 }}>
        <Flex justify="space-between" gap={14} align="center" style={{ height: '100%' }}>
          {isAuth && (
            <Link
              to={`${URLs.ui.table}?${location.state?.searchParams || 'page=1'}`}
              style={{ display: 'contents' }}
            >
              <Button>{t('pages.table')}</Button>
            </Link>
          )}
          <Flex gap={14} style={{ marginLeft: 'auto' }}>
            <LanguageSelect />
            {isAuth ? (
              <LogoutButton />
            ) : (
              <Link to={URLs.ui.login} style={{ display: 'contents' }}>
                <Button type="primary">{t('form.login')}</Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Header>
      <Content
        style={{
          paddingInline: screen.md ? 50 : 10,
          width: '100%',
        }}
        className="home-page__animated-area"
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
          }}
        >
          <img src={robotImage} style={{ width: '40dvh' }} alt="robot" loading="lazy" />
        </div>
        <Flex
          justify="end"
          align="center"
          style={{
            height: '80dvh',
            backgroundImage: `url(${linearCirclesImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50dvh auto',
            backgroundPosition: 'right',
          }}
        >
          <Typography.Title
            level={1}
            style={{
              fontSize: '3.5rem',
              marginRight: 'clamp(0rem, -35.821rem + 55.97vw, 18.75rem)',
            }}
            className={'home-page-title'}
          >
            Advanced Networked
            <br />
            Typed Data Table
          </Typography.Title>
        </Flex>
        <ul className="home-page__animated-cubes">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index} />
          ))}
        </ul>
      </Content>
      <Footer style={{ padding: 0 }}>
        <Flex
          align="center"
          style={{
            position: 'fixed',
            right: 0,
            bottom: 10,
            backgroundColor: '#d4e4ff',
            borderRadius: '20px 0 0 20px',
            border: '2px solid #fff',
            borderRight: 'none',
          }}
        >
          <div style={{ margin: '14px 0 14px 14px' }}>
            <img width={40} height={40} src={smileIcon} alt="smile" />
          </div>
          <div style={{ padding: 14 }}>
            <p>{t('text.slogan')}</p>
            <p>
              <Typography.Link href="https://t.me/alednik">
                &copy;Solo Leveling Team 2024
              </Typography.Link>
            </p>
          </div>
        </Flex>
      </Footer>
    </Layout>
  );
}

export default HomePage;
