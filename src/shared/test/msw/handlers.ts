import { HttpResponse, http } from 'msw';

import mockUsers from '../../../../stubs/mock-data/Users.json';

export const handlers = [
  http.get(/\/users$/, () => {
    return HttpResponse.json(mockUsers);
  }),
  http.get(/\/user-types$/, () => {
    return HttpResponse.json(mockUsers);
  }),
];
