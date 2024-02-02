import { UserMenuSidebar } from '@/components/layout/UserSidebar/UserMenuSidebar'
import React, { ReactNode } from 'react'

interface UserLayoutProps {
    children:ReactNode
}

export default function UserLayout ({children}:UserLayoutProps)  {

  return (
    <>
    <div className='mx-2 my-1 '>
        <h2 className='text-secondary text-center'>User Settings</h2>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-10 col-lg-2 mt-5">
                <UserMenuSidebar/>
            </div>
            <div className="col-12 col-lg-8">
                {children}
            </div>
        </div>
    </div>
    </>

  )
}
