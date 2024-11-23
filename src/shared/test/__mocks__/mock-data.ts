export const mockUsers = Array.from({ length: 21 }, (_, index) => ({
  _id: `${index + 1}`,
  name: `User ${index + 1}`,
  email: `User${index + 1}@mail.ru`,
  password: `User${index + 1}Pass`,
  type_id: index + 1,
  last_visit_date: '2021-01-15T00:00:00',
}));

export const mockOptions = [
  { label: 'Admin', value: 'admin', display: 'Admin' },
  { label: 'User', value: 'User', display: 'User' },
];

export const breakpoints = [
  {
    name: 'Все true',
    values: {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true,
    },
  },
  {
    name: 'Все false',
    values: {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      xxl: false,
    },
  },
];

export const userMock = {
  _id: '1',
  email: '1@mail.ru',
  name: 'one',
  type_id: 1,
  last_visit_date: '2021-01-15T00:00:00',
};
