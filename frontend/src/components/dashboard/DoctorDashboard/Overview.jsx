import starIcon from '../../../assets/images/Star.png'
import DoctorAbout from '../../doctors/DoctorAbout';
const Overview = ({loading,data}) => {
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
