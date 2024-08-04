import React from 'react';
import formatDate from '../../../utils/formatDate';
import Loading from '../../Loading';

const Appointments = ({ bookings, loading }) => {
  return (
    <>
    {loading && <Loading/>}
  { !loading && <div className='w-full overflow-x-auto mt-5 '>
      <table className='min-w-full text-left text-xs sm:text-sm text-gray-700'>
        <thead className='text-xs sm:text-sm text-gray-900 uppercase bg-gray-200'>
          <tr>
            <th scope='col' className='px-2 py-1 sm:px-4 sm:py-2'>
              Patient
            </th>
            <th scope='col' className='px-2 py-1 sm:px-4 sm:py-2'>
              Ref ID
            </th>
            <th scope='col' className='px-2 py-1 sm:px-4 sm:py-2'>
              Payment status
            </th>
            <th scope='col' className='px-2 py-1 sm:px-4 sm:py-2'>
              Fees INR(₹)
            </th>
            <th scope='col' className='px-2 py-1 sm:px-4 sm:py-2'>
              Date of Payment
            </th>
            <th scope='col' className='px-2 py-1 sm:px-4 sm:py-2'>
              Appointment Date
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings && bookings?.map((item, index) => (
            <tr key={index} className='border-b border-gray-300'>
              <td className='flex flex-col md:flex-row items-start md:items-center px-2 py-1 sm:px-4 sm:py-2'>
                <img src={item.user.photo ? item.user.photo : no_image_found} alt="" className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover' />
                <div className='ml-2 sm:ml-4 mt-2 md:mt-0'>
                  <div className='text-xs sm:text-sm font-semibold'>{item.user.name}</div>
                </div>
              </td>
              <td className='px-2 py-1 sm:px-4 sm:py-2'>{item.ref_id}</td>
              <td className='px-2 py-1 sm:px-4 sm:py-2'>
                {item.isPaid ? (
                  <div className='flex items-center'>
                    <div className='h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-green-500 mr-1 sm:mr-2 md:mr-3'> </div>
                    <span className='text-xs sm:text-sm'>Paid</span>
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <div className='h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-red-500 mr-1 sm:mr-2'> </div>
                    <span className='text-xs sm:text-sm'>Unpaid</span>
                  </div>
                )}
              </td>
              <td className='px-2 py-1 sm:px-4 sm:py-2'>{item.fees}</td>
              <td className='px-2 py-3 sm:px-4 sm:py-2'>{formatDate(item.createdAt)}</td>
              <td className='px-2 py-3 sm:px-4 sm:py-2'>{formatDate(item.selected_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>}
    </>
);
};

export default Appointments;


