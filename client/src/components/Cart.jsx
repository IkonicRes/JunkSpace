// Cart.js

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useCartContext } from '../utils/cartContext';
const Cart = () => {

  const [total, setTotal] = useState(0);
  const stuff = useCartContext()
  useEffect(() => {
    // Calculate total on mount/update  
    let newTotal = 0;
    stuff.cart.forEach(product => {
      newTotal += product.price; 
    });

    setTotal(newTotal);
  }, [stuff.cart]);

  return (
    <div className="cartOverlay">
      {stuff.cart.map((product, index) => {
        <ProductCard  
        key={index}
        name={product?.OBJECT_NAME}
        noradID={product?.NORAD_CAT_ID}
        comment={product?.COMMENT}
        price={product?.price}
        // >{product?.price}
      /> 

      }
    )}

      <p>Total: ${total}</p>
      <button>Checkout</button>
    </div>
  )
}

export default Cart
