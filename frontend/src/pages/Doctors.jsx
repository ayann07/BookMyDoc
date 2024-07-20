import React from 'react'
import { doctors } from '../assets/data/doctors'
import DoctorCard from '../components/doctors/DoctorCard'

const Doctors = () => {
  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className="container text-center">
          <h2 className='heading'>Find a Doctor</h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' placeholder='Search Doctor' />
            <button className='btn mt-0 rounded rounded-r-md '>Search</button>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]'>
            {
              doctors.map((doctor, idx) =>
                <DoctorCard key={idx} doctor={doctor} />
              )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Doctors