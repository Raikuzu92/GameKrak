import  { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import CheckoutForm from './Checkout'; // Import the form component
import { QUERY_ORDER_DETAILS } from '../utils/queries'; 

// const stripePromise = loadStripe('pk_test_51Pw54m04EmYQV5PkYD09fxeU3N2zdihXkN34k9Z7jWBSrQhCslpt97NdtmfZxCEl1o2aPxqbC9X14cp6QPIzFEmc00lCXsfxYq'); // Replace with your Stripe publishable key


const Checkout = () => {
  const { loading, data } = useQuery(QUERY_ORDER_DETAILS); // Fetch order details
  const orderDetails = data?.order || {}; // Access order details from the query
  const [error, setError] = useState(null);

  // Create a function to handle the payment submission
  const handlePayment = async (amount) => {
    try {
      const response = await axios.post('http://localhost:4242/create-payment-intent', { amount });
      return response.data.clientSecret;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className='flex-row justify-center'>
        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <h2>Checkout</h2>
          {error && <div className='error'>{error}</div>}
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePayment={handlePayment} amount={orderDetails.totalAmount} />
          </Elements>
        </div>
        <div className='col-12 col-md-8 mb-3'>
          <h3>Order Details</h3>
          <p>Order ID: {orderDetails.id}</p>
          <p>Total Amount: ${orderDetails.totalAmount / 100}</p>
          {/* Add more details as necessary */}
        </div>
      </div>
    </main>
  );
};

export default Checkout;
