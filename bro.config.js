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
    'antd-table-v2.main': '/antd-table-v2',
    'antd-table-v2.user.id': '/user/:id',
    'antd-table-v2.auth.login': '/auth/login',
    'antd-table-v2.auth.register': '/auth/register',
  },
  features: {
    'antd-table-v2': {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    'antd-table-v2.api': 'https://antd-table-v2-backend.onrender.com/api',
  },
};
