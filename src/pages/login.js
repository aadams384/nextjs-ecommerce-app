import React, { useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import getError from '../../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, redirect, session]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const repsonse = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (repsonse?.error) {
        toast.error(getError(repsonse.error));
      }
    } catch (error) {
      toast.error(getError(error));
    }
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
          <Link legacyBehavior href={`/register?redirect=${redirect || '/'}`}>
            <a className="text-purple-500">register</a>
          </Link>
        </div>
      </form>
    </Wrapper>
  );
}
