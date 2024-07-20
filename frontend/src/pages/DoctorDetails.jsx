import React from 'react'
import doctorImg from '../assets/images/doctor-img02.png';
import starIcon from '../assets/images/Star.png';
const DoctorDetails = () => {
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            <div className='flex items-center gap-5 max-w-[200px] max-h-[200px]'>
              <img src={doctorImg} alt="" className='w-full' />
              <div>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] font-semibold rounded'>
                  Surgeon
                </span>
                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold '>
                  Mohd Ayan Raza
                </h3>
                <div className='flex items-center gap-[6px]'>
                  <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] font-semibold text-headingColor'>
                    <img src={starIcon} alt="" /> 4.8
                  </span>
                  <span className='text-[14px] leading-5 lg:text-[16px] font-[400] text-textColor'>
                    (272)
                  </span>
                </div>

                <p className='text__para text-[14px] md:text-[15px] leading-5 lg:max-w-[390px]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, tempora?
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorDetails