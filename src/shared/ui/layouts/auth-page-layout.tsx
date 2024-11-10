import { Flex, Layout } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { type ReactNode } from 'react';

import handsPhoneImage from '@/assets/images/hands-phone.svg';
import { LanguageSelect } from '@/features/language-select';

const { Header, Content } = Layout;

export function AuthPageLayout({ children }: { children: ReactNode }): ReactNode {
  const screen = useBreakpoint();

  return (
    <Layout>
      <Header style={{ backgroundColor: '#52618d', paddingInline: screen.md ? 50 : 10 }}>
        <Flex justify="end" align="center" style={{ height: '100%' }}>
          <LanguageSelect />
        </Flex>
      </Header>
      <Content style={{ paddingInline: screen.md ? 50 : 10, width: '100%' }}>
        <div
          style={{
            backgroundImage: `url(${handsPhoneImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 50,
            minHeight: 400,
          }}
        >
          <div
            style={{
              backgroundColor: '#dde9ff',
              maxWidth: 410,
              margin: '70px auto',
              padding: 16,
              borderRadius: 16,
              border: '1px solid #9bbeff',
            }}
          >
            {children}
          </div>
        </div>
      </Content>
    </Layout>
  );
}
