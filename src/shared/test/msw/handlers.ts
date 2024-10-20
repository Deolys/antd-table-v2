import { HttpResponse, http } from 'msw';

import mockUserTypes from '../../../../stubs/mock-data/UserTypes.json';
import { mockUsers } from '../__mocks__/mock-data';

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

  http.get(/\/users\/\d+$/, ({ request }) => {
    const id = request.url.split('/').pop();
    const user = mockUsers.find((user) => user._id === id);
    return HttpResponse.json(user ? user : { status: 404 });
  }),

  http.post(/\/users$/, async ({ request }) => {
    const newUser = await request.json();
    mockUsers.push(JSON.parse(JSON.stringify(newUser)));
    return HttpResponse.json(newUser);
  }),

  http.put(/\/users\/\d+$/, async ({ request }) => {
    const id = request.url.split('/').pop();
    const updatedUser = await request.json();
    const index = mockUsers.findIndex((user) => user._id === id);
    if (index !== -1) {
      mockUsers[index] = JSON.parse(JSON.stringify(updatedUser));
      return HttpResponse.json(updatedUser);
    }
    return HttpResponse.json({ status: 404, error: 'error' });
  }),

  http.delete(/\/users$/, async ({ request }) => {
    const idsToDelete = await request.json();
    JSON.parse(JSON.stringify(idsToDelete)).forEach((id: number) => {
      const index = mockUsers.findIndex((user) => user._id === `${id}`);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
    });
    return HttpResponse.json(mockUsers);
  }),
];
