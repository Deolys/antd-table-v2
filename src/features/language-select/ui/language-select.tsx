import { Select } from 'antd';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

export function LanguageSelect(): JSX.Element {
  const { i18n } = useTranslation();

  const handleChange = (value: string): void => {
    i18n.changeLanguage(value);
  };

  return (
    <Select defaultValue={i18n.language} onChange={handleChange} style={{ width: 78 }}>
      <Option value="ru">RU</Option>
      <Option value="en">EN</Option>
    </Select>
  );
}
