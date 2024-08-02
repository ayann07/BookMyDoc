import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful</h1>
                <p className="text-lg text-gray-700">Thank you for completing your secure online payment.</p>
            </div>
            <div className='py-4 text-center mt-10'>
                    <Link
                    to='/'
                    className='px-12 text-white font-semibold py-3 bg-blue-700'
                    >
                    Go back to home
                    </Link>
                </div>
        </div>
    );
};

export default CheckoutSuccess;
