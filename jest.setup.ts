/* eslint-disable prettier/prettier */
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
import { server } from '@/shared/test/msw/server';

jest.mock('@brojs/cli', () => ({
 getConfigValue: jest.fn(() => 'http://api'),
 getNavigationValue: jest.fn((key) => {
  switch (key) {
   case 'antd-table-v2.main': return '/antd-table-v2';
   case 'antd-table-v2.user.id': return '/user/:id';
   case 'antd-table-v2.auth.login': return '/auth/login';
   case 'antd-table-v2.auth.register': return '/auth/register';
   default: return ''; 
  }
 }),
}));

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
