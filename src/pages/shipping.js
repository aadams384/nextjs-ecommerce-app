import React, { useContext, useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import Checkout from '../components/Checkout';
import { useForm } from 'react-hook-form';
import { Store } from '../../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ShippingPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue('name', shippingAddress.name);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('state', shippingAddress.state);
    setValue('zip', shippingAddress.zip);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ name, address, city, state, zip }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { name, address, city, state, zip },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: { name, address, city, state, zip },
      })
    );
    router.push('/payment');
  };

  return (
    <Wrapper title="Checkout">
      <Checkout currentStep={0} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-bold text-center">shipping address</h1>
        <div className="mb-4">
          <label htmlFor="name">name</label>
          <input
            className="w-full"
            id="name"
            autoFocus
            {...register('name', { required: 'name is required!' })}
          />
          {errors.name && (
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="name">address</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register('address', { required: 'address is required!' })}
          />
          {errors.address && (
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.address.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="name">city</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('city', { required: 'city is required!' })}
          />
          {errors.city && (
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.city.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="name">state</label>
          <input
            className="w-full"
            id="state"
            autoFocus
            {...register('state', { required: 'state is required!' })}
          />
          {errors.state && (
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.state.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="name">zip</label>
          <input
            className="w-full"
            id="zip"
            autoFocus
            {...register('zip', {
              required: 'zip is required!',
              minLength: 5,
              message: 'zip must be at least 5 characters long!',
            })}
          />
          {errors.zip && (
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.zip.message}
            </p>
          )}
        </div>
        <div className="mb-4 flex justify-end">
          <button className="primary-button">continue</button>
        </div>
      </form>
    </Wrapper>
  );
}

ShippingPage.auth = true;
