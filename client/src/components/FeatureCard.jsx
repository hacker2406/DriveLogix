import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center">
    <div className="text-green-500 mb-4 text-4xl">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default FeatureCard;