import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import {UserContextAPI} from '../../context/UserContext'

const UserAccount = () => {
  let {authUser}=useContext(AuthContextAPI)
  let {userProfile}=useContext(UserContextAPI)
  
  return (
    <section className='h-[100%] w-[100%] flex items-center justify-center '>
      <article className='min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4 ' >
      <header className='h-[110px] w-[100%] bg-slate-700 rounded-t-xl flex flex-col items-center'>
        <img src={authUser?.photoURL} className='h-28 w-28 rounded-full -mt-16'/>
        <h2>{authUser?.displayName}</h2>
        <p>{authUser?.email}</p>
      </header>
      {userProfile ? <div className='mt-2'>
        <h2 className='text-xl text-indigo-300'>Personal Info</h2>
        <article className='flex flex-wrap gap-4 mt-2'>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-400 font-semibold'>Phone Number</h3>
            <p>{userProfile?.phoneNumber}</p>
          </div>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-400 font-semibold'>Date Of Birth</h3>
            <p>{userProfile?.dateOfBirth}</p>
          </div>
          <div className='w-[100%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-400 font-semibold'>Languages</h3>
            <p>{userProfile?.languages}</p>
          </div>
          <div className='w-[48%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-400 font-semibold'>Gender</h3>
            <p>{userProfile?.gender}</p>
          </div>
          <div className='w-[100%] bg-slate-700 py-2 px-4 rounded-lg'>
            <h3 className='text-indigo-400 font-semibold'>Address</h3>
            <p>{userProfile?.address}</p>
          </div>
        </article>
      </div>:<>
        <div className='h-[150px] w-[48%] flex items-center justify-center'>
          <h2 className='text-lg'>User Data Not Present
          <NavLink to="/user-profile/update-profile" className='py-2 bg-blue-600 flex px-4'>Add User Data</NavLink>
          </h2>
          
        </div></>}
      </article>
    </section>
  )
}

export default UserAccount
