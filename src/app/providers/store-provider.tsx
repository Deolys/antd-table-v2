import React, { type PropsWithChildren, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

export function StoreProvider({ children }: PropsWithChildren): ReactNode {
  return <Provider store={store}>{children}</Provider>;
}
