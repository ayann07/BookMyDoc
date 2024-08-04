import React from 'react'
import ServiceList from '../components/services/ServiceList';
import DoctorList from '../components/doctors/DoctorList';
import FaqList from '../components/faqs/FaqList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import DoctorBanner from '../assets/images/doctorbanner.png'
import doctor1 from '../assets/images/doctor1.png'
import doctor2 from '../assets/images/doctor3.png'
const Home = () => {
  const navigate = useNavigate()
  const { authUser, role } = useSelector(store => store.user);

  const handleAppointment = () => {
    if (authUser && role === 'patient') {
      toast.success('Find a doctor to request an appointment')
      navigate('/doctors')
    } else if (!authUser) {
      toast.success('Login to request an appointment')
      navigate('/login')
    }
  }

  return (
    <>
      <section className='hero__section pt-[60px] 2xl:h-[800px]'>
        <div className="container">
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between '>
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>Your health, our priority.</h1>
                <p className='text__para'>
                  It's our promise to deliver exceptional care, combining medical excellence with compassion to support your journey toward optimal health and well-being.
                </p>
                {role !== 'doctor' && <button 
                  className='btn'
                  onClick={handleAppointment}
                >Request an Appointment</button>}
              </div>
            </div>
            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img src={DoctorBanner} className='w-full' alt="Doctor Banner" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our medical services</h2>
          </div>
          <ServiceList />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            <div className='xl:w-[670px]'>
              <h2 className='heading'>Schedule Your Appointment Anytime</h2>
              <ul className='pl-4'>
                <li className='text__para'>
                  1. Schedule the appointment directly.
                </li>
                <li className='text__para'>
                  2. Search for the doctor here and check their availability.
                </li>
                <li className='text__para'>
                  3. Select an available appointment time that fits your schedule.
                </li>
              </ul>
            </div>
            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img src={doctor1} className='w-3/4' alt="" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our Great Doctors</h2>
          </div>
          <DoctorList />
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block'>
              <img src={doctor2} alt="" />
            </div>
            <div className='w-full md:w-1/2'>
              <h2 className='heading'>Frequently Asked Questions</h2>  
              <FaqList />
            </div> 
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;
