import React from 'react';
import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import no_image_found from '../../assets/images/no_image_found.jpeg';

const DoctorCard = ({ doctor }) => {
    const { name, avgRating, totalRating, photo, specialization, experiences, fees } = doctor;
    const hospital = experiences && experiences[0]?.hospital;

    return (
        <div className='p-4 lg:p-6 border rounded-lg shadow-lg transition-transform transform hover:scale-105'>
            <div className='w-full h-60 lg:h-72 overflow-hidden relative rounded-t-lg'>
                <img src={photo ? photo : no_image_found} className='w-full h-full object-cover object-center' alt={name} />
            </div>
            <div className='p-4'>
                <h2 className='text-xl lg:text-2xl font-bold text-headingColor mt-4 lg:mt-6'>
                    Dr. {name}
                </h2>
                <div className='mt-2 lg:mt-4 flex items-center justify-between'>
                    <span className='bg-[#E0F7FA] text-teal-600 py-1 px-3 lg:py-2 lg:px-4 text-lg rounded-full leading-4 font-semibold'>
                        {specialization}
                    </span>
                    <div className='flex items-center gap-2'>
                        <span className='flex items-center gap-1 text-sm lg:text-lg font-semibold text-headingColor'>
                            <img src={starIcon} alt="Rating" className='w-5 h-5' /> {avgRating}
                        </span>
                        <span className='text-sm lg:text-lg font-medium text-textColor'>({totalRating})</span>
                    </div>
                </div>
                <div className='mt-4 lg:mt-6'>
                    <p className='text-sm lg:text-base font-medium text-textColor'>
                        Fees: ₹ {fees}
                    </p>
                </div>
                
                    <div className='mt-4 lg:mt-6 bg-[#F1F1F1] p-3 rounded-lg'>
                        <p className='text-sm lg:text-base font-medium text-headingColor'>
                            <span className='font-normal text-textColor'>Hospital:</span> {hospital}
                        </p>
                    </div>
                
                <div className='mt-4 lg:mt-6 flex items-center justify-center'>
                    <Link to={`/doctors/${doctor?._id}`}
                        className='w-10 h-10 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-transparent hover:text-white transition-colors duration-300'
                    >
                        <FaArrowRightLong className='w-5 h-5' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
