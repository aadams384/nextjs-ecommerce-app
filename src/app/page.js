'use client';
import React from 'react';
import Wrapper from '../components/Wrapper';
import { StoreProvider } from '../../utils/Store';
import { SessionProvider } from 'next-auth/react';
import ProductDisplay from '@/components/ProductDisplay';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function Home() {
  return (
    <SessionProvider>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <Wrapper title="homepage">
            <ProductDisplay />
          </Wrapper>
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
