import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product])
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !=productId))
  };
  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}