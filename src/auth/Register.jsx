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

  const [errors, setErrors] = React.useState({});

  let{username,email,password,confirmpassword}=data;


  let handleChange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setData({...data,[key]:value})
  }

let onRegisterClick = async(e) =>{
    e.preventDefault()
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form is valid, calling API with:', data);
      let obj=await createUserWithEmailAndPassword(__AUTH,email,password);
      let {user}=obj;
      console.log("user", user);
      sendEmailVerification(user);
      toast("Verification link sent")
      toast.success("User Registered")
      navigate("/auth/login");
    } else {
      // Errors found → don't call API
      console.log('Errors:', validationErrors);
    }
   
}

let validateForm = () =>{
  const newErrors = {};

    if (!data.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!data.confirmpassword.trim()) {
      newErrors.confirmpassword = "Confirm Password is required";
    }
    if (data.password && data.confirmpassword && data.password !== data.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    return newErrors;
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
            <form>
              <div>
              <label htmlFor="username" className='block text-md'>Username</label>
              <input type="text" id="username" placeholder="Enter username" onChange={handleChange} value={username} name="username"  className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2'/>
              {errors.username && <small style={{color: 'red'}}>{errors.username}</small>}
              </div>
              <div>
              <label htmlFor="email" className='block text-md'>Email</label>
              <input type="email" id="email" placeholder="Enter email"  onChange={handleChange} value={email}  name= "email" className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2'/>
              {errors.email && <small style={{color: 'red'}}>{errors.email}</small>}
              </div>
              <div className='relative'>
              <label htmlFor="password" className='block text-md'>Password</label>

              <input type={togglePassword?"text":"password"} id="password" placeholder="Enter password" onChange={handleChange} value={password}  name="password" className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' />
              
              {togglePassword?(<FaEye className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setTogglePassword(!togglePassword)}} />):(<FaEyeSlash className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setTogglePassword(!togglePassword)}}/>)}
              {errors.password && <small style={{color: 'red'}}>{errors.password}</small>}
              </div>


              <div className='relative'>

              <label htmlFor="confirmpassword" className='block text-md'>Confirm Password</label>

              <input type={confirmTogglePassword?"text":"password"} id="confirmpassword" placeholder="Confirm password" onChange={handleChange} value={confirmpassword} name="confirmpassword" className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' />

              {confirmTogglePassword?(<FaEye className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setConfirmTogglePassword(!confirmTogglePassword)}} />):(<FaEyeSlash className='absolute top-9 right-3 cursor-pointer' onClick={()=>{setConfirmTogglePassword(!confirmTogglePassword)}}/>)}
                {errors.confirmpassword && <small style={{color: 'red'}}>{errors.confirmpassword}</small>}
              </div>


              <div>
                <button className='bg-red-900 py-2 mt-2 w-[100%] rounded-lg font-semibold hover:bg-red-600 cursor-pointer ' onClick={(e) => onRegisterClick(e)}>Register</button>
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


