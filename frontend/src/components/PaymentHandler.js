import React from 'react';
import { useMercuryo } from '../hooks/useMercuryo';

const PaymentHandler = () => {
  const { initializeMercuryo } = useMercuryo();

  const handlePayment = () => {
    initializeMercuryo({
      widgetId: 'your_widget_id',
      currency: 'USD',
      amount: 100,
      onSuccess: (transaction) => {
        console.log('Payment successful:', transaction);
        // Handle successful payment
      },
      onError: (error) => {
        console.error('Payment error:', error);
        // Handle payment error
      },
    });
  };

  return (
    <div>
      <h2>Payment</h2>
      <button onClick={handlePayment}>Pay with Mercuryo</button>
    </div>
  );
};

export default PaymentHandler;