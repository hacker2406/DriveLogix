
import React from 'react';


const TestimonialCard = ({ name, role, image, quote }) => (
  <div className="testimonial-card bg-white p-6 rounded-xl shadow-lg">
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 ${image} rounded-full mr-4`}></div>
      <div>
        <h4 className="font-bold text-gray-800">{name}</h4>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-600">{quote}</p>
    <div className="flex text-yellow-400 mt-3">
      ★★★★★
    </div>
  </div>
);

export default TestimonialCard;