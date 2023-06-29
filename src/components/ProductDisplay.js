import React from 'react';
import Product from './Product';
import data from '../../utils/data';

export default function ProductDisplay() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <Product key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}


