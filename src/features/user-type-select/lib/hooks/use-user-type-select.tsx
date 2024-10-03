import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetUserTypesQuery } from '@/entities/user';
import { showErrorMessage } from '@/shared/lib/utils';

interface HookReturn {
  options: {
    label: string;
    value: number;
    display: string;
  }[];
}

export function useUserTypeSelect(): HookReturn {
  const { t } = useTranslation();
  const { data: userTypes, error } = useGetUserTypesQuery();

  useEffect(() => {
    if (error) {
      showErrorMessage(t('messages.error.userTypes'));
    }
  }, [error, t]);

  const options = userTypes
    ? userTypes.map((userType) => ({
        label: t(`user.type.${userType.id}`),
        value: userType.id,
        display: t(`user.type.${userType.id}`),
      }))
    : [];

  return {
    options,
  };
}
