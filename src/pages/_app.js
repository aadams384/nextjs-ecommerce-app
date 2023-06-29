'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { StoreProvider } from '../../utils/Store';
import '../app/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  );
}
