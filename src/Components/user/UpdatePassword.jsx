import { reauthenticateWithCredential, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { AuthContextAPI } from '../../context/AuthContext';
import { EmailAuthProvider } from 'firebase/auth/web-extension';
import { __AUTH } from '../../backend/FirebaseConfig';

const UpdatePassword = () => {


  let[email,setEmail]=useState("")
  let[isLoading,setisLoading]=useState(false)
  let handleChange=(e)=>{
      setEmail(e.target.value)
  }
  let handleSubmit= async(e)=>{
      e.preventDefault()
      try{
          await sendPasswordResetEmail(__AUTH,email)
          toast.success("Update link sent to mail")
      }catch(error){
          toast.error(error.message)
      }
}
  return (

  <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex items-center justify-center'>
    <div className=' w-[30%] bg-slate-700 p-4 rounded-xl '> 
      <header>
        <h1 className='text-3xl text-center'>Update Password</h1>
      </header>
      <main className='p-2'>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className='block text-medium'>Email</label>
            <input type="email"  placeholder="Enter email" id='email' className='outline-none border-1 w-[100%] my-1 rounded-[5px] pl-2' onChange={handleChange} name='email' value={email}/>
            </div>
            <div>
            <button className='py-1 px-3 bg-blue-600 rounded-[5px] w-[100%] mt-2 cursor-pointer hover:bg-blue-800'>Update</button>
          </div>
        </form>
      </main>
    </div>
   </section>
  
  )
}

export default UpdatePassword