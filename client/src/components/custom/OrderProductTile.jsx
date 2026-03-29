import React from 'react'

const OrderProductTile = ({ quantity, quanity, id, color }) => {
  const qty = quantity ?? quanity
  const imgUrl = id?.images?.[0]?.url
  return (
    <div className='flex justify-between items-start sm:items-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-900'>
        <div className="flex flex-row items-center gap-2">
            {imgUrl ? (
            <img src={imgUrl} alt={id?.name || ""} className='h-20 w-20 object-cover sm:h-24 sm:w-24 rounded-lg' />
            ) : (
            <div className="h-20 w-20 shrink-0 rounded-lg bg-muted sm:h-24 sm:w-24" aria-hidden />
            )}
            <div className="grid sm:gap-1">
                <h1 className='font-semibold text-sm  sm:text-base'>{id?.name}</h1>
                <p className='flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGrey text-xs sm:text-sm my-0' >
                    <span className='font-semibold'>
                        color : {" "}
                        <span style={{backgroundColor : color}}>{color}</span>
                    </span>
                    <span className='hidden sm:block'> | </span>

                    <span className='font-semibold'>
                        Qty : <span className='font-medium text-customYellow' >{qty}</span>
                    </span>
                    <span className='hidden sm:block'> | </span>

                    <span className='font-semibold'>
                        Price : <span className='font-medium text-customYellow' >₹{id?.price}</span>
                    </span>
                    <span className='hidden sm:block'> | </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default OrderProductTile