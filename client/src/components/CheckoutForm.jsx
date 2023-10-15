import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useQuery } from '@apollo/client';
import { GET_PAYMENT_INTENT } from '../utils/queries'; // Define your GraphQL query

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { loading, error, data } = useQuery(GET_PAYMENT_INTENT, {
    variables: { amount: 1000, currency: 'usd' }, // Adjust the amount and currency as needed
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const clientSecret = data.getPaymentIntent.clientSecret;

  const handlePayment = async (e) => {
    e.preventDefault();

    // Confirm the payment using the clientSecret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Add billing details if needed (e.g., name, address)
        },
      },
    });

    if (result.error) {
      // Handle payment failure
      console.error(result.error.message);
      // You can display an error message to the user
    } else if (result.paymentIntent.status === 'succeeded') {
      // Payment succeeded
      console.log('Payment successful:', result.paymentIntent);
      // You can update your UI or perform other actions here
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

export default CheckoutForm;

