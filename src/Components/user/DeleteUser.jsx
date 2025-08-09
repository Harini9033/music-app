import { deleteUser } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { deleteDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { __DB } from '../../backend/FirebaseConfig'

const DeleteUser = () => {
    let {authUser}=useContext(AuthContextAPI)
    let navigate=useNavigate()
    let [text,setText]=useState("")
    let handleChange=(e)=>{
        setText(e.target.value)
    }
    let handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            if(text.toLowerCase().trim()==="delete account"){
                let user_collection=doc(__DB,"user_profile",authUser?.uid)
               await deleteUser(authUser)
               await deleteDoc(user_collection)
                toast.success("Account Deleted")
                navigate("/auth/register")
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }
  return (
    
      <section className='h-[100%] w-[100%] flex items-center justify-center '>
      <article className='min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4 ' >
            <h2 className='text-center text-2xl'>Delete Account</h2>
            <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
                <div>
                    <h3>Are you a sure you want to delete the account?</h3> 
                    <h3>If yes Enter Delete Account !</h3>
                </div>
                <input type="text" placeholder='Delete Account' className='outline-none bg-white py-2 px-4 rounded-lg text-black 'onChange={handleChange}name='text' value={text}/>
                <button className='bg-red-800 py-2 px-4 w-[100%] cursor-pointer hover:bg-red-600 rounded-lg font-semibold text-lg '>Delete Account</button>
            </form>
        </article>
      </section>
    
  )
}

export default DeleteUser
