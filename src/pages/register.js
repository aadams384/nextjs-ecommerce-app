import React, { useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log(result);
      if (result?.error) {
        toast.error(getError(result.error));
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Wrapper title="register">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-bold">sign up</h1>

        <div className="mb-4">
          <label htmlFor="name">name</label>
          <input
            type="name"
            {...register('name', {
              required: 'this field is required!',
            })}
            id="name"
            placeholder="name"
            className="w-full"
            autoFocus
          />
          {errors.name && (
            <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.name.message}
            </div>
          )}
        </div>

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
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'this field is required!',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'password must be at least 6 characters long!',
              },
            })}
            id="confirmPassword"
            placeholder="confirm password"
            className="w-full"
          />
          {errors.confirmPassword && (
            <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                passwords do not match!
              </div>
            )}
        </div>
        <div className="mb-4">
          <button className="primary-button">sign up</button>
        </div>
      </form>
    </Wrapper>
  );
}
