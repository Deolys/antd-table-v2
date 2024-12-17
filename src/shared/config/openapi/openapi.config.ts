import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:3000/api/docs.json',
  apiFile: '../../api/base-api.ts',
  apiImport: 'baseApi',
  outputFile: './usersApi.ts',
  exportName: 'usersApi',
  hooks: true,
};

export default config;
