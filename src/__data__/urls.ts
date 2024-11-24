import { getConfigValue, getNavigationValue } from '@brojs/cli';
import { generatePath } from 'react-router-dom';

const baseUrl = getNavigationValue('antd-table-v2.main');

export const URLs = {
  baseUrl,
  ui: {
    userId: {
      url: `${baseUrl}${getNavigationValue('antd-table-v2.user.id')}`,
      on: Boolean(getNavigationValue('antd-table-v2.user.id')),
      getUrl: (id: string) =>
        generatePath(`${baseUrl}${getNavigationValue('antd-table-v2.user.id')}`, { id }),
    },
    login:
      getNavigationValue('antd-table-v2.auth.login') &&
      `${baseUrl}${getNavigationValue('antd-table-v2.auth.login')}`,
    register:
      getNavigationValue('antd-table-v2.auth.register') &&
      `${baseUrl}${getNavigationValue('antd-table-v2.auth.register')}`,
  },
  api: {
    main: getConfigValue('antd-table-v2.api'),
  },
};
