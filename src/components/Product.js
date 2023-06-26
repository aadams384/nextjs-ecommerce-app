import React from 'react';

export default function Product({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow-md"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="text-sm">{product.price}</p>
        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Add to Cart
        </button>
      </div>
      Product
    </div>
  );
}
