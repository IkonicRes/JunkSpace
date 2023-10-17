// Cart.js

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const Cart = ({ cartItems }) => {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total on mount/update  
    let newTotal = 0;
    cartItems.forEach(item => {
      newTotal += item.price; 
    });

    setTotal(newTotal);
  }, [cartItems]);

  return (
    <div className="cartOverlay">
      {cartItems.map((item, index) => {
        <ProductCard  
        key={index}
        name={item.name}
        noradID={item.noradId}
        comment={item.comment}
        price={item.price}
      /> 

      }
    )}

      <p>Total: ${total}</p>
      <button>Checkout</button>
    </div>
  )
}

export default Cart
