'use client';
import React from 'react';
import Wrapper from '../components/Wrapper';
import { StoreProvider } from '../../utils/Store';
import { SessionProvider } from 'next-auth/react';
import ProductDisplay from '@/components/ProductDisplay';

export default function Home() {
  return (
    <SessionProvider>
      <StoreProvider>
        <Wrapper title="homepage">
          <ProductDisplay />
        </Wrapper>
      </StoreProvider>
    </SessionProvider>
  );
}
