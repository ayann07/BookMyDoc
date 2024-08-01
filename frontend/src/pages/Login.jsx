import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../main'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthToken, setAuthUser, setRole } from '../redux/userSlice'
import HashLoader from 'react-spinners/HashLoader'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message)
        dispatch(setAuthToken(data.token))
        dispatch(setAuthUser(data.data))
        dispatch(setRole(data.role))
        navigate('/')
      }
      else {
        toast.error(data.message)
      }
    }
    catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <section className='flex justify-center items-center min-h-screen px-5 lg:px-0'>
      <div className='w-full max-w-[570px] rounded-lg shadow-md p-5 md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-primaryColor'>Welcome</span> Back
        </h3>
        <form onSubmit={submitHandler} className='py-4 md:py-0'>
          <div className='mb-5'>
            <input
              type="email"
              placeholder='Enter your email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
              required
            />
          </div>
          <div className='mb-5'>
            <input
              type="password"
              placeholder='Enter your password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
              required
            />
          </div>
          <div className='mt-7'>
            <button
              type='submit'
              className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
              {loading ? <HashLoader size={35} color='#fffff' /> : 'Login'}
            </button>
          </div>
          <p className='mt-5 text-textColor text-center'>
            Don't have an account? <Link to='/register' className='text-primaryColor'>Register</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
