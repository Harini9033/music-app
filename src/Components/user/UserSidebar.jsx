import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiAccountBoxFill } from "react-icons/ri";
import { AiFillPicture } from "react-icons/ai";
import { AiFillProfile } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

const UserSidebar = () => {
  return (
    <div className='h-[100%] w-[20%] bg-slate-600 px-4 py-8 shrink-0'>
      <ul className='flex flex-col gap-2 '>
        <li>
           
            <NavLink to="/user-profile" end className={(obj)=>
          { 
            let{isActive}=obj;
            return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"} flex items-center gap-2`}}><span><RiAccountBoxFill /> </span> My Account</NavLink>
        </li>
        <li>
            <NavLink to="/user-profile/update-picture" className={(obj)=>
          { 
            let{isActive}=obj;
            return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"} flex items-center gap-2`}}><span><AiFillPicture /></span>Update Picture</NavLink>
        </li>
        <li>
            <NavLink to="/user-profile/update-profile" className={(obj)=>
          { 
            let{isActive}=obj;
            return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"} flex items-center gap-2`}}><span><AiFillProfile /></span>Update Profile</NavLink>
        </li>
        <li>
            <NavLink to="/user-profile/update-password" className={(obj)=>
          { 
            let{isActive}=obj;
            return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"} flex items-center gap-2`}}><span><RiLockPasswordFill /> </span> Update Password</NavLink>
        </li>
        <li>
            <NavLink to="/user-profile/delete-user" className={(obj)=>
          { 
            let{isActive}=obj;
            return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-red-800 ${isActive && "bg-red-600"} flex items-center gap-2`}}><span><MdDeleteOutline /> </span> Delete User</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default UserSidebar
