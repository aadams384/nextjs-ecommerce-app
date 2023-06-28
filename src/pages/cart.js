'use client';

import React from 'react';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import Wrapper from '../components/Wrapper';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const handleRemoveItemFromCart = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <Wrapper title="Cart">
      <div className="flex flex-col">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">
              ʕ ° ᴥ °💧ʔ your cart is empty!
            </h2>
            <p className="text-lg">Add some items to see them here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b min-w-full">
                  <tr w-full>
                    <th className="px-5 text-left">Item</th>
                    <th className="px-5 text-right">Quantity</th>
                    <th className="px-5 text-right">Price</th>
                  </tr>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._slug} className="border-b">
                        <td>
                          <Link legacyBehavior href={`/product/${item.slug}`}>
                            <a className="flex items-center">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                              />
                              &nbsp;
                              {item.name}
                            </a>
                          </Link>
                        </td>
                        <td className="px-5 text-right">{item.quantity}</td>
                        <td className="px-5 text-right">
                          {item.price * item.quantity}
                        </td>
                        <td className="p-5 text-center">
                          <button
                            onClick={() => handleRemoveItemFromCart(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </thead>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3">
                    Subtotal({cartItems.reduce((a, x) => a + x.quantity, 0)}) :
                    $ {cartItems.reduce((a, x) => a + x.quantity * x.price, 0)}
                  </div>
                </li>
                <li>
                  <button
                    className="primary-button w-full"
                    onClick={() => router.push('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}