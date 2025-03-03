import React from 'react'
import Navbar from '../components/custom/Navbar'
import Footer from '../components/custom/Footer'

const RootLayout = ({childern}) => {
  return (
    <>
        <Navbar/>
        {childern}
        <Footer/>

    </>
  )
}

export default RootLayout