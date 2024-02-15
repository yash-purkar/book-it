import { AdminSidebar } from '@/components/layout/adminSidebar/AdminSidebar'
import React, { ReactNode } from 'react'

interface AdminLayoutProps {
    children:ReactNode
}

export default function AdminLayout ({children}:AdminLayoutProps)  {

  return (
    <>
    <div className='mx-2 my-1 '>
        <h2 className='text-secondary text-center'>Admin Dashboard</h2>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-10 col-lg-2 mt-5">
                <AdminSidebar/>
            </div>
            <div className="col-12 col-lg-8">
                {children}
            </div>
        </div>
    </div>
    </>

  )
}
