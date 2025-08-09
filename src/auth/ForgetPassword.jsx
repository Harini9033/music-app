import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { __AUTH } from '../backend/FirebaseConfig';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    let[isLoading,setIsLoading]=useState(false)
    let navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            await sendPasswordResetEmail(__AUTH,email)
            toast.success("Reset link to sent to mail ")
            navigate("/auth/login")
        }
        catch(error){
            toast.success(error.message)
        }
    }
    let [email,setEmail]=useState("")
    const handleChange=(e)=>{
        setEmail(e.target.value)
    }
  return (
    <div>
      <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex items-center justify-center'>
              <div className='w-[30%] bg-slate-700 p-4 rounded-lg'>
                <header>
                  <h1 className='text-center text-3xl'>Login</h1>
                </header>
                <main className='py-2'>
                  <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="email" className='block text-md'>Email</label>
                    <input type="email" id="email" placeholder="Enter email"  onChange={handleChange} value={email}  name= "email"className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2'/>
                    </div>
      
      
      
                    <div>
                      <button className='bg-blue-700 py-2 mt-2 w-[100%] rounded-lg font-semibold hover:bg-blue-400 cursor-pointer '>Reset Password</button>
                    </div>
                    <div className='mt-2 text-center'>
                                    
                                    <NavLink to="/auth/login" className="block w-[100%] bg-red-500 py-2 rounded-lg font-semibold hover:bg-red-700"> Cancel</NavLink>
                                    
                                    </div>
                  </form>
                </main>
              </div>
              {isLoading && <Spinner/>}
          </section>
    </div>
  )
}

export default ForgetPassword
