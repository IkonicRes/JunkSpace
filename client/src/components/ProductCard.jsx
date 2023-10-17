import React from 'react'

const ProductCard = ({name, noradId, comment, price}) => {
    return (
      <div className="product-card">
        <h3>{name}</h3> 
        <p>Norad ID: {noradId}</p>
        <p>Comment: {comment}</p>
        <p>Price: ${price}</p>
      </div>
    );
  }
  

export default ProductCard
