import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/doctors/DoctorCard';
import { BASE_URL } from '../main';
import toast from 'react-hot-toast'
import Loading from '../components/Loading';

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [debounceQuery, setDebounceQuery] = useState('');

  const getDetails = async () => {
    setLoading(true);
    try {
      const url = debounceQuery ? `${BASE_URL}/doctor?q=${debounceQuery}` : `${BASE_URL}/doctor`;
      const response = await fetch(url, {
        method: 'GET',
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
      }
      setData(result.doctors || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    getDetails();
  }, [debounceQuery]);

  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className="container text-center">
          <h2 className='heading'>Find a Doctor</h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input
              type="search"
              className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
              placeholder='Search Doctor'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className='btn mt-0 rounded rounded-r-md'
              onClick={handleSearch}
            >Search</button>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          {
          loading && <Loading />
          }
          <div className='grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-5 lg:gap-[30px] mt-[30px]'>
            {
              data.map((doctor, idx) => (
                <DoctorCard key={idx} doctor={doctor} />
              ))
            }
          </div>
          {data.length === 0 &&
            <div className='w-full text-center py-20'>
              <p className='text-lg font-semibold text-gray-600'>
                No doctors found. Please try a different search.
              </p>
            </div>
          }
        </div>
      </section>
    </>
  );
};

export default Doctors;
