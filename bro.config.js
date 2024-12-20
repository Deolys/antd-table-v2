const pkg = require('./package');
const path = require('node:path');

module.exports = {
  apiPath: 'stubs/api',
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    'antd.main': '/antd',
    'antd.table': '/table',
    'antd.user.id': '/table/user/:id',
    'antd.auth.login': '/auth/login',
    'antd.auth.register': '/auth/register',
  },
  features: {
    'antd': {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    'antd-table-v2.api': 'https://antd-table-v2-backend.onrender.com/api',
  },
};
