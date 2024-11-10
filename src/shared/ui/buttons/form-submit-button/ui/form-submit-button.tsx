import type { FormInstance } from 'antd';
import { Button, Form } from 'antd';
import React, { type FC, type PropsWithChildren, useEffect, useState } from 'react';

interface FormSubmitButtonProps {
  form: FormInstance;
}

export const FormSubmitButton: FC<PropsWithChildren<FormSubmitButtonProps>> = ({
  form,
  children,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};
