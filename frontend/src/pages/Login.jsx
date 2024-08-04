import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../main';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthToken, setAuthUser, setRole } from '../redux/userSlice';
import HashLoader from 'react-spinners/HashLoader';
import doctor4 from '../assets/images/doctor4.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        dispatch(setAuthToken(data.token));
        dispatch(setAuthUser(data.data));
        dispatch(setRole(data.role));
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex items-center min-h-screen px-5 lg:px-0'>
      <div className='w-full max-w-screen-lg mx-auto flex flex-col md:flex-row'>
        <div className='hidden md:flex md:w-1/2'>
          <img src={doctor4} alt="Doctor" className='w-full h-full object-cover rounded-l-lg' />
        </div>
        <div className='w-full md:w-1/2 p-5 md:p-10'>
          <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
            Hello! <span className='text-primaryColor'>Welcome</span> Back
          </h3>
          <form onSubmit={submitHandler} className='space-y-5'>
            <div>
              <input
                type="email"
                placeholder='Enter your email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor rounded-md'
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder='Enter your password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor rounded-md'
                required
              />
            </div>
            <div className='mt-7'>
              <button
                type='submit'
                className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex items-center justify-center'>
                {loading ? <HashLoader size={25} color='#ffffff' /> : 'Login'}
              </button>
            </div>
            <p className='mt-5 text-textColor text-center'>
              Don't have an account? <Link to='/register' className='text-primaryColor'>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
