import React, { useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from '../../../utils/uploadCloudinary';
import HashLoader from 'react-spinners/HashLoader';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../../../main';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import { setAuthToken, setAuthUser, setRole } from '../../../redux/userSlice';
import useLogout from '../../../hooks/useLogout';
const Settings = () => {
    const handleLogout=useLogout()
    const { authUser, authToken } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        phoneNumber: '',
        bio: '',
        about: '',
        specialization: '',
        fees: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        photo: '',
    });
    const [modifiedFields, setModifiedFields] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setModifiedFields({ ...modifiedFields, [name]: value });
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setFormData({ ...formData, photo: data.url });
        setModifiedFields({ ...modifiedFields, photo: data.url });
    };

    const addItem = (key, item) => {
        setFormData(prevFormData => {
            const updatedItems = [...prevFormData[key], item];
            setModifiedFields(prevModifiedFields => ({ ...prevModifiedFields, [key]: updatedItems }));
            return { ...prevFormData, [key]: updatedItems };
        });
    };

    const deleteItem = (key, index) => {
        setFormData(prevFormData => {
            const updatedItems = prevFormData[key].filter((_, i) => i !== index);
            setModifiedFields(prevModifiedFields => ({ ...prevModifiedFields, [key]: updatedItems }));
            return { ...prevFormData, [key]: updatedItems };
        });
    };

    const handleReusableInputChangeFunc = (key, index, e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => {
            const updatedItems = [...prevFormData[key]];
            updatedItems[index][name] = value;
            setModifiedFields(prevModifiedFields => ({ ...prevModifiedFields, [key]: updatedItems }));
            return { ...prevFormData, [key]: updatedItems };
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (Object.keys(modifiedFields).length === 0) {
                toast.error("No changes detected");
                setLoading(false);
                return;
            }

            const res = await fetch(`${BASE_URL}/doctor`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(modifiedFields)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                handleLogout()
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const addQualification = (e) => {
        e.preventDefault();
        addItem('qualifications', {
            startingDate: '',
            endingDate: '',
            degree: '',
            university: ''
        });
    };

    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index);
    };

    const handleQualificationChange = (e, index) => {
        handleReusableInputChangeFunc('qualifications', index, e);
    };

    const addExperience = (e) => {
        e.preventDefault();
        addItem('experiences', {
            startingDate: '',
            endingDate: '',
            position: '',
            hospital: ''
        });
    };

    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index);
    };

    const handleExperienceChange = (e, index) => {
        handleReusableInputChangeFunc('experiences', index, e);
    };

    const addTimeSlot = (e) => {
        e.preventDefault();
        addItem('timeSlots', {
            day: '',
            startingTime: '',
            endingTime: ''
        });
    };

    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index);
    };

    const handleTimeSlotChange = (e, index) => {
        handleReusableInputChangeFunc('timeSlots', index, e);
    };


    return (
        <div>
            <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>Profile Information</h2>
            <form onSubmit={submitHandler}>
                <div className='mb-5'>
                    <p className='form__label'>Name</p>
                    <input
                        type="text"
                        name='name'
                        value={formData.name}
                        placeholder='Name'
                        onChange={handleInputChange}
                        className='form__input'
                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Email</p>
                    <input
                        placeholder={authUser?.email}
                        className='form__input'
                        disabled
                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label'>New Password</p>
                    <input
                        type="password"
                        name='passsword'
                        value={formData.password}
                        placeholder='Password'
                        onChange={handleInputChange}
                        className='form__input'
                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Phone Number</p>
                    <input
                        type="text"
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        placeholder='Phone Number'
                        onChange={handleInputChange}
                        className='form__input'
                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Bio</p>
                    <input
                        type="text"
                        name='bio'
                        value={formData.bio}
                        placeholder='Bio'
                        onChange={handleInputChange}
                        className='form__input'
                    />
                </div>
                <div className='mb-5'>
                    <div className='grid grid-cols-2 gap-5 mb-[30px]'>
                        <div>
                            <p className='form__label'>Specialization</p>
                            <select name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className='form__input py-3.5'
                            >
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                                <option value="cardiologist">Cardiologist</option>
                                <option value="orthopedist">Orthopedist</option>
                                <option value="pediatrician">Pediatrician</option>
                                <option value="psychiatrist">Psychiatrist</option>
                                <option value="radiologist">Radiologist</option>
                                <option value="anesthesiologist">Anesthesiologist</option>
                                <option value="urologist">Urologist</option>
                                <option value="endocrinologist">Endocrinologist</option>
                                <option value="gastroenterologist">Gastroenterologist</option>
                                <option value="gynecologist">Gynecologist</option>
                                <option value="oncologist">Oncologist</option>
                                <option value="ophthalmologist">Ophthalmologist</option>
                                <option value="otolaryngologist">Otolaryngologist (ENT)</option>
                                <option value="pathologist">Pathologist</option>
                                <option value="plastic_surgeon">Plastic Surgeon</option>
                                <option value="pulmonologist">Pulmonologist</option>
                                <option value="rheumatologist">Rheumatologist</option>
                                <option value="nephrologist">Nephrologist</option>
                                <option value="hematologist">Hematologist</option>
                            </select>
                        </div>
                        <div>
                            <p className='form__label'>Fees <span className='ml-5'>INR(₹)</span></p>
                            <input
                                type="Number"
                                name='fees'
                                value={formData.fees}
                                placeholder='100'
                                onChange={handleInputChange}
                                className='form__input'
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Qualifications</p>
                    {formData.qualifications?.map((item, index) =>
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form__label'>Starting Date</p>
                                    <input
                                        type="date"
                                        name='startingDate'
                                        value={item.startingDate}
                                        className='form__input'
                                        onChange={(e) => handleQualificationChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p className='form__label'>Ending Date</p>
                                    <input
                                        type="date"
                                        name='endingDate'
                                        value={item.endingDate}
                                        className='form__input'
                                        onChange={(e) => handleQualificationChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form__label'>Degree</p>
                                    <input
                                        type="text"
                                        name='degree'
                                        value={item.degree}
                                        className='form__input'
                                        onChange={(e) => handleQualificationChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p className='form__label'>University</p>
                                    <input
                                        type="text"
                                        name='university'
                                        value={item.university}
                                        className='form__input'
                                        onChange={(e) => handleQualificationChange(e, index)}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={e => deleteQualification(e, index)}
                                className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    )}
                    <button onClick={addQualification}
                        className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                        Add Qualification
                    </button>
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Experiences</p>
                    {formData.experiences?.map((item, index) =>
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form__label'>Starting Date</p>
                                    <input
                                        type="date"
                                        name='startingDate'
                                        value={item.startingDate}
                                        className='form__input'
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p className='form__label'>Ending Date</p>
                                    <input
                                        type="date"
                                        name='endingDate'
                                        value={item.endingDate}
                                        className='form__input'
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form__label'>Position</p>
                                    <input
                                        type="text"
                                        name='position'
                                        value={item.position}
                                        className='form__input'
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p className='form__label'>Hospital</p>
                                    <input
                                        type="text"
                                        name='hospital'
                                        value={item.hospital}
                                        className='form__input'
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={e => deleteExperience(e, index)}
                                className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    )}
                    <button
                        onClick={addExperience}
                        className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                        Add Experience
                    </button>
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Time Slots</p>
                    {formData.timeSlots?.map((item, index) =>
                        <div key={index}>
                            <div className='grid grid-cols-3 md:grid-cols-3 mb-[5px] gap-8'>
                                <div>
                                    <p className='form__label'>Day</p>
                                    <select
                                        name="day"
                                        value={item.day}
                                        className='form__input py-3.5'
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                    >
                                        <option value="">Select</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <p className='form__label'>Starting Time</p>
                                    <input
                                        type="time"
                                        name='startingTime'
                                        value={item.startingTime}
                                        className='form__input'
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p className='form__label'>Ending Time</p>
                                    <input
                                        type="time"
                                        name='endingTime'
                                        value={item.endingTime}
                                        className='form__input'
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                    />
                                </div>

                            </div>
                            <div className='flex items-center'>
                                <button
                                    onClick={e => deleteTimeSlot(e, index)}
                                    className='bg-red-600 p-2 rounded-full text-white text-[18px]  mb-[30px] cursor-pointer'>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={addTimeSlot}
                        className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                        Add Time Slot
                    </button>
                </div>
                <div className='mb-5'>
                    <p className='form__label'>About</p>
                    <textarea
                        type="text"
                        name='about'
                        value={formData.about}
                        placeholder='Please describe yourself...'
                        onChange={handleInputChange}
                        className='form__input'
                        rows={5}
                    />
                </div>
                <div className='mt-10 mb-5 flex items-center gap-3'>
                    {formData.photo !=='' && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                        <img src={formData.photo} alt="" className='w-full rounded-full' />
                    </figure>}
                    <div className='relative w-[130px] h-[50px]'>
                        <input
                            type="file"
                            id='customFile'
                            name='photo'
                            accept='.jpg, .png'
                            onChange={handleFileInputChange}
                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        />
                        <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                            Upload Photo
                        </label>
                    </div>
                </div>
                <div className='mt-7'>
                    <button
                        disabled={loading}
                        type='submit'
                        className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                        {loading ? <HashLoader size={35} color='#fffff' /> : 'Update'}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Settings