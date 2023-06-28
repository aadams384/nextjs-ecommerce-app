'use client';
import React from 'react';
import { StoreProvider } from '../../utils/Store';
import '../app/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
