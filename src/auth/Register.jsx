import React, { useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import {__AUTH} from '../backend/FirebaseConfig';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../helpers/Spinner';

const Register = () => {
  let navigate=useNavigate()
let[isLoading,setIsLoading]=useState(false)
  let[data,setData]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
  })

  let{username,email,password,confirmpassword}=data;

  let handleChange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setData({...data,[key]:value})
  }

  let handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      setIsLoading(true)
      if(password!==confirmpassword){
        toast.error("Confirm Password does not match")
        setData({...data,confirmpassword:""})
      }
      else{
         let obj=await createUserWithEmailAndPassword(__AUTH,email,password)
         let {user}=obj;
         console.log(user)
         await updateProfile(user,{
          displayName:username,
          photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSaWVN5ig-gqQzzBRyJDY6vBC_oDflVq-og&s"
         })
         sendEmailVerification(user)
      }
       
        toast("Verification link sent")
        toast.success("User Registered")
        navigate("/auth/login")
    }catch(error){
     
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
// toast.error(error.message.slice(22,error.message.length-2))
  let [togglePassword,setTogglePassword]=useState(false)
  let [confirmTogglePassword,setConfirmTogglePassword]=useState(false)
  return (
    <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex items-center justify-center'>
        <div className='w-[30%] bg-slate-700 p-4 rounded-lg'>
          <header>
            <h1 className='text-center text-3xl'>Register</h1>
          </header>
          <main className='py-2'>
            <form onSubmit={handleSubmit}>
              <div>
              <label htmlFor="username" className='block text-md'>Username</label>
              <input type="text" id="username" placeholder="Enter username" onChange={handleChange} value={username} name="username"  className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2'/>
              </div>
              <div>
              <label htmlFor="email" className='block text-md'>Email</label>
              <input type="email" id="email" placeholder="Enter email"  onChange={handleChange} value={email}  name= "email" className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2'/>
              </div>


              <div className='relative'>
              <label htmlFor="password" className='block text-md'>Password</label>

              <input type={togglePassword?"text":"password"} id="password" placeholder="Enter password" onChange={handleChange} value={password}  name="password" className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' />
              
              {togglePassword?(<FaEye className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setTogglePassword(!togglePassword)}} />):(<FaEyeSlash className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setTogglePassword(!togglePassword)}}/>)}

              </div>


              <div className='relative'>

              <label htmlFor="confirmpassword" className='block text-md'>Confirm Password</label>

              <input type={confirmTogglePassword?"text":"password"} id="confirmpassword" placeholder="Confirm password" onChange={handleChange} value={confirmpassword} name="confirmpassword" className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' />

              {confirmTogglePassword?(<FaEye className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setConfirmTogglePassword(!confirmTogglePassword)}} />):(<FaEyeSlash className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setConfirmTogglePassword(!confirmTogglePassword)}}/>)}
              </div>


              <div>
                <button className='bg-red-900 py-2 mt-2 w-[100%] rounded-lg font-semibold hover:bg-red-600 cursor-pointer '>Register</button>
              </div>
              <div className='mt-2 text-center'>
                <p>Already have an account ?
                <NavLink to="/auth/login" className="text-red-500"> Login</NavLink>
                </p>
                </div>
            </form>
          </main>
        </div>
        {isLoading && <Spinner/>}
    </section>
  )
}

export default Register


