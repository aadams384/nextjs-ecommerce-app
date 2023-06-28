import React from 'react';
import Wrapper from '../components/Wrapper';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
  };

  return (
    <Wrapper title="login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-bold">login</h1>
        <div className="mb-4">
          <label htmlFor="email">email</label>
          <input
            type="email"
            {...register('email', {
              required: 'this field is required!',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'invalid email address!',
              },
            })}
            id="email"
            placeholder="email"
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">password</label>
          <input
            type="password"
            {...register('password', {
              required: 'this field is required!',
              minLength: {
                value: 6,
                message: 'password must be at least 6 characters long!',
              },
            })}
            id="password"
            placeholder="password"
            className="w-full"
            autoFocus
          />
          {errors.password && (
            <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">login</button>
        </div>
        <div>
          still need an account?{' '}
          <Link legacyBehavior href="/register">
            <a className="text-blue-500">register</a>
          </Link>
        </div>
      </form>
    </Wrapper>
  );
}
