'use client';
import Wrapper from 'src/components/Wrapper';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import data from '../../../utils/data';
import '../../app/globals.css';
import capitalizeFirstLetter from '../../../utils/capitalize';
import { Store } from '../../../utils/Store';

export default function ProductPage() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return (
      <Wrapper title="404">
        <div className="center text-3xl">
          ʕ ° ᴥ °💧ʔ THAT PRODUCT DOESN'T EXIST!
        </div>
      </Wrapper>
    );
  }

  const handleAddToCart = () => {
    const itemExists = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Wrapper title={capitalizeFirstLetter(product.name)}>
      <div className="grid md:grid-cols-4 grid-rows-1 gap-10">
        <div className="col-span-2">
          <img
            src={`../` + product.image}
            alt={product.name}
            className="shadow-md"
            layout="responsive"
          />
        </div>
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <h2 className="text-2xl font-light">${product.price}</h2>
          <div className="py-8 flex justify-between">
          </div>
          <div>
            <button
              type="button"
              className="primary-button w-full"
              onClick={handleAddToCart}
            >
              add to cart
            </button>
          </div>
          <div className="text-xs">
            {product.description.split('\n').map((item, i) => (
              <p key={i}>
                <br />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
