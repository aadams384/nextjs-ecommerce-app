import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../../utils/Store';

export default function Product({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const handleAddToCart = () => {
    const itemExists = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <div className="card border-black shadow-lg">
      <Link legacyBehavior href={`/product/${product.slug}`}>
        <a>
          <img src={product.image} alt={product.name} className="shadow-md" />
        </a>
      </Link>
      <div className="flex flex-col items-left justify-center p-5 bottom-card">
        <Link legacyBehavior href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-xs">{product.name}</h2>
          </a>
        </Link>
        <p className="text-sm font-bold">${product.price}</p>
        <div>
          <button
            type="button"
            className="primary-button w-full"
            onClick={handleAddToCart}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
