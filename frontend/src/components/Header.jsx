import React, { useEffect, useRef } from 'react';
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import useLogout from '../hooks/useLogout';
import no_image_found from '../assets/images/no_image_found.jpeg'
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
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const { authUser, role, authToken } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

 
  const handleLogout=useLogout()
  
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu');
  };

  return (
    <div className='header flex items-center' ref={headerRef}>
      <div className="container">
        <div className='flex items-center justify-between'>
          <div>
            <img src={logo} alt="Logo" />
          </div>
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {
                navLinks.map((item, index) =>
                  <li key={index}>
                    <Link to={item.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] '
                      : 'text-textColor text-[16px] leading-7 font-[500]'}>
                      {item.display}
                    </Link>
                  </li>
                )
              }
              {authToken && authUser && (
                <>
                  <li className='lg:hidden'>
                    <Link to={`${role === 'doctor' ? 'doctors/profile/me' : 'users/profile/me'}`} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600] '
                      : 'text-textColor text-[16px] leading-7 font-[500]'}>
                      Your Profile
                    </Link>
                  </li>
                  <li className='lg:hidden'>
                    <button onClick={handleLogout} className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className='flex items-center gap-4'>
            {authToken && authUser ? (
              <div className='flex items-center gap-2'>
                <Link to={`${role === 'doctor' ? 'doctors/profile/me' : 'users/profile/me'}`} className='hidden lg:flex items-center gap-2'>
                  <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                    <img src={authUser?.photo ?authUser?.photo:no_image_found} className='w-full h-full rounded-full' alt="Profile" />
                  </figure>
                  <h2 className='text-[16px] font-[600]'>{authUser?.name}</h2>
                </Link>
                <button onClick={handleLogout} className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] hidden lg:flex'>Logout</button>
              </div>
            ) : (
              <Link to='/login'>
                <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] '>Login</button>
              </Link>
            )}
            <span className='pt-2 pr-3 lg:hidden' onClick={toggleMenu}>
              <IoMdMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

