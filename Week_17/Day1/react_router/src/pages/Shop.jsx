import React from "react"
import { Link, useSearchParams } from "react-router-dom";

const products = [
  { id: 123, name: 'iPhone', price: 999 },
  { id: 234, name: 'iPad', price: 888 },
  { id: 333, name: 'Samsung Galaxy A35', price: 350 },
]
export default function Shop() {
  const [query] = useSearchParams()
  console.log(query);
  
  console.log(query.get('name'), query.get('price'));

  return (
    <>
      <h2>Shop Page</h2>
      {products && products.map(item => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.price}</p>
            <Link to={`/product/${item.id}`}>Buy now</Link>
          </div>
        )
      })}
    </>
  )
}
