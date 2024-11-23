import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import type { UsersFilters } from '@/entities/user';
import { DATE_FORMAT, DEFAULT_FILTER_OBJECT } from '@/shared/consts';

interface FilterFormHook {
  filters: UsersFilters;
  onFinish: (values: UsersFilters) => void;
}

export function useFilterForm(): FilterFormHook {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    email: searchParams.get('email') || DEFAULT_FILTER_OBJECT.email,
    name: searchParams.get('name') || DEFAULT_FILTER_OBJECT.name,
    type_id: +searchParams.get('type_id') || DEFAULT_FILTER_OBJECT.type_id,
    project: searchParams.get('project') || DEFAULT_FILTER_OBJECT.project,
    dateRange: searchParams.get('dateRange')?.split(',') || DEFAULT_FILTER_OBJECT.dateRange,
  };

  const onFinish = (values: UsersFilters): void => {
    const convertedValues = {
      page: 1,
      ...values,
      dateRange: [
        dayjs(values.dateRange[0]).format(DATE_FORMAT),
        dayjs(values.dateRange[1]).format(DATE_FORMAT),
      ],
    };

    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(convertedValues).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value.toString());
      } else {
        newSearchParams.delete(key);
      }
    });

    setSearchParams(newSearchParams);
  };

  return {
    filters,
    onFinish,
  };
}
