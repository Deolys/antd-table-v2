import { Flex, Skeleton } from 'antd';
import React, { type JSX } from 'react';

export function UserFormSkeleton(): JSX.Element {
  return (
    <Flex
      gap={50}
      vertical
      justify="center"
      align="end"
      style={{ height: '90vh', maxWidth: '460px', margin: '0 auto' }}
    >
      <Skeleton.Input active block />
      <Skeleton.Input active block />
      <Skeleton.Input active block />
      <Skeleton.Input active block />
      <Skeleton.Button active />
    </Flex>
  );
}
