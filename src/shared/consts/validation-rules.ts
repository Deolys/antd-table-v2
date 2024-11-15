export const atLeastEightCharactersRegExp = /.{8,}/;
export const uppercaseLetterRegExp = /\p{Lu}/u;
export const lowercaseLetterRegExp = /\p{Ll}/u;
export const digitRegExp = /\d/;
export const specialCharacterRegExp = /[^\p{L}\p{N}\s]/u;

export const strengthRules = [
  { regex: atLeastEightCharactersRegExp, points: 20 },
  { regex: uppercaseLetterRegExp, points: 20 },
  { regex: lowercaseLetterRegExp, points: 20 },
  { regex: specialCharacterRegExp, points: 20 },
  { regex: digitRegExp, points: 20 },
];

export const signUpPasswordRules = [
  {
    pattern: atLeastEightCharactersRegExp,
    message: 'form.validation.passwordLength',
  },
  {
    pattern: uppercaseLetterRegExp,
    message: 'form.validation.passwordUppercase',
  },
  {
    pattern: lowercaseLetterRegExp,
    message: 'form.validation.passwordLowercase',
  },
  {
    pattern: digitRegExp,
    message: 'form.validation.passwordDigit',
  },
  {
    pattern: specialCharacterRegExp,
    message: 'form.validation.passwordSpecialCharacter',
  },
];
