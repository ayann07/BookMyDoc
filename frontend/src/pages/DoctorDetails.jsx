import React, { useEffect, useState } from 'react'
import no_image_found from '../assets/images/no_image_found.jpeg'
import starIcon from '../assets/images/Star.png';
import DoctorAbout from '../components/doctors/DoctorAbout';
import Feedback from '../components/doctors/Feedback';
import SidePanel from '../components/doctors/SidePanel';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import { BASE_URL } from '../main';
const DoctorDetails = () => {
  const [tab, setTab] = useState('about')
  const {id}=useParams()
  const [data, setData] = useState();
  const [loading,setLoading]=useState(false)
  const getDetails = async () => {
      setLoading(true);
      try {
          const response = await fetch(`${BASE_URL}/doctor/${id}`, {
              method: "GET",
          });
          const result = await response.json();
          if (!response.ok) {
              toast.error(result.message);
          }
          setData(result.doctor);
      } catch (err) {
          toast.error(err.message);
      } finally {
          setLoading(false);
      }
  };
  console.log(data)

  useEffect(() => {
      getDetails();
  }, []);
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && <Loading/>}
        {data && <div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            <div className='flex items-center gap-5 '>
              <figure className='max-w-[200px] max-h-[200px]'>
                <img src={data.photo?data.photo:no_image_found} alt="" className='w-full' />
              </figure>

              <div>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] font-semibold rounded'>
                 {data.specialization?data.specialization:'-'}
                </span>
                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold '>
                  {data.name}
                </h3>
                <div className='flex items-center gap-[6px]'>
                  <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] font-semibold text-headingColor'>
                    <img src={starIcon} alt="" /> {data.averageRating}
                  </span>
                  <span className='text-[14px] leading-5 lg:text-[16px] font-[400] text-textColor'>
                    ({data.totalRating})
                  </span>
                </div>

                <p className='text__para text-[14px] md:text-[15px] leading-5 lg:max-w-[390px] md:max-w-[390px]'>
                  {data.bio}
                </p>
              </div>
            </div>
            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button
                className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                onClick={() => setTab('about')}>
                About
              </button>
              <button
                className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                onClick={() => setTab('feedback')}>
                Feedback
              </button>
            </div>

            <div className='mt-[50px]'>
              {tab === 'about' && 
              <DoctorAbout 
              name={data.name} 
              about={data.about} 
              qualifications={data.qualifications} 
              experiences={data.experiences}
              />
              }
              {tab === 'feedback' && 
              <Feedback 
              reviews={data.reviews}
              totalRating={data.totalRating}
              />
              }
            </div>
          </div>
          <div>
            <SidePanel doctorId={id} fees={data.fees} timeSlots={data.timeSlots}/>
          </div>
        </div>
        }
      </div>
    </section>
  )
}

export default DoctorDetails