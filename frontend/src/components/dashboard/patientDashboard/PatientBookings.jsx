import React, { useEffect, useState } from 'react';
import formatDate from '../../../utils/formatDate';
import no_image_found from '../../../assets/images/no_image_found.jpeg';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { BASE_URL } from '../../../main';
import Loading from '../../Loading';

const PatientBookings = () => {
  const { authToken } = useSelector(store => store.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user/mydetails`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        }
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
      }
      setData(result.user.bookings);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
      <>
      {loading && <Loading/>}
    { !loading && <div className='w-full overflow-x-auto mt-5'>
        <table className='min-w-full text-left text-xs sm:text-sm text-gray-700'>
          <thead className='text-xs sm:text-sm text-gray-900 uppercase bg-gray-200'>
            <tr>
              <th scope='col' className='px-2 py-1 sm:px-4 sm:py-2'>
                Doctor
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
            {data && data?.map((item, index) => (
              <tr key={index} className='border-b border-gray-300'>
                <td className='flex flex-col md:flex-row items-start md:items-center px-2 py-1 sm:px-4 sm:py-2'>
                  <img src={item.doctor.photo ? item.doctor.photo : no_image_found} alt="" className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover' />
                  <div className='ml-2 sm:ml-4 mt-2 md:mt-0'>
                    <div className='text-xs sm:text-sm font-semibold'>{item.doctor.name}</div>
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

export default PatientBookings;
