import ReviewsComponent from '@/components/custom/ReviewsComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Color } from '@/constants/color'
import { starsGenerator } from '@/constants/helper'
import useRazorpay from '@/hooks/use-razorpay'
import { addToCart } from '@/redux/slices/cartSlice'
import axios from 'axios'
import { Circle, Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const productStoke = 5;


const Product = () => {

    const {productName}  = useParams();  
    //alert(productName)
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state) =>state.auth )
    const dispatch = useDispatch()
    const {verifyPayment, generatePayment} = useRazorpay();


    const [productQuantity, setProductQuantity] = useState(2)  
    const [pincode, setPincode] = useState('')
    const [availblityMessage , setAvailblityMessage ] = useState("")
    const [purchaseProduct , setPurchaseProduct ] = useState(false)
    const [address , setAddress ] = useState("")
    const [product, setProduct] = useState({})
    const [selectedImage, setSelectedImage] = useState(0)
    const [productColor, setProductColor] = useState("")

    useEffect( ()=>{
        const fetchProductByName = async () =>{
            try {
                const nameFromPath = productName?.split("-").join(" ")?.trim()
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/get-product-by-name/${encodeURIComponent(nameFromPath)}`
                )
                const { data } = res.data
                setProduct(data)
            } catch (error) {
                setProduct({})
            }
        }
        if (productName) fetchProductByName();
    }, [productName] )

    const calculateEmi = (price) => Math.round(price / 6)

    const checkAvailablity = async () =>{
        const code = pincode.trim()
        if(code === ""){
            setAvailblityMessage("Please enter a valid pincode")
            return
        }
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-picode/${encodeURIComponent(code)}`
            )
            setAvailblityMessage(res.data?.message ?? "")
        } catch (error) {
            const msg =
                error.response?.data?.message ||
                "Unable to check pincode. Please try again."
            setAvailblityMessage(msg)
        }
    };

    const handleAddToCart = () =>{
        if(!isAuthenticated){
            navigate("/login");
            return ;
        }
        if(productColor == ""){
            toast.error("Please select a color")
            return;
        }

        dispatch(
            addToCart({
                _id : product._id,
                name : product.name,
                price : product.price,
                quantity : productQuantity,
                image : product.images[0].url,
                color : productColor,
                stock : product.stock,
                blacklisted : product.blacklisted
            })
        );

        toast("Product added to cart")
        
    }


    const handleBuyNow = async() => {
            if(!isAuthenticated) {
                navigate("/login")
                return;
            }
            if(productQuantity>product.stock){
                toast("Product out of stock")
                return;
            }
            if(product.blacklisted){
                toast("Product isn't avilavble for purchase")
                return;
            }
            if(productColor  == ""){
                toast("Please select a color")
                return;
            }
    
            const order = await generatePayment(product.price * productQuantity)
            if (!order?.id) return
            verifyPayment(
                order,
                [{id :product._id, quantity : productQuantity, color : productColor}],
                address
            );
            setPurchaseProduct(false);
    
        };


    

  return (
    <>
        <div>
            <main className='w-full flex flex-col sm:flex-row justify-start items-stretch sm:items-start gap-6 sm:gap-8 lg:gap-10 py-4 sm:py-8'>
                
                {/* left side */}
                <div className="grid w-full sm:w-1/2 gap-3 shrink-0">
                    <img 
                    src={product?.images?.[selectedImage]?.url} 
                    className='w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none ' 
                    alt={product?.name || ""}
                    />          

                    <div className="grid grid-cols-4 gap-3">
                        {
                            product?.images?.map(({url, id}, index)=> (
                                <img 
                                src={url} 
                                key={id ?? index} 
                                onClick={ ()=> setSelectedImage(index)  }
                                className='rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none ' 
                                alt=""
                                />
                        ) )}
                    </div>

                </div>
                


                {/* right side */}
                <div className="w-full sm:w-1/2 lg:w-[42%] min-w-0">
                        <div className="pb-5">
                            <h2 className='font-extrabold text-2xl' >{product?.name}</h2>
                            <p className='text-sm my-2' > {product.description} </p>
                            <div className="flex items-center ">
                                { starsGenerator(product.rating, "0", 15)}
                                <span className='text-md ml-1' >({product?.reviews?.length})</span>
                            </div>
                        </div>

                        <div className='py-5 border-t border-b '>
                            <h3 className="font-bold text-xl">Rs.{product.price} or Rs.{calculateEmi(product.price)}/month</h3>
                            <p className='text-sm'>suggested payment with 6 months financing </p>
                        </div>

                        <div className="py-5 border-b">
                            <h3 className='font-bold text-lg'>Choose color</h3>
                            <div className="flex items-center my-2">
                                {
                                    product?.colors?.map((color, index)  => (
                                        // <Circle 
                                        // key={index + color}
                                        // fill={color} 
                                        // strokeOpacity={0.2} 
                                        // strokeWidth={0.2}  
                                        // size={40} 
                                        // onClick={()=> setProductColor(color)}
                                        // className='cursor-pointer filter hover:brightness-50'
                                        // />


                                        <Circle 
                                        key={index + color}
                                        fill={color} 
                                        stroke={productColor === color ? "white" : "transparent"} // Highlight selected color
                                        strokeWidth={productColor === color ? 2 : 0.2}  
                                        size={40} 
                                        onClick={() => setProductColor(color)}
                                        className={`cursor-pointer filter hover:brightness-50 transition-all duration-200 ${
                                            productColor === color ? "ring-2 ring-black" : ""
                                        }`}
                                        />
                                    ))
                                }
                                    
                            </div>
                        </div>

                        <div className="py-5">
                            <div className="flex gap-3 items-center">
                                <div className="flex items-center gap-5 bg-gray-100 rounded-full px-3 py-2 w-fit">
                                    <Minus stroke={Color.customGrey}
                                        onClick={()=>{setProductQuantity((qty)=> qty>1 ? qty-1 : 1)} } cursor={"pointer"}
                                    />
                                    <span className='text-slate-950' > {productQuantity} </span>
                                    <Plus stroke={Color.customGrey}  cursor={"pointer"} onClick={()=>{ setProductQuantity((qty)=> qty < productStoke ? qty +1 : qty ) } }/>
                                </div>


                                {product.stock - productQuantity > 0 && (
                                    <div className='grid text-sm font-semibold text-gray-600'>
                                        <span className='text-customYellow'>
                                            only {" "}
                                            <span > {product.stock - productQuantity} items </span>
                                            left!
                                        </span>
                                        <span>Don't miss it</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="grid gap-3 my-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                                <Input className="min-w-0 flex-1" placeholder="Enter Your Pincode here" onChange={ (e)=> setPincode(e.target.value) } />
                                <Button className="shrink-0" onClick={checkAvailablity} > Check Availablity </Button>
                            </div>
                                <p className='text-sm px-2'>{availblityMessage}</p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Button className="w-full sm:w-auto" onClick={ ()=> setPurchaseProduct(true) } >Buy Now</Button>
                                <Button className="w-full sm:w-auto" variant="outline" onClick={handleAddToCart} >Add to Cart</Button>
                            </div>

                            {
                                purchaseProduct && ( <div className='my-2 space-y-2 '>
                                    <Input placeholder="Enter Your Address Here...." onChange={(e)=> setAddress(e.target.value)} />
                                    <Button onClick ={handleBuyNow} >Confirm Order</Button>
                                </div>
                            )}

                        </div> 

                </div>
            </main>

            {/*review section */}
            <ReviewsComponent productId={product._id} />

        </div>
    </>
  )
}

export default Product;