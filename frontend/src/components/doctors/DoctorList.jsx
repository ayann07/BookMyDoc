import React, { useEffect, useState } from 'react'
import DoctorCard from './DoctorCard'
import { BASE_URL } from '../../main'
import toast from 'react-hot-toast'

const DoctorList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getDetails = async () => {
      setLoading(true);
      try {
          const response = await fetch(`${BASE_URL}/doctor`, {
              method: "GET",
          });
          const result = await response.json();
          if (!response.ok) {
              toast.error(result.message);
          }
          setData(result);
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
    <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {data.doctors && data.doctors.map((doctor, idx) => (
        <DoctorCard key={idx} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
