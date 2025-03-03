import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

const HeaderDisplay = () => {
    const imageData = [
        "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/109371/pexels-photo-109371.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/5208871/pexels-photo-5208871.jpeg?auto=compress&cs=tinysrgb&w=600",

    ]
  return (

<Carousel className="my-10 mx-auto w-[93vw] overflow-x-clip sm: overflow-visible">
  <CarouselContent>
    {
        imageData.map((image)=>(
             <CarouselItem key={image} >
                <img src={image}  loading="lazy"  className='object-cover w-full h-[60vh] rounded-3xl'/>
            </CarouselItem>   
        ))
    }
  
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

  )
}

export default HeaderDisplay