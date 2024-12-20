import { getConfigValue, getNavigationValue } from '@brojs/cli';
import { generatePath } from 'react-router-dom';

const baseUrl = getNavigationValue('antd.main');

export const URLs = {
  baseUrl,
  ui: {
    table: getNavigationValue('antd.table') && `${baseUrl}${getNavigationValue('antd.table')}`,
    userId: {
      url: `${baseUrl}${getNavigationValue('antd.user.id')}`,
      on: Boolean(getNavigationValue('antd.user.id')),
      getUrl: (id: string) =>
        generatePath(`${baseUrl}${getNavigationValue('antd.user.id')}`, { id }),
    },
    login:
      getNavigationValue('antd.auth.login') && `${baseUrl}${getNavigationValue('antd.auth.login')}`,
    register:
      getNavigationValue('antd.auth.register') &&
      `${baseUrl}${getNavigationValue('antd.auth.register')}`,
  },
  api: {
    main: getConfigValue('antd-table-v2.api'),
  },
};
