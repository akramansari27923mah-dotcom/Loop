import DashboardPage from '@/components/dashboard/Dashboard'
import { authIsRequired } from '@/lib/auth-utils'
import { getUser } from '@/lib/get-session'
import React from 'react'

const DashBoard = async() => {
    
    const session = await getUser()
    await authIsRequired()
  return (
    <div>
        <DashboardPage session={session} />
    </div>
  )
}

export default DashBoard