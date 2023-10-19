import React, { useState } from 'react';
import './App.css'; // Import your CSS file if needed
import 'cesium/Build/Cesium/Widgets/widgets.css'; // Import CesiumJS styles
import 'cesium/Build/Cesium/Cesium'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


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
  const [seen, setSeen] = useState(false)

    function togglePop () {
        setSeen(!seen);
    }

  return (
    <ApolloProvider client={client}>
      {Auth.loggedIn() ? <div className="App">
        <CesiumMap/>
        <Elements stripe={stripePromise}>
          {/* <CheckoutForm/> */}
          <div>
            <button onClick={togglePop}>Login</button>
            {seen ? <Login toggle={togglePop} /> : <SignUp/>}
        </div>
        </Elements>
      </div> :
      <div className="App">
        <Login/>
        <CesiumMap/>
        {/* <Elements stripe={stripePromise}> */}
          {/* <CheckoutForm/> */}
          <div>
            <button onClick={togglePop}>Login</button>
            {seen ? <Login toggle={togglePop} /> : <SignUp/>}
        </div>
        {/* </Elements> */}
      </div>  }
    </ApolloProvider>
  );
}

export default App;