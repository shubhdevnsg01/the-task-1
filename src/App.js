import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
 
    const apiURL = "https://s3.amazonaws.com/open-to-cors/assignment.json";

    axios.get(apiURL)
      .then(response => {
       
        if (response.status !== 200) {
          throw new Error(`Failed to fetch data. Status code: ${response.status}`);
        }
        return response.data;
      })
      .then(data => {
      
        const productsArray = Object.values(data.products);

     
        const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);

      
        setProducts(sortedProducts);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []); 

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Subcategory</th>
            <th>Title</th>
            <th>Price</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.title}>
              <td>{product.subcategory}</td>
              <td>{product.title}</td>
             
              <td>{product.price}</td>
              <td>{product.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
