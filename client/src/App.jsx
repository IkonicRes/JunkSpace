import React from 'react';
import './App.css'; // Import your CSS file if needed
import 'cesium/Build/Cesium/Widgets/widgets.css'; // Import CesiumJS styles
import 'cesium/Build/Cesium/Cesium'

import CesiumMap from './components/HomePage'; // Import your CesiumMap component
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CesiumMap />
      </div>
    </ApolloProvider>
  );
}

export default App;