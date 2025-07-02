import React from "react";

const FloatingBenefit = ({ text, delay, position }) => (
  <div
    className={`absolute ${position} bg-white/90 px-4 py-2 rounded-full shadow-lg text-sm font-medium text-green-700 border border-green-200 animate-float-in opacity-0`}
    style={{ animationDelay: `${delay}s` }}
  >
    {text}
  </div>
);

export default FloatingBenefit;