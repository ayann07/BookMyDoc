import React from 'react'


function convertTo12HourFormat(time) {
  const timeParts=time.split(':')
  let hours=parseInt(timeParts[0])
  let mins=parseInt(timeParts[1])
  let meridiem='AM'
  if(hours>=12)
  {
    meridiem='PM'
    if(hours>12)
    {
      hours-=12
    }
  }
  return hours.toString().padStart(2) +":"+ mins.toString().padStart(2,'0')+" " + meridiem
}

const SidePanel = ({ fees, timeSlots }) => {
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text__para mt-0 font-semibold'>Fees</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>₹ {fees}</span>
      </div>
      <div className='mt-[30px]'>
        <p className='text__para mt-0 font-semibold text-headingColor'>
          Available Time Slots:
        </p>
        <ul className='mt-3'>
          {timeSlots?.map((item, index) =>
            <li key={index}
              className='flex items-center justify-between mb-2'>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>{item.day.charAt(0).toUpperCase()+ item.day.slice(1)}
              </p>
              <p 
              className='text-[15px] leading-6 text-textColor font-semibold'>
                {convertTo12HourFormat(item.startingTime)} - {convertTo12HourFormat(item.endingTime)}</p>
            </li>
          )
          }

        </ul>
      </div>
      <button className='btn px-2 w-full rounded-md'>Book Appointment</button>
    </div>

  )
}

export default SidePanel