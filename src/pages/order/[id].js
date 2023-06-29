// order/:id
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import Wrapper from '@/components/Wrapper';
import axios from 'axios';
import getError from '../../../utils/error';
import Image from 'next/image';
import Link from 'next/link';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    default:
      state;
  }
}

function OrderPage() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
    });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );

        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('your order has been paid for and is confirmed.');
      } catch (err) {
        paypalDispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }

  return (
    <Wrapper title={`order # ${orderId}`}>
      <h1 className="mb-4 text-xl font-bold text-center">{`order #${orderId}`}</h1>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
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
            </div>
            <div className="card p-5">
              <h2 className="text-2xl font-semibold">payment method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">paid {paidAt}</div>
              ) : (
                <div className="alert-error">not paid</div>
              )}
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
                  {orderItems.map((item) => (
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
              <div className="p-3 flex justify-end text-2xl font-bold">
                Subtotal({orderItems.reduce((a, x) => a + x.quantity, 0)}) : ${' '}
                {orderItems.reduce((a, x) => a + x.quantity * x.price, 0)}
              </div>
              {!isPaid && isPending ? (
                <div>loading...</div>
              ) : (
                <div className="p-3 flex justify-end text-2xl font-bold">
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
              {loadingPay && <div>loading...</div>}
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

OrderPage.auth = true;
export default OrderPage;
