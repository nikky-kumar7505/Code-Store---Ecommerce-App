import React from 'react'
import { Link } from 'react-router-dom' 
import {ModeToggle} from './ModeToggle';
import CartDrawer from './CartDrawer';
import { User } from 'lucide-react';
import LogoutToggle from './LogoutToggle';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const {isAuthenticated, user} = useSelector((state) => state.auth);
  return( 
    <nav className='flex items-center px-3 sm:px-6 lg:px-8 py-4 sm:py-5 border-b dark:bg-zinc-900 min-h-[3.5rem]'>
        <div className='flex flex-1 gap-2 items-center justify-start min-w-0'>
            <ModeToggle/>
            <CartDrawer/>

            {
                isAuthenticated ? (
                    <LogoutToggle user = {user} />
                ) : (
                    <Link to ="/login">
                       <User size={28} strokeWidth={1.3} className="text-gray-800  dark:text-white hover:scale-105 transition-all ease-in-out cursor-pointer"/>
                    </Link>
                    )
            }

        </div>
        <Link to={"/"} className='shrink-0 px-2 text-center text-lg sm:text-2xl font-bold whitespace-nowrap' >
            Codestore
        </Link>
        <div className="flex flex-1 justify-end min-w-0">
          <ul className='hidden sm:flex gap-4 text-base lg:text-xl'>
              <Link to="/" >About</Link>
              <Link to="/" >Faqs</Link>
          </ul>
        </div>
   </nav>
   );
};

export default Navbar