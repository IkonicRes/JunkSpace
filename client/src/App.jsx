import React, { useState } from 'react';
import './App.css'; // Import your CSS file if needed
import 'cesium/Build/Cesium/Widgets/widgets.css'; // Import CesiumJS styles
import 'cesium/Build/Cesium/Cesium'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {CartContext} from './utils/cartContext';
import CesiumMap from './components/HomePage'; // Import your CesiumMap component
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Cart from './components/Cart'
// import CheckoutForm from './components/CheckoutForm'
const stripePromise = loadStripe('pk_test_51O1KL4FFJxtNyW2YftNdlflwv8IG0jwBZbwNktFOyyrrJLJqT8v5YdMAjxgdspjGnAsgmaUzaDDlAmJqttpny40V00CxAiamYl');
import Login from './components/Login'
import Auth from './utils/auth'
import SignUp from './components/SighUp'


const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache()
})

const stuff = [{
    key: 25544,
    name: "ZARYA",
    noradId: 25544,
    comment: "Bullocks",
    price: 1000
}]

function App() {
  const [cart, setCart] = useState([])
  const [seen, setSeen] = useState(false)
  const [showLogin, setShowLogin] = useState(true);
  const addToCart = (product) => {
    setCart(prev => [...prev, product]) // add product to cart
  }
  return (
    <div className="App">
      <CartContext.Provider value={[cart, setCart]}>
        <ApolloProvider client={client}>
          <div className="cesium-map">
            <CesiumMap addToCart={addToCart}/>
            <Cart/>
              {/* <Elements stripe={stripePromise}>
                <CheckoutForm/>
              </Elements> */}
            <div>
              {showLogin ? (
                  <Login setShowLogin={setShowLogin}/>
                ) : (
                  <SignUp setShowLogin={setShowLogin}/>  
                )}
            </div>
          </div>
        </ApolloProvider>
      </CartContext.Provider>
    </div>
  );
}

export default App;