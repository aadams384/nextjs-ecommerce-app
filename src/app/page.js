import React from 'react';
import Wrapper from '../components/Wrapper';
import data from './utils/data';
import Product from '@/components/Product';

export default function Home() {
  return (
    <Wrapper title="homepage">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <Product key={product.slug} product={product}/>
        ))}
      </div>
    </Wrapper>
  );
}
