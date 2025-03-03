import React from 'react'
import CheckoutProduct from '../components/custom/CheckoutProduct'
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import useErrorLogout from '@/hooks/use-error-logout';
import useRazorpay from '@/hooks/use-razorpay';
import { emptyCart } from '@/redux/slices/cartSlice';
import OrderData from '@/components/custom/OrderData';

const Checkout = () => {

  const [address, setAddress] = useState("")
  const {cartItems, totalQuantity, totalPrice} = useSelector(
    (state) => state.cart
  )
  const {user} = useSelector((state) => state.auth) 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {handleErrorLogout} = useErrorLogout();
  const {generatePayment, verifyPayment}  = useRazorpay();

  const handleCheckout = async () => {
    if(address.trim() ==="" ){
      return toast("Please enter your address");
      return;
    }

    const productArray = cartItems.map((item) =>{
      return {
        id : item._id,
        quantity : item.quantity,
        color : item.color
      };
    });

    
    try {
      const options = await generatePayment(totalPrice);
      const success = verifyPayment(options, productArray, address)
      dispatch(emptyCart());
    } catch (error) {
      return handleErrorLogout(error);
    }

  };

 


  

  return (
    <div className='mx-auto w-[90vw] sm:w-[60vw] flex justify-between items-center sm:my-20 '>
        <div className="flex flex-col sm:flex-row gap-5 mx-auto my-10">
            {/* Product details */}
            <div className="space-y-8">
                  <div className="p-4 space-y-4">
                    <h2 className='text-xl font-medium'>Order Summary</h2>
                    <div className="space-y-1 text-3xl">
                      {
                        cartItems.length === 0 ? (
                          <h2>Nothing to show, Please add some products</h2> 
                        ) : (
                          cartItems.map((item)  => (
                            <CheckoutProduct key={item?._id} {...item} />
                          ))
                        )
                      }
                      
                   
                    </div>
                    <hr />
                    <div className="p-3 rounded-md">
                      <p className="flex justify-between items-center">
                        <span className='font-semibold text-customGrey'>Subtotal : </span>
                        <span className=' font-bold'> ₹{totalPrice} </span>
                      </p>
                      <p className="flex justify-between items-center">
                        <span className='font-semibold text-customGrey'>Tax : </span>
                        <span className=' font-bold'> ₹0 </span>
                      </p>
                      <p className="flex justify-between items-center">
                        <span className='font-semibold text-customGrey'>Shipping : </span>
                        <span className=' font-bold'> ₹0 </span>
                      </p>
                    </div>
                    <hr />
                    <p className="flex justify-between items-center px-3">
                        <span className='font-bold'>Total : </span>
                        <span className=' font-bold'> ₹{totalPrice} </span>
                      </p>
                  </div>
            </div>


            {/* Personal Deatails */}
            <div className="w-[90vw] sm:w-[20vw] ">
              <Card className="p-4 shadow-md  space-y-4">
                <h2 className='text-xl font-medium'>Billing Information</h2>
                <div className="space-y-2 ">
                <Label htmlFor="name" > Full Name</Label>
                <Input id="name" placeholder="John doe" className="w-full" value={user?.name} />
                <Label htmlFor="email" >Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="w-full" value={user?.email} />
                <Label htmlFor="address" >Shipping Address</Label>
                <Textarea rows="7" id="address" placeholder="123, Main st. city, State" className="w-full" onChange={(e) =>setAddress(e.target.value)} />
                </div>
                <Button onClick={handleCheckout} className="w-full" >Place Order</Button>
              </Card>
            </div>
            

        </div>
    </div>
  );
};

export default Checkout