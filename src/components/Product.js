import React from 'react';
import Link from 'next/link';

export default function Product({ product }) {
  return (
    <div className="card border-black shadow-lg">
      <Link legacyBehavior href={`/product/${product.slug}`}>
        <a>
          <img src={product.image} alt={product.name} className="shadow-md" />
        </a>
      </Link>
      <div className="flex flex-col items-left justify-center p-5">
        <Link legacyBehavior href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-xs ">{product.name}</h2>
          </a>
        </Link>
        <p className="text-sm font-bold">${product.price}</p>
        <button type="button" className="primary-button">
          <p>Add to Cart</p>
        </button>
      </div>
    </div>
  );
}
