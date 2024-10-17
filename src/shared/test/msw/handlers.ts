import { HttpResponse, http } from 'msw';

import mockUserTypes from '../../../../stubs/mock-data/UserTypes.json';
import mockUsers from '../../../../stubs/mock-data/Users.json';

export const handlers = [
  http.get(/\/users$/, () => {
    return HttpResponse.json(mockUsers);
  }),
  http.get(/\/user-types$/, () => {
    return HttpResponse.json(mockUserTypes);
  }),
  http.get(/\/new-id$/, () => {
    return HttpResponse.json(mockUserTypes);
  }),
];
