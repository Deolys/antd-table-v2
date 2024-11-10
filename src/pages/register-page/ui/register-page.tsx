import React, { type JSX } from 'react';

import { RegisterForm } from '@/features/auth';
import { AuthPageLayout } from '@/shared/ui';

export function RegisterPage(): JSX.Element {
  return (
    <AuthPageLayout>
      <RegisterForm />
    </AuthPageLayout>
  );
}
