import React from 'react';
import './App.css'; // Import your CSS file if needed
import 'cesium/Build/Cesium/Widgets/widgets.css'; // Import CesiumJS styles
import 'cesium/Build/Cesium/Cesium'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CesiumMap from './components/HomePage'; // Import your CesiumMap component
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'
const stripePromise = loadStripe('pk_test_51O1KL4FFJxtNyW2YftNdlflwv8IG0jwBZbwNktFOyyrrJLJqT8v5YdMAjxgdspjGnAsgmaUzaDDlAmJqttpny40V00CxAiamYl');

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CesiumMap/>
        <Elements stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      </div>
    </ApolloProvider>
  );
}

export default App;