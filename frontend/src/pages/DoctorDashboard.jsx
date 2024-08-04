import React, { useState, useEffect } from 'react'
import Overview from '../components/dashboard/DoctorDashboard/Overview';
import Appointments from '../components/dashboard/DoctorDashboard/appointments';
import Settings from '../components/dashboard/DoctorDashboard/Settings';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../main';
import toast from 'react-hot-toast';
import useLogout from '../hooks/useLogout';
const DoctorDashboard = () => {
  const { authToken, authUser } = useSelector(store => store.user);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  const getDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/doctor/${authUser.userId}`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        }
      })
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message)
      }
      setData(result.doctor)

    }
    catch (err) {
      toast.error(err.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetails();
  }, [])

  const handleLogout = useLogout()
  const deleteHandler = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/doctor`, {
        method: "DELETE",
        headers: {
          Authorization: authToken
        }
      })
      const data = await response.json()
      if (!response.ok) {
        toast.error(data.message)
      }
      else {
        toast.success(data.message)
        handleLogout()
      }
    }
    catch (err) {
      toast.error(data.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
        <div>
          <div className=' lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
            <button
              onClick={() => setTab('overview')}
              className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
            >Overview
            </button>
            <button
              onClick={() => setTab('appointments')}
              className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
            >Appointments
            </button>
            <button
              onClick={() => setTab('settings')}
              className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
            >Profile
            </button>
            <div className='mt-[50px] md:mt-[100px]'>
              <button
                onClick={deleteHandler}
                className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className={`mt-8 ${tab === 'appointments' ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
          {tab === 'overview' && <Overview loading={loading} data={data} />}
          {tab === 'appointments' && <Appointments bookings={data.bookings} loading={loading} />}
          {tab === 'settings' && <Settings />}
        </div>

      </div>
    </section>
  )
}

export default DoctorDashboard