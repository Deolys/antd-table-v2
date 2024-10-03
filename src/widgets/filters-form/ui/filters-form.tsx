import { Button, DatePicker, Flex, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks';
import { DEFAULT_FILTER_OBJECT } from '@/shared/consts';

import { useFilterForm } from '../lib/hooks';

const { RangePicker } = DatePicker;

function FiltersForm(): JSX.Element {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { options } = useUserTypeSelect();
  const { filters, onFinish } = useFilterForm();

  return (
    <Form
      form={form}
      style={{ padding: 20 }}
      onFinish={onFinish}
      initialValues={{
        ...filters,
        dateRange: [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])],
      }}
      layout="vertical"
    >
      <Form.Item label={t('form.label.userName')} name="name">
        <Input allowClear placeholder={t('form.placeholder.userName')} />
      </Form.Item>
      <Form.Item label={t('form.label.type')} name="type_id">
        <Select
          allowClear
          showSearch
          placeholder={t('form.placeholder.type')}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={options}
        />
      </Form.Item>
      <Form.Item
        label={
          <Flex gap={96}>
            <span>{t('form.label.dateFrom')}:</span>
            <span>{t('form.label.dateTo')}:</span>
          </Flex>
        }
        name={'dateRange'}
      >
        <RangePicker
          allowClear={false}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        {t('form.button.search')}
      </Button>
      <Button
        type="link"
        onClick={() => {
          form.setFieldsValue(DEFAULT_FILTER_OBJECT);
        }}
      >
        {t('form.button.resetFilters')}
      </Button>
    </Form>
  );
}

export default FiltersForm;
