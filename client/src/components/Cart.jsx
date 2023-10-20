
import { useContext, useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import { useLazyQuery } from '@apollo/client';
import { CartContext } from '../utils/cartContext';
import { QUERY_CHECKOUT } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51O1KL4FFJxtNyW2YftNdlflwv8IG0jwBZbwNktFOyyrrJLJqT8v5YdMAjxgdspjGnAsgmaUzaDDlAmJqttpny40V00CxAiamYl');
const Cart = () => {

  const [total, setTotal] = useState(0);
  const [cart] = useContext(CartContext);
  
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  useEffect(() => {
    cart.forEach(product => {
      setTotal(total + product.PRICE)
    });
  }, [cart])

  useEffect(() => {

    const initializeStripe = async () => {
      const stripe = await stripePromise;
      if(data) {
        await stripe.redirectToCheckout({sessionId: data.checkout.session});
      }
    }
  
    initializeStripe();
  
  }, [data])

  
  function submitCheckout() {
    const products = cart.map(item => ({
      _id: item._id,
      purchaseQuantity: 1,
      name: item.OBJECT_NAME,
      price: item.PRICE, // set price 
      quantity: 1 
    }));
    getCheckout({
      variables: {
        products 
      }
    });
  
  }

  console.log("cart: ", cart)
  return (
    <div className="cartOverlay">
      <ul>
        {cart.map((product, index) => {
          
        return <ProductCard  
            key={index}
            name={product.OBJECT_NAME}
            noradID={product?.NORAD_CAT_ID}
            comment={product?.COMMENT}
            price={product?.PRICE}
            /> 
        }
        )}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={submitCheckout}>Checkout</button>
    </div>
  )
}

export default Cart