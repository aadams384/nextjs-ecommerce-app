'use client';

import React from 'react';
import Wrapper from '../components/Wrapper';
import data from '../../utils/data';
import Product from '../components/Product';
import { StoreProvider } from '../../utils/Store';
import { SessionProvider } from 'next-auth/react';

export default function Home() {
  return (
    <SessionProvider>
      <StoreProvider>
        <Wrapper title="homepage">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.products.map((product) => (
              <Product key={product.slug} product={product} />
            ))}
          </div>
        </Wrapper>
      </StoreProvider>
    </SessionProvider>
  );
}
