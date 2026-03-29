import React from 'react'
import Navbar from '../components/custom/Navbar'
import Footer from '../components/custom/Footer'

const RootLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout