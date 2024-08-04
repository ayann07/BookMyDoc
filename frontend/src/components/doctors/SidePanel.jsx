import React, { useState } from 'react';
import { BASE_URL } from '../../main';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import convertTo12HourFormat from '../../utils/convertTime';

const SidePanel = ({ doctorId, fees, timeSlots }) => {
  const { authToken, role, authUser } = useSelector((store) => store.user);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const bookingHandler = async () => {
    if (!selectedDate) {
      toast.error('Please select a date for booking');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedDate }), // Send selected date to backend
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error('Doctors details not completed');
        return;
      }
      console.log('Checkout Session:', data.session);
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text__para mt-0 font-semibold'>Fees</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          ₹ {fees}
        </span>
      </div>
      <div className='mt-[30px]'>
        <p className='text__para mt-0 font-semibold text-headingColor'>
          Available Time Slots:
        </p>
        <ul className='mt-3'>
          {timeSlots?.map((item, index) => (
            <li key={index} className='flex items-center justify-between mb-2'>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {convertTo12HourFormat(item.startingTime)} - {convertTo12HourFormat(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {authUser && role !== 'doctor' && (
        <div className='mt-4'>
          <label htmlFor='dateInput' className='text__para mt-0 font-semibold text-headingColor mr-5'>
            Select Date:
          </label>
          <input
            id='dateInput'
            type='date'
            value={selectedDate}
            onChange={handleDateChange}
            className='mt-2 p-2 border rounded-md'
          />
          <button className='btn px-2 w-full rounded-md mt-4' onClick={bookingHandler}>
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default SidePanel;

