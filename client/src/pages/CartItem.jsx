// src/pages/CartPage.js
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cart items from the local JSON file
    const fetchCartItems = async () => {
      try {
        const response = await fetch('./gameData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCartItems(data.cartItems || []); // Adjust based on the structure of your JSON
      } catch (err) {
        setError('Failed to load cart items');
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <main>
      <div className="cart-page">
        <h2>Shopping Cart</h2>
        {error && <div className="error">{error}</div>}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.id} item={item} onRemove={handleRemove} />
          ))
        )}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Total</h3>
            <p>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
            <button>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
