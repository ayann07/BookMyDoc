import React, { useState } from 'react'
import PatientBookings from '../components/dashboard/patientDashboard/PatientBookings'
import PatientSettings from '../components/dashboard/patientDashboard/PatientSettings'
import { BASE_URL } from '../main'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import useLogout from '../hooks/useLogout'
import Loading from '../components/Loading'
import no_image_found from '../assets/images/no_image_found.jpeg';
const PatientDashboard = () => {
    const handleLogout=useLogout()
    const [tab, setTab] = useState('')
    const {authToken,authUser}=useSelector(store => store.user);
    const [loading,setLoading]=useState(false)
    const deleteHandler=async()=>{
     try{
        setLoading(true)
        const response=await fetch(`${BASE_URL}/user`,{
            method:"DELETE",
            headers:{
                Authorization:authToken
            }
        })
        const data=await response.json()
        if(!response.ok)
        {
        toast.error(data.message)
        }
        else
        {
            toast.success(data.message)
            handleLogout()
        }   
     }
     catch(err)
     {
      toast.error(data.message)
     }
     finally{
     setLoading(false)
     }
    }
    return (
        <section>
        <div className='max-w-[1170px] px-5 mx-auto'>
            {loading && <Loading/>}
            {authUser && <div className='grid md:grid-cols-3 gap-10'>
                <div className='pb-[50px] px-[30px] rounded-md'>
                    <div className='flex items-center justify-center'>
                        <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                            <img src={authUser.photo?authUser.photo:no_image_found} alt="" className='w-full h-full rounded-full' />
                        </figure>
                    </div>
                    <div className='text-center mt-4'>
                        <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                            {authUser.name}
                        </h3>
                        <p className='text-textColor text-[15px] leading-4 font-medium'>
                            {authUser.email}
                        </p>
                    </div>
                    <div className='mt-[50px] md:mt-[100px]'>
                        <button 
                        onClick={deleteHandler}
                        className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                            Delete Account
                        </button>
                    </div>
                </div>
                <div className='md:col-span-2 md:px-[30px] '>
                    <div>
                        <button
                            onClick={() => setTab('bookings')}
                            className={`${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                            My Bookings
                        </button>
                        <button
                            onClick={() => setTab('settings')}
                            className={`${tab === 'settings' && 'bg-primaryColor text-white font-normal'} py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                            Profile Settings
                        </button>
                    </div>
                    {
                        tab==='bookings' && <PatientBookings/>
                    }
                    {
                        tab==='settings' && <PatientSettings/>
                    }
                </div>
            </div>}
        </div>
        </section>
    )
}

export default PatientDashboard