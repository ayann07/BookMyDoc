import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../../utils/uploadCloudinary.js';
import { BASE_URL } from '../../../main.jsx'
import toast from "react-hot-toast"
import HashLoader from 'react-spinners/HashLoader'
import { useSelector,useDispatch } from 'react-redux';
import { setAuthToken, setAuthUser, setRole } from '../../../redux/userSlice.js';

const PatientSettings = () => {
   const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("")
  const { authToken } = useSelector(store => store.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    bloodGroup:'',
    gender: '',
  })
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0]
    const data = await uploadImageToCloudinary(file)
    setPreviewURL(data.url)
    setSelectedFile(data.url)
    setFormData({ ...formData, photo: data.url })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const filteredFormData = Object.keys(formData)
            .filter(key => formData[key] !== '')
            .reduce((obj, key) => {
               obj[key] = formData[key];
               return obj;
            }, {});
      const res = await fetch(`${BASE_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           Authorization: authToken,
        },
        body: JSON.stringify(filteredFormData)
      })

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message)
        dispatch(setAuthToken(null));
        dispatch(setAuthUser(null));
        dispatch(setRole(null));
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        localStorage.removeItem('role');
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
    <section>
    <form onSubmit={submitHandler}>
    <div className='mb-5'>
      <input
        type="text"
        placeholder='Name'
        name='name'
        value={formData.name}
        onChange={handleInputChange}
        className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
      />
    </div>
    <div className='mb-5'>
      <input
        type="email"
        placeholder='Email'
        name='email'
        value={formData.email}
        onChange={handleInputChange}
        className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
      />
    </div>
    <div className='mb-5'>
      <input
        type="password"
        placeholder='Password'
        name='password'
        value={formData.password}
        onChange={handleInputChange}
        className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
      />
    </div>
    <div className='mb-5'>
      <input
        type="text"
        placeholder='Blood group'
        name='bloodGroup'
        value={formData.bloodGroup}
        onChange={handleInputChange}
        className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
      />
    </div>
    <div className='mb-5  items-center justify-between'>
      <label className='text-headingColor font-bold text-[16px] leading-7'>
        Gender:
        <select
          name="gender"
          className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="" disabled>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
    </div>
    <div className='mb-5 flex items-center gap-3'>
      {selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
        <img src={previewURL} alt="" className='w-full rounded-full' />
      </figure>}
      <div className='relative w-[130px] h-[50px]'>
        <input
          type="file"
          id='customFile'
          name='photo'
          accept='.jpg, .png'
          onChange={handleFileInputChange}
          className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
        />
        <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
          Upload Photo
        </label>
      </div>
    </div>
    <div className='mt-7'>
      <button
        disabled={loading}
        type='submit'
        className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
        {loading ? <HashLoader size={35} color='#fffff' /> : 'Update'}
      </button>
    </div>
  </form>
  </section>
  )
}

export default PatientSettings