import React, { useState } from 'react'
import { BASE_URL } from '../main'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
const Contact = () => {
  let [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [receivedData, setReceivedData] = useState()
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const result = await res.json()
      console.log(result)
      if (!res.ok) {
        toast.error(result.message)
      }
      setReceivedData(result.ref_no)
      console.log(receivedData)
    }
    catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <section>
      {loading && <Loading />}
      {receivedData && <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-md text-center">
          <h1 className="text-2xl font-bold  mb-4">Issue submitted successfully. Your reference number is <span className='text-green-600'>{receivedData}</span> </h1>
          <p className="text-lg text-gray-700">Our Team will contact you within 48 hrs.</p>
        </div>
        <div className='py-4 text-center mt-10'>
          <Link
            to='/'
            className='px-12 text-white font-semibold py-3 bg-blue-700'
          >
            Go back to home
          </Link>
        </div>
      </div>}
      {!receivedData && !loading && <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
          Got a technical issue? Let us know.
        </p>
        <form onSubmit={submitHandler} className='space-y-8'>
          <div>
            <label
              htmlFor="name"
              className='form__label'>
              Your Name
            </label>
            <input
              type="name"
              placeholder='Enter your name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='form__input mt-1'
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className='form__label'>
              Your Email
            </label>
            <input
              type="email"
              placeholder='Enter your email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='form__input mt-1'
              required
            />
          </div>
          <div >
            <label
              htmlFor="subject"
              className='form__label'>
              Subject
            </label>
            <input
              type="text"
              name='subject'
              value={formData.subject}
              onChange={handleInputChange}
              placeholder='Let us know how we can help you'
              className='form__input mt-1'
              required
            />
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor="message"
              className='form__label'>
              Your Message
            </label>
            <textarea
              rows={6}
              type="text"
              name='message'
              placeholder='Enter your message...'
              value={formData.message}
              onChange={handleInputChange}
              className='form__input mt-1'
              required
            />
          </div>
          <button
            type='submit'
            className='btn rounded sm:w-fit'
          >Submit</button>
        </form>
      </div>}
    </section>
  )
}

export default Contact