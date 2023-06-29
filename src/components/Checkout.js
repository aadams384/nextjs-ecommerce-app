import React from 'react';

export default function Checkout({ currentStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${
              index <= currentStep
                ? 'border-purple-500 text-purple-500'
                : 'border-gray-400 text-gray-400'
            }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
