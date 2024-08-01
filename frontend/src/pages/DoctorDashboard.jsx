import React, { useState } from 'react'
import { BiMenu } from "react-icons/bi";
import Overview from '../components/dashboard/DoctorDashboard/Overview';
import Appointments from '../components/dashboard/DoctorDashboard/appointments';
import Settings from '../components/dashboard/DoctorDashboard/Settings';
const DoctorDashboard = () => {
  const [tab, setTab] = useState('overview');

  return (
    <section>
    <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
      <div>
        <span className='lg:hidden'>
          <BiMenu className='w-6 h-6 cursor-pointer' />
        </span>
        <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
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
            <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
              Delete Account
            </button>
          </div>
          </div>
      </div>
        <div className='mt-8 lg:col-span-1'>
         {
          tab==='overview' && <Overview/>
         }
         {
          tab==='appointments' && <Appointments/>
         }
         {
          tab==='settings' && <Settings/>
         }
      
      </div>
      </div>
      </section>
  )
}

export default DoctorDashboard