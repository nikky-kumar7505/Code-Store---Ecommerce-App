import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '@/components/custom/AppSidebar'

const AdminLayout = ({childern}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger/>
        <div className="sm:m-10"> {childern}</div>
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout