import React, { type JSX } from 'react';

import { LoginForm } from '@/features/auth';
import { AuthPageLayout } from '@/shared/ui';

export function LoginPage(): JSX.Element {
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  );
}
