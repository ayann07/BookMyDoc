import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import { BASE_URL } from '../../main';
import Loading from '../Loading';

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
      setData(result);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const doctorsToShow = data.doctors ? data.doctors.slice(0, 4) : [];

  return (
    <div>
      {loading && <Loading />}
      {doctorsToShow.length === 0 && <div className='w-full text-center py-20'>
        <p className='text-lg font-semibold text-gray-600'>
          No doctor found, please try again later.
        </p>
      </div>}
      <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {doctorsToShow.length > 0 &&
          doctorsToShow.map((doctor, idx) => (
            <DoctorCard key={idx} doctor={doctor} />
          )
          )}
      </div>
    </div>
  );
};

export default DoctorList;

