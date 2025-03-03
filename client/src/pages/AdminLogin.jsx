import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '@/redux/slices/authSlice';



const AdminLogin =  () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e) =>{
    e.preventDefault()

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if(!username || !password){
      toast.error("Please fill username and password");
      return;
    }

    try {

      const res = await axios.post("http://localhost:5000/api/admin-login",{username, password});
      const data = await res.data;
      dispatch(setUserLogin(data));
      toast(data.message)
      navigate("/admin/dashboard")

    } catch (error) {
       toast.error(error?.response?.data?.message || "Some error occurred, please try again");
    }
  }

  return (
    <div className='w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3'>
        <h1 className='text-2xl font-bold'>Admin Login</h1>
        <form className='grid gap-3' onSubmit={handleLogin}>
          <Input placeholder="Username Here..." type="text" name="username" />
          <Input placeholder="Password Here..." type="password" name="password" />
          <Button>Log In</Button>
 
        </form>
      </div>
  )
}

export default AdminLogin