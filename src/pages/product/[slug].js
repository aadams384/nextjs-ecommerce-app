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
            <div>SIZE</div>
            <div className="flex justify-between">
              <ul className="flex">
                <li>
                  <input
                    id="size-xs"
                    type="radio"
                    name="size"
                    value="XS"
                    className="size-xs sr-only peer"
                  ></input>
                  <label
                    for="size-xs"
                    className="px-2 text-gray-400 hover:text-black pointer-cursor peer-checked:text-black"
                  >
                    XS
                  </label>
                </li>
                <li>
                  <input
                    id="size-S"
                    type="radio"
                    name="size"
                    value="S"
                    className="size-S sr-only peer"
                  ></input>
                  <label
                    for="size-S"
                    className="px-2 text-gray-400 hover:text-black pointer-cursor  peer-checked:text-black"
                  >
                    S
                  </label>
                </li>
                <li>
                  <input
                    id="size-M"
                    type="radio"
                    name="size"
                    value="M"
                    className="size-M sr-only peer"
                  ></input>
                  <label
                    for="size-M"
                    className="px-2 text-gray-400 hover:text-black pointer-cursor  peer-checked:text-black"
                  >
                    M
                  </label>
                </li>
                <li>
                  <input
                    id="size-L"
                    type="radio"
                    name="size"
                    value="L"
                    className=" size-L sr-only peer"
                  ></input>
                  <label
                    for="size-L"
                    className="px-2 text-gray-400 hover:text-black pointer-cursor peer-checked:text-black"
                  >
                    L
                  </label>
                </li>
                <li>
                  <input
                    id="size-XL"
                    type="radio"
                    name="size"
                    value="XL"
                    className="size-XL sr-only peer"
                  ></input>
                  <label
                    for="size-XL"
                    className="px-2 text-gray-400 hover:text-black pointer-cursor peer-checked:text-black"
                  >
                    XL
                  </label>
                </li>
              </ul>
            </div>
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
