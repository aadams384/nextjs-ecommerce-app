'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { StoreProvider } from '../../utils/Store';
import '../app/globals.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  return children;
}

export default App;
