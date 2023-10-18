import React from 'react';
import './App.css'; // Import your CSS file if needed
import 'cesium/Build/Cesium/Widgets/widgets.css'; // Import CesiumJS styles
import 'cesium/Build/Cesium/Cesium'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CesiumMap from './components/HomePage'; // Import your CesiumMap component
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'
import { CartProvider, useCartContext } from './utils/cartContext';
const stripePromise = loadStripe('pk_test_51O1KL4FFJxtNyW2YftNdlflwv8IG0jwBZbwNktFOyyrrJLJqT8v5YdMAjxgdspjGnAsgmaUzaDDlAmJqttpny40V00CxAiamYl');

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache()
})

// const stuff = [{
//     key: 25544,
//     name: "ZARYA",
//     noradId: 25544,
//     comment: "Bullocks",
//     price: 1000
// }]

function App() {
  
  
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <div className="App">
          <div className="cesium-map">
            <CesiumMap/>
            <Cart/>
            {/* <Elements stripe={stripePromise}>
              <CheckoutForm/>
            </Elements> */}
          </div>
        </div>
      </CartProvider>
    </ApolloProvider>
  );
}

export default App;