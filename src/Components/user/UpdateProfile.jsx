import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import {doc} from 'firebase/firestore'
import { __DB } from '../../backend/FirebaseConfig'
import { UserContextAPI } from '../../context/UserContext'
const UpdateProfile = () => {
  let{userProfile}=useContext(UserContextAPI)
  let {authUser}=useContext(AuthContextAPI)
let [data,setData]=useState({
  phoneNo:userProfile?.phoneNumber,
  dob:userProfile?.dateOfBirth,
  languages:userProfile?.languages,
  gender:userProfile?.gender,
  address:userProfile?.address
})

let{phoneNo,dob,languages,gender,address}=data

let handleChange=(e)=>{
let key=e.target.name
let value=e.target.value
setData({...data,[key]:value})
}
let handleSubmit=async(e)=>{
e.preventDefault()
let {displayName,email,photoURL,uid}=authUser
let payload={
  name:displayName,
  email:email,
  photo:photoURL,
  id:uid,
  phoneNumber:phoneNo,
  dateOfBirth:dob,
  gender:gender,
  languages:languages,
  address:address,
  role:"user"
}

try{
 
  let user_collection=doc(__DB,"user_profile",uid)
  await setDoc(user_collection,payload)
  toast.success("Details Added Successfully")
}catch(error){
toast.error(error.message)
}
console.log(payload)
}

  return (
    
      <section className='h-[100%] w-[100%] flex items-center justify-center '>
      <article className='min-h-[400px] w-[60%] bg-slate-900 rounded-xl p-4 ' >
        <h2 className='text-center text-2xl'>Upload Profile Data</h2>
        <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
          <article className='flex gap-2'>
          <div className='flex flex-col gap-2  w-[48%]'>
            <label htmlFor='phoneNo' className='block text-18px'>Phone Number</label>
            <input type="tel" id="phoneNo" placeholder='Enter your Phone Number' className='outline-none bg-white py-2 px-4 rounded-lg text-black 'onChange={handleChange} name="phoneNo" value={phoneNo}/>
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='dob' className='block text-18px'>Date Of Birth</label>
            <input type="date" id="dob" placeholder='Enter your Date Of Birth' className='outline-none bg-white py-2 px-4 rounded-lg text-black 'onChange={handleChange} name="dob" value={dob}/>
          </div>
          </article>
          <article className='flex gap-2'>
          <div className='flex flex-col gap-2  w-[48%]'>
            <label htmlFor='languages' className='block text-18px'>Languages</label>
            <input type="text" id="languages" placeholder='Enter Language' className='outline-none bg-white py-2 px-4 rounded-lg text-black 'onChange={handleChange} name="languages" value={languages}/>
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='dob' className='block text-18px'>Gender</label>
            <div className='flex gap-2 font-semibold text-lg'>
              <input type="radio" onChange={handleChange} name="gender" value="Male" checked={gender==='Male'}/><span>Male</span>
              <input type="radio" onChange={handleChange} name="gender" value="Female" checked={gender==='Female'}/><span>Female</span>
              <input type="radio" onChange={handleChange} name="gender" value="Others" checked={gender==='Others'}/><span>Others</span>
            </div>
            
          </div>
          </article>
          <article className='flex gap-2'>
          <div className='flex flex-col gap-2  w-[100%]'>
            <label htmlFor='address' className='block text-18px'>Address</label>
            <textarea id="address" placeholder="Enter you Address" className='outline-none bg-white py-2 px-4 rounded-lg text-black'onChange={handleChange} name="address" value={address}></textarea>
            </div>
          </article>
          <article>
              <button className='bg-blue-800 py-2 px-4 w-[100%] cursor-pointer hover:bg-blue-600 rounded-lg font-semibold text-lg '>Submit</button>
          </article>
        </form>
      </article>
      </section>
  )
}

export default UpdateProfile
