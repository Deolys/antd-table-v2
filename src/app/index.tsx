import React, { type JSX, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';
import { StoreProvider } from './providers/store-provider';
import './styles/global.css';

export default (): JSX.Element => (
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
);

let rootElement: ReactDOM.Root;

export const mount = (Сomponent, element = document.getElementById('app')): void => {
  const rootElement = ReactDOM.createRoot(element);
  rootElement.render(<Сomponent />);

  if (module.hot) {
    module.hot.accept('./app', () => {
      rootElement.render(<Сomponent />);
    });
  }
};

export const unmount = (): void => {
  rootElement.unmount();
};
