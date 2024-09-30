import { Button, DatePicker, Flex, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React, { type JSX } from 'react';

import { FILTER_START_DATE } from '@/features/user-filter/consts/initial-filters';
import { setUserFilter, userFilter } from '@/features/user-filter/model/user-filter-slce';
import { useUserTypeSelect } from '@/features/user-type-select/lib/hooks/use-user-type-select';
import { userTypesLoading } from '@/features/user-type-select/model/user-types-slice';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';
import { UsersFilters } from '@/shared/types/user';

const { RangePicker } = DatePicker;

export function FiltersForm(): JSX.Element {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(userTypesLoading);
  const filters = useAppSelector(userFilter);
  const { options } = useUserTypeSelect();

  const onFinish = (values: UsersFilters): void => {
    const convertedValues = {
      ...values,
      dateRange: [values.dateRange[0].toString(), values.dateRange[1].toString()],
    };
    dispatch(setUserFilter(convertedValues));
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
      <Button type="primary" block loading={loading} htmlType="submit">
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
