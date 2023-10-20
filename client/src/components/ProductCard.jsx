import React from 'react'

const ProductCard = ({key, name, noradId, comment, price}) => {
    return (
      <li key={key} className="product-card">
        <h3>{name}</h3> 
        <p>Norad ID: {noradId}</p>
        <p>Comment: {comment}</p>
        <p>Price: ${price}</p>
      </li>
    );
  }
  

export default ProductCard
