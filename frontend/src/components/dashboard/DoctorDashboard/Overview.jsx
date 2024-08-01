import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../main';
import toast from 'react-hot-toast';
import starIcon from '../../../assets/images/Star.png'
import DoctorAbout from '../../doctors/DoctorAbout';
const Overview = () => {
    const { authToken } = useSelector(store => store.user);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState()

    const getDetails = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/doctor/mydetails`, {
                method: "GET",
                headers: {
                    Authorization: authToken,
                }
            })
            const result = await response.json();
            console.log(result.doctor)
            if (!response.ok) {
                toast.error(result.message)
            }
            setData(result.doctor)

        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDetails();
    }, [])

    console.log(data)
    return (
        <div>
        {data && <div>
            <div className='flex items-center gap-4 mb-10'>
                <figure>
                    <img src={data.photo} alt="" className='w-56' />
                </figure>
                <div>
                    <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold '>
                        {data.specialization ? data.specialization : '-'}
                    </span>
                    <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3 w-full'>{data.name}</h3>
                    <div className='flex items-center gap-[6px]'>
                        <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold '>
                            <img src={starIcon} alt="" />
                            {data.averageRating}
                        </span>
                        <span className=' text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold '>
                        ({data.totalRating})
                        </span>
                    </div>
                    <p className='text__para font-[15px] lg:max-w-[390px] leading-6'>{data.bio}</p>
                </div>
            </div>
            <DoctorAbout 
            name={data.name}
            about={data.about}
            qualifications={data.qualifications}
            experiences={data.experiences}
            />
        </div>
}
        </div>
    )
}

export default Overview
