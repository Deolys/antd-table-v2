import { Button, DatePicker, Flex, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React, { type JSX } from 'react';

import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks';
import { DEFAULT_FILTER_OBJECT } from '@/shared/consts';

import { useFilterForm } from '../lib/hooks';

const { RangePicker } = DatePicker;

function FiltersForm(): JSX.Element {
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
      <Form.Item label="Имя пользователя:" name="name">
        <Input allowClear placeholder="Введите имя пользователя" />
      </Form.Item>
      <Form.Item label="Тип пользователя:" name="type_id">
        <Select
          allowClear
          showSearch
          placeholder="Выберите тип пользователя"
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
            <span>Дата с:</span>
            <span>Дата по:</span>
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
        Поиск
      </Button>
      <Button
        type="link"
        onClick={() => {
          form.setFieldsValue(DEFAULT_FILTER_OBJECT);
        }}
      >
        Сбросить фильтры
      </Button>
    </Form>
  );
}

export default FiltersForm;
