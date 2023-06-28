import React from 'react';
import Wrapper from '../components/Wrapper';
import '../app/globals.css';
import Link from 'next/link';

export default function errorPage() {
  return (
    <Wrapper title={'404'}>
      <div>
        <div className="text-3xl">ʕTᴥTʔっ💔</div>
        <div>that page doesn't exist!</div>
        <div>
          <Link href="/">
            <button className="grid place-items-center primary-button text-2xl w-full">
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
      </div>
    </Wrapper>
  );
}
