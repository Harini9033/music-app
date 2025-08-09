import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../helpers/Spinner';
import {__AUTH} from '../backend/FirebaseConfig';
import toast from 'react-hot-toast';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContextAPI } from '../context/AuthContext';

const Login = () => {

  let [data,setData]=useState({
    email:"",
    password:""
  })
  let {email,password}=data;
 let {setAuthUser} = useContext(AuthContextAPI)

let navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      setIsLoading(true)
let obj=await signInWithEmailAndPassword(__AUTH,email,password)
let{user}=obj;
// console.log(obj)
console.log(user)
if(user.emailVerified===true){
  toast.success("Login Successfully")
  setAuthUser(user)
  navigate("/")
}else{
  toast.error("Verify your email")
  sendEmailVerification(user)
 
}
    }
    
    catch(error){
        toast.error(error.message)

    }finally{
      setIsLoading(false)
    }
  }
  let handleChange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setData({...data,[key]:value})
  }

  let [togglePassword,setTogglePassword]=useState(false)
let[isLoading,setIsLoading]=useState(false)

  return (
    
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


              <div className='relative'>

              <label htmlFor="password" className='block text-md'>Password</label>

              <input type={togglePassword?"text":"password"} id="password" placeholder="Enter password" onChange={handleChange} value={password}  name="password" className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' />
              
              {togglePassword?(<FaEye className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setTogglePassword(!togglePassword)}} />):(<FaEyeSlash className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setTogglePassword(!togglePassword)}}/>)}

              </div>


              <div>
                <button className='bg-red-900 py-2 mt-2 w-[100%] rounded-lg font-semibold hover:bg-red-600 cursor-pointer '>Login</button>
              </div>

              <div className='mt-2 text-center'>
                <p>Don't have an account ?
                <NavLink to="/auth/register" className="text-red-500"> Register</NavLink>
                </p>
                </div>
                <div className='mt-2 text-center'>
                  <NavLink to="/auth/forget-password">Forget Password</NavLink>
                </div>
            </form>
          </main>
        </div>
        {isLoading && <Spinner/>}
    </section>
   
  )
}

export default Login
