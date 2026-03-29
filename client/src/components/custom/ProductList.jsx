import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const ProductList = () => {

  const {products} = useSelector((state) => state.product )

  return <div className='w-full min-w-0 max-w-full grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 my-10 justify-items-stretch'>
      {
        products?.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  
}

export default ProductList