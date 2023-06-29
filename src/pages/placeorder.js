import Checkout from '@/components/Checkout';
import Wrapper from '@/components/Wrapper';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../../utils/Store';
import getError from '../../utils/error';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function PlaceOrder() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const totalPrice = round2(itemsPrice);

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        totalPrice,
      });
      dispatch({ type: 'CART_CLEAR' });
      Cookies.set('cart', JSON.stringify({ ...cart, cartItems: [] }));
      router.push(`/order/${data._id}`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Wrapper title="Place Order">
      <Checkout currentStep={2} />
      <h1 className="mb-4 text-xl font-bold text-center">place order</h1>
      {cartItems.length === 0 ? (
        <div>
          <div className="grid place-items-center"> your cart is empty.</div>
          <Link className="flex justify-center w-full" href="/">
            <button className="grid place-items-center align-center primary-button text-2xl w-1/4">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              take me back!
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:-cols-4 md: gap-5">
          <div className="col-span-3 overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="text-2xl font-semibold">shipping info</h2>
              <div>
                {shippingAddress.name}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.state},{' '}
                {shippingAddress.zip}{' '}
              </div>
              <div>
                <Link href="/shipping">
                  <button className="primary-button">edit</button>
                </Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-2xl font-semibold">payment method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">
                  <button className="primary-button">edit</button>
                </Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-2xl font-semibold">items</h2>
              <table className="min-w-full">
                <thead className="border-b min-w-full">
                  <tr className=" w-full justify-between">
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-left">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._slug} className="w-min-screen">
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
                            <div className="hidden md:flex">{item.name}</div>
                          </a>
                        </Link>
                      </td>
                      <td className="text-right">
                        <select disabled value={item.quantity}>
                          {[...Array(999).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 text-right">
                        ${item.price * item.quantity}
                      </td>
                      <td className="p-5 text-center"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">
                  <button className="primary-button">edit</button>
                </Link>
              </div>
              <div className="p-3 flex justify-end text-2xl font-bold">
                Subtotal({cartItems.reduce((a, x) => a + x.quantity, 0)}) : ${' '}
                {cartItems.reduce((a, x) => a + x.quantity * x.price, 0)}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center pb-6">
        <button className="primary-button w-1/2" onClick={placeOrderHandler}>
          place order
        </button>
      </div>
    </Wrapper>
  );
}

PlaceOrder.auth = true;
