import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavbarContainer = () => {
  return (
    <header className='h-[70px] w-[100%] bg-slate-700 sticky top-0 z-10'>
     <article className='m-auto w-[95%] h-[100%] flex items-center justify-between'>
        <Logo/>
        <Menu/>
     </article>
    </header>
  )
}

export default NavbarContainer
