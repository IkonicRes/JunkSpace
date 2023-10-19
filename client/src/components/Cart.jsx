// Cart.js

import { useContext, useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../utils/cartContext';


const Cart = () => {

  const [total, setTotal] = useState(0);
  const [cart] = useContext(CartContext);

  useEffect(() => {
    cart.forEach(product => {
      setTotal(total + product.PRICE)
    });
  }, [cart])
  console.log("cart: ", cart)
  return (
    <div className="cartOverlay">
      {cart.map((product, index) => {
        
        <ProductCard  
          key={index}
          name={product.OBJECT_NAME}
          noradID={product?.NORAD_CAT_ID}
          comment={product?.COMMENT}
          price={product?.PRICE}
          /> 
      }
      )}

      <p>Total: ${total}</p>
      <button>Checkout</button>
    </div>
  )
}

export default Cart
