import { Flex, Skeleton } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { type JSX } from 'react';

export function UserFormSkeleton(): JSX.Element {
  const screen = useBreakpoint();

  return (
    <Flex
      gap={50}
      vertical
      justify="center"
      align="end"
      style={{ height: '640px', width: screen.sm ? 460 : 240, margin: '0 auto' }}
      data-testid="user-form-skeleton"
    >
      <Skeleton.Input active block />
      <Skeleton.Input active block />
      <Skeleton.Input active block />
      <Skeleton.Input active block />
      <Skeleton.Button active />
    </Flex>
  );
}
