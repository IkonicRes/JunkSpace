import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // add product to cart
  };

  const removeFromCart = (productId) => {
    // remove product from cart
  };

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}