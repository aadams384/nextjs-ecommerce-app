import React from 'react';
import { StoreProvider } from '../../utils/Store';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
