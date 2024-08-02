import React from 'react';
import formatDate from '../../../utils/formatDate';
import no_image_found from '../../../assets/images/no_image_found.jpeg';

const Appointments = ({ bookings }) => {
  console.log(bookings);
  return (
    <div className='w-full'>
      <table className='min-w-full text-left text-sm sm:text-lg text-gray-700'>
        <thead className='text-xs sm:text-md text-gray-900 uppercase bg-gray-200'>
          <tr>
            <th scope='col' className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>
              Name
            </th>
            <th scope='col' className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>
              Gender
            </th>
            <th scope='col' className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>
              Payment
            </th>
            <th scope='col' className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>
              Fees INR(₹)
            </th>
            <th scope='col' className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>
              Booking Date
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((item, index) => (
            <tr key={index} className='border-b border-gray-300'>
              <th scope='row' className='flex flex-col md:flex-row items-start md:items-center px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5 text-gray-900 whitespace-nowrap'>
                <img src={item.user.photo ? item.user.photo : no_image_found} alt="" className='w-12 h-12 sm:w-16 sm:h-16 rounded-full' />
                <div className='pl-0 md:pl-6 pt-2 md:pt-0'>
                  <div className='text-sm sm:text-lg md:text-xl font-semibold'>{item.user.name}</div>
                  <div className='text-xs sm:text-sm md:text-lg text-gray-500'>{item.user.email}</div>
                </div>
              </th>
              <td className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>{item.user.gender}</td>
              <td className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>
                {item.isPaid ? (
                  <div className='flex items-center'>
                    <div className='h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-green-500 mr-1 sm:mr-2 md:mr-3'></div>
                    Paid
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <div className='h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-red-500 mr-1 sm:mr-2 md:mr-3'></div>
                    Unpaid
                  </div>
                )}
              </td>
              <td className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>{item.fees}</td>
              <td className='px-2 py-3 sm:px-4 sm:py-2 md:px-10 md:py-5'>{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
