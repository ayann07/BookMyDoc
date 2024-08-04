import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-2">Oops! Page Not Found</p>
        <p className="text-lg text-gray-500 mb-6">
          The page you're looking for doesn't exist .
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
