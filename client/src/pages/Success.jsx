import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  const [count, setCount] = React.useState(5)
  
  useEffect(() => {
    const interval = setInterval(()=>{
      setCount((prev)=> prev -1)
    },1000)

    return ()=> clearInterval(interval)
  },[])

  setTimeout(()=>{
      window.location.href = "/"
  }, 6000)

  return (
    <div className='flex gap-1 flex-col justify-center items-center w-screen h-screen '>
        <h1 className='text-3xl sm:text-4xl font-bold '>Payment Successfull</h1>
        <Link to={"/"} className='text-xs sm:text-base'>Go to Home (Redirecting you in {count } secounds )</Link>
    </div>
  )
}

export default Success