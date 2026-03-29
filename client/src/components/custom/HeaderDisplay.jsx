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
    <section
      className="relative my-6 sm:my-10 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-x-clip sm:overflow-visible"
      aria-label="Featured images"
    >
      <Carousel className="relative w-full">
        <CarouselContent>
          {imageData.map((image) => (
            <CarouselItem key={image}>
              <img
                src={image}
                loading="lazy"
                alt=""
                className="object-cover w-full h-[50vh] sm:h-[60vh] rounded-2xl sm:rounded-3xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="z-10 left-3 sm:left-5 md:left-10 lg:left-12 top-1/2 -translate-y-1/2 border bg-background/90 shadow-md hover:bg-background"
        />
        <CarouselNext
          className="z-10 right-3 sm:right-5 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 border bg-background/90 shadow-md hover:bg-background"
        />
      </Carousel>
    </section>

  )
}

export default HeaderDisplay