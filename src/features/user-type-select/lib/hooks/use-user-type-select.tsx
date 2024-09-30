import { useEffect } from 'react';

import { usersApi } from '@/shared/api/users-api';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';

import { userTypes } from '../../model/user-types-slice';

interface HookReturn {
  options: {
    label: string;
    value: number;
    display: string;
  }[];
}

export function useUserTypeSelect(): HookReturn {
  const dispatch = useAppDispatch();
  const userTypeList = useAppSelector(userTypes);

  const options = userTypeList.map((userType) => ({
    label: userType.name,
    value: userType.id,
    display: userType.name,
  }));

  useEffect(() => {
    dispatch(usersApi.fetchUserTypes());
  }, [dispatch]);

  return {
    options,
  };
}
