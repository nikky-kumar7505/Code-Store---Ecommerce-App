import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '../ui/input'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setProducts } from '@/redux/slices/productSlice'
  

  const categoryData = {
    trigger : "category",
    items : ["keyboard", "mouse", "headset"]
  }

  const priceData = { 
    trigger : "Price",
    items : [1000, 3000, 5000, 8000]
  }

const FilterManu = () => {

    /** "all" / "0" = no filter (matches server get-products behaviour) */
    const [category, setCategory] = useState("all")
    const [price, setPrice] = useState("0")
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()
    
    useEffect( ()=>{
      const getFilterProducts  = async ()=>{
        const res = await axios.get(import.meta.env.VITE_API_URL + `/get-products?category=${category}&price=${price}&search=${search}`);
        const data = await res.data;
        dispatch(setProducts(data.data))
      };

      getFilterProducts();
    },[category, price, search] )
    
   

  return (
    <div className='w-full min-w-0 max-w-full flex flex-col sm:flex-row justify-between items-center my-10 gap-3 sm:gap-0' >
        {/* dropdown filer*/}
        <div className='flex  w-full gap-3 '>
            {/* for category  */}
            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id={categoryData.trigger}>
                    <SelectValue placeholder={categoryData.trigger} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All categories</SelectItem>
                  { 
                   categoryData.items.map((item)=>(
                       <SelectItem key={item} value={item} className = "capitalize" > {item} </SelectItem>

                   ))
                  }
                </SelectContent>
            </Select>

            {/* price */}
            <Select value={price} onValueChange={setPrice}>
                <SelectTrigger id={priceData.trigger}>
                    <SelectValue placeholder={priceData.trigger} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Any price</SelectItem>
                  { 
                   priceData.items.map((item)=>(
                       <SelectItem key={item} value={String(item)} className = "capitalize" > Less than {item} </SelectItem>

                   ))
                  }
                </SelectContent>
            </Select>


            {/* search input */}
            <div className= "sm:w-[60%] w-full">
              <Input id="search" placeholder="Search Here..." value={search} onChange={(e)=> setSearch(e.target.value)} />
             
            </div>

        </div>
    </div>
  )
}
 
export default FilterManu