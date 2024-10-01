import { useEffect } from 'react';

import { useGetUserTypesQuery } from '@/shared/api/users-api';
import { showErrorMessage } from '@/shared/lib/utils/messages';

interface HookReturn {
  options: {
    label: string;
    value: number;
    display: string;
  }[];
}

export function useUserTypeSelect(): HookReturn {
  const { data: userTypes, error } = useGetUserTypesQuery();

  useEffect(() => {
    if (error) {
      showErrorMessage('Не удалось получить типы пользователей');
    }
  }, [error]);

  const options = userTypes
    ? userTypes.map((userType) => ({
        label: userType.name,
        value: userType.id,
        display: userType.name,
      }))
    : [];

  return {
    options,
  };
}
