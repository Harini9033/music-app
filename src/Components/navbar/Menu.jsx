import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContextAPI } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { __AUTH } from '../../backend/FirebaseConfig'
import Spinner from '../../helpers/Spinner'
import { UserContextAPI } from '../../context/UserContext'

const Menu = () => {
  let {authUser}=useContext(AuthContextAPI)
  let{userProfile,isLoading}=useContext(UserContextAPI)
  let navigate=useNavigate()
  const logout=async()=>{
    try{
      await signOut(__AUTH)
      toast.success("Logged Out")
      navigate("/auth/login")
    }catch(error){
      toast.error(error.message)
    }
  }
  return (
    
    <aside>
     <ul className='flex gap-3 font-semibold items-center'>
     {userProfile?.role==="admin"&& authUser && ( <li><NavLink to ="/admin" className={(obj)=>{
                let {isActive}=obj
                return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"}`
              }}>Admin</NavLink></li>)}
        <li><NavLink to="/" className={(obj)=>
          { 
            let{isActive}=obj;
            return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"}`}}>Home</NavLink></li>
        {authUser ? <><li><button onClick={logout} className='py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 '>Logout</button></li>
        <li><NavLink to="/user-profile"><img src={authUser.photoURL} className="h-[30px] w-[30px] rounded-full"/></NavLink></li></>:<>
          <li><NavLink to="auth/login" className={(obj)=>{ let{isActive}=obj;return` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"}`}}>Login</NavLink></li>
          <li><NavLink to="auth/register" className={(obj)=>{ let{isActive}=obj;return` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800  ${isActive && "bg-blue-600"}`}}>Register</NavLink></li>
        </>}
        
     </ul>
     {isLoading && <Spinner/>}
    </aside>
  )
}

export default Menu
