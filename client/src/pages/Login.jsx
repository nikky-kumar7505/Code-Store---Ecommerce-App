import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useDispatch } from 'react-redux'
import { setUserLogin } from '@/redux/slices/authSlice'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const {email, password} = e.target.elements;
    if( email.value.trim() =="" || password.value.trim() =="" ){
         toast.error("Please fill in all the fields");
         return;
       }

    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/login",{
        email : email.value,
        password : password.value
      })
      const data = await res.data;
      dispatch(setUserLogin(data))
      toast(data.message)
      navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some error occurred, please try again");
    }
  }
  
  return (
    <div className='w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3'>
        <h1 className='text-2xl font-bold'>Login into your account</h1>
        <form className='grid gap-3' onSubmit={handleSubmit}>
          
          <Input placeholder="Enter your Email" type="email" name="email" />
         
          <Input placeholder="Enter your Password" type="password" name="password" />
         
          <Button>Login</Button>
          <div className=" flex  gap-2 items-center">
              <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Don't have an account?
              </label>
              <Link to={"/signup"}>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                 Signup
              </label>
            </Link>
          </div>
        </form>
      </div>
  )
}

export default Login