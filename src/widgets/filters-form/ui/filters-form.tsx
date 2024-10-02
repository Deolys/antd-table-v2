import { Button, DatePicker, Flex, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React, { type JSX } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks';
import { DATE_FORMAT, FILTER_START_DATE } from '@/shared/consts';
import type { UsersFilters } from '@/shared/types';

const { RangePicker } = DatePicker;

function FiltersForm(): JSX.Element {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = {
    name: searchParams.get('name') || '',
    type_id: +searchParams.get('type_id') || null,
    dateRange: searchParams.get('dateRange')?.split(',') || [dayjs(FILTER_START_DATE), dayjs()],
  };

  const { options } = useUserTypeSelect();

  const onFinish = (values: UsersFilters): void => {
    const convertedValues = {
      ...values,
      dateRange: [
        dayjs(values.dateRange[0]).format(DATE_FORMAT),
        dayjs(values.dateRange[1]).format(DATE_FORMAT),
      ],
    };

    const newSearchParams = new URLSearchParams();
    Object.entries(convertedValues).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value.toString());
      }
    });

    setSearchParams(newSearchParams);
  };

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
          form.setFieldsValue({
            name: '',
            type_id: null,
            dateRange: [dayjs(FILTER_START_DATE), dayjs()],
          });
        }}
      >
        Сбросить фильтры
      </Button>
    </Form>
  );
}

export default FiltersForm;
