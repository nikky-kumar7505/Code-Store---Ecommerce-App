import FilterManu from '@/components/custom/FilterManu'
import HeaderDisplay from '@/components/custom/HeaderDisplay'
import ProductList from '@/components/custom/ProductList'
import React from 'react'

const Home = () => {
  return (
    <div>
        <HeaderDisplay/>
        <FilterManu/>
        <ProductList/>
    </div>
  )
}

export default Home