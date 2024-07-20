import React, { useEffect, useRef } from 'react'
import logo from '../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { IoMdMenu } from "react-icons/io";
const navLinks = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Find a Doctor',
    path: '/doctors'
  },
  {
    display: 'Services',
    path: '/services'
  },
  {
    display: 'Contact',
    path: '/contact'
  },
]


const Header = () => {
  const headerRef=useRef(null);
  const menuRef=useRef(null);

  const handleStickyHeader=()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80)
      {
        headerRef.current.classList.add('sticky__header')
      }
      else
      {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader()
    return ()=>window.addEventListener('scroll',handleStickyHeader)
  })
  
  
  const toggleMenu=()=>{
    menuRef.current.classList.toggle('show__menu')
  }
  return (
    <div className='header flex items-center' ref={headerRef}>
      <div className="container">
        <div className='flex items-center justify-between'>
          <div>
            <img src={logo} alt="" />
          </div>
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {
                navLinks.map((item, index) =>
                  <li key={index}>
                    <NavLink to={item.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] '
                      : 'text-textColor text-[16px] leading-7 font-[500]'}>
                      {item.display}
                    </NavLink>
                  </li>
                )
              }
            </ul>
          </div>
          <div className='items-center gap-4'>
            <div className='w-[35px] h-[35px] rounded-full cursor-pointer flex gap-2'>
              <Link to='/login'>
              <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] '>Login</button>
              </Link>
              <span className='pt-2 pr-3 lg:hidden md:hidden ' onClick={toggleMenu}>
              <IoMdMenu className='w-6 h-6 cursor-pointer'/>
              </span>
            </div>   
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header