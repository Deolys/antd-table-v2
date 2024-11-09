import { getConfigValue, getNavigationValue } from '@brojs/cli';
import { generatePath } from 'react-router-dom';

const baseUrl = getNavigationValue('antd-table-v2.main');

export const URLs = {
  baseUrl,
  ui: {
    userId: {
      url: `${baseUrl}${getNavigationValue('antd-table-v2.user.id')}`,
      on: Boolean(getNavigationValue('antd-table-v2.user.id')),
      getUrl: (userId: string) =>
        generatePath(`${baseUrl}${getNavigationValue('antd-table-v2.user.id')}`, { userId }),
    },
  },
  api: {
    main: getConfigValue('antd-table-v2.api'),
  },
};
