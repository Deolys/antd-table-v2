import dayjs from 'dayjs';

export const FILTER_START_DATE = '2021-01-01';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_FILTER_OBJECT = {
  email: '',
  name: '',
  type_id: null,
  project: '',
  dateRange: [dayjs(FILTER_START_DATE), dayjs()],
};
