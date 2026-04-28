
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="Students preparing"
        className="w-full h-full object-cover scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-6 md:px-12">
        
        <div className="max-w-xl text-white">

          {/* Tagline */}
          <p className="text-sm md:text-base text-indigo-300 font-medium mb-2">
            RankPulse – Your Success Partner 🚀
          </p>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-3">
            अगला Selection आपका
          </h1>

          {/* Subheading */}
          <p className="text-sm md:text-lg text-gray-200 mb-6">
            Practice with real exam-level mock tests, previous year papers,
            and boost your preparation with smart analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            
            <button
              onClick={() => navigate("/exams")}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-lg font-medium shadow-md transition"
            >
              Explore Exams
            </button>

            <button
              onClick={() => navigate("/test-series")}
              className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2.5 rounded-lg font-medium shadow-md transition"
            >
              Start Practice
            </button>

          </div>

        </div>

      </div>

      {/* Bottom Blur Glow (Premium Feel) */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};

export default HeroBanner;