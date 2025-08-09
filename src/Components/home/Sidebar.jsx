import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    return (
              <div className='h-[calc(100vh-70px)] sticky top-[70px] z- w-[20%] bg-slate-600 px-4 py-8 shrink-0'>
                <ul className='flex flex-col gap-2 '>
                  <li>
                     
                      <NavLink to="/" end className={(obj)=>
                    { 
                      let{isActive}=obj;
                      return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${isActive && "bg-blue-600"} flex items-center gap-2`}}><span></span>Dashboard</NavLink>
                  </li>
                  
                  
                </ul>
              </div>
  )
}

export default Sidebar
