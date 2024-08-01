import React, { useState } from 'react'
import { AiFillStar } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import { BASE_URL } from '../../main';
import { useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
const FeedbackForm = () => {
    const { authToken } = useSelector(store => store.user);
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (rating===0 || reviewText==="") {
                console.log(rating,reviewText)
                setLoading(false)
                toast.error('Both rating and review fields are required')
                return
                
            }
            const response = await fetch(`${BASE_URL}/doctor/${id}/reviews`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken
                },
                body: JSON.stringify({ rating, reviewText })
            })
            const result = await response.json()
            if (!response.ok) {
                toast.error('Please login to submit a feedback.')
            }
            else {
                toast.success('review submitted successfully')
            }
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmitReview}>
            <div>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                    Please rate
                </h3>
                <div>
                    {
                        [...Array(5).keys()].map((_, index) => {
                            index += 1
                            return (
                                <button
                                    key={index}
                                    type='button'
                                    className={`${index <= ((rating && hover) || hover) ?
                                        'text-yellowColor' :
                                        'text-gray-400'} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                    onDoubleClick={() => {
                                        setHover(0)
                                        setRating(0)
                                    }}
                                >
                                    <span>
                                        <AiFillStar />
                                    </span>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mt-[30px] '>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                    Please share your feedback
                </h3>
                <textarea className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
                    rows='5'
                    placeholder='Write your messsage...'
                    onChange={e => setReviewText(e.target.value)}
                ></textarea>
            </div>
            <button
                type='submit'
                className='btn'>
                {loading ? <HashLoader size={35} color='#fffff' /> : 'Submit Feedback'}
            </button>
        </form>
    )
}

export default FeedbackForm