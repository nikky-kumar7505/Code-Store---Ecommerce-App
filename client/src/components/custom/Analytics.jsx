import React from 'react'
import axios from 'axios'
import { SidebarInset } from '../ui/sidebar'
import { Activity, CreditCard, DollarSign, User } from 'lucide-react'
import {Chart1} from './Chart1'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useState } from 'react'
import useErrorLogout from '@/hooks/use-error-logout'
import { useEffect } from 'react'

const Analytics = () => {
  const [metrics, setMetrics] = useState([])
  const {handleErrorLogout} = useErrorLogout()

  useEffect(() => {
    
    const getMetrics = async () =>{
      try {

        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/get-metrics",
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const {data} = await res.data;
        setMetrics(data);
        
      } catch (error) {
        return handleErrorLogout(error)
      }
    }

    getMetrics();
    
  }, []);


  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden">
      <SidebarInset className="min-w-0">
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-3 sm:p-4 lg:p-6">
            <div className="grid auto-rows-min grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className='text-md font-semibold' >Total Sales</h3>
                  <DollarSign size={16}/>
                </div>
                <div className="grid mt-2">
                  <span className='text-2xl font-bold' >
                    ₹{metrics?.totaSales?.count}
                    </span>
                  <span className='text-xs font-semibold text-gray-400'>
                    + {metrics?.totaSales?.growth} from last month
                    </span>
                </div>
              </div>

              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className='text-md font-semibold' >Users</h3>
                  <User size={16}/>
                </div>
                <div className="grid mt-2">
                  <span className='text-2xl font-bold' >
                    +{metrics?.users?.count}
                  </span>
                  <span className='text-xs font-semibold text-gray-400'>
                    + {metrics?.users?.growth}% from last month
                    </span>
                </div>
              </div>

              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className='text-md font-semibold' >Sales</h3>
                  <CreditCard size={16}/>
                </div>
                <div className="grid mt-2">
                  <span className='text-2xl font-bold' >
                    ₹{metrics?.sales?.count}
                  </span>
                  <span className='text-xs font-semibold text-gray-400'>
                  + {metrics?.sales?.growth}% from last month
                  </span>
                </div>
              </div>

              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className='text-md font-semibold' >Active Now</h3>
                  <Activity size={16}/>
                </div>
                <div className="grid mt-2">
                  <span className='text-2xl font-bold' >{metrics?.aciveNow?.count}</span>
                  <span className='text-xs font-semibold text-gray-400'>
                    + {metrics?.aciveNow?.growth}% from last month
                    </span>
                </div>
              </div>

            </div>

            <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-stretch">
              <div className="min-w-0 flex-1">
                <Chart1 />
              </div>
              <div className="w-full min-w-0 shrink-0 rounded-lg bg-muted/50 p-4 sm:p-5 lg:max-w-md xl:max-w-lg">
                <h3 className="text-lg font-bold sm:text-xl">Recent sales</h3>
                <p className="my-4 text-sm sm:my-6">You make 40 sales this month</p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  {
                    metrics?.recentSales?.users?.map((user) => (
                    <div
                      key={user?._id}
                      className="flex w-full min-w-0 flex-col gap-2 rounded-lg border border-border/60 bg-background/50 py-2 pl-2 pr-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
                        <Avatar className="size-9 shrink-0 sm:size-10">
                          <AvatarImage src="https://github.com/shadcn.png" alt="" />
                          <AvatarFallback>
                            {user?.userId?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold capitalize sm:text-base">
                            {user?.userId?.name}
                          </h3>
                          <p className="truncate text-xs text-gray-400 sm:text-sm">
                            {user?.userId?.email}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 self-end font-bold tabular-nums sm:self-center sm:pl-2">
                        ₹{user?.amount}
                      </span>
                    </div>
                    ) )
                  }
                </div>
              </div>
            </div>
        </div>
      </SidebarInset>
    </div>
  )

}

export default Analytics