import { Progress } from 'antd';
import React, { type JSX } from 'react';

import { calculatePasswordStrength } from '@/shared/lib/utils';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps): JSX.Element {
  const strength = calculatePasswordStrength(password);

  return (
    <>
      <Progress
        percent={strength}
        style={{ paddingInline: 12 }}
        strokeColor={{ from: '#108ee9', to: '#87d068' }}
      />
    </>
  );
}

export default PasswordStrength;
