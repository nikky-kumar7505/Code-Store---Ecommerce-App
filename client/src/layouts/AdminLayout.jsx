import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '@/components/custom/AppSidebar'

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen min-w-0 flex-1 overflow-x-auto">
        <SidebarTrigger/>
        <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-10">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout