import { strengthRules } from '@/shared/consts';

export function calculatePasswordStrength(password: string): number {
  return password
    ? strengthRules.reduce(
        (total, rule) => (rule.regex.test(password) ? total + rule.points : total),
        0,
      )
    : 0;
}
