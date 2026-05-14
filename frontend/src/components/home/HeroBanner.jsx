
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const HeroBanner = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">

//       {/* Background Image */}
//       <img
//         src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//         alt="Students preparing"
//         className="w-full h-full object-cover scale-105"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

//       {/* Content */}
//       <div className="absolute inset-0 flex items-center px-6 md:px-12">
        
//         <div className="max-w-xl text-white">

//           {/* Tagline */}
//           <p className="text-sm md:text-base text-indigo-300 font-medium mb-2">
//             RankPulse – Your Success Partner 🚀
//           </p>

//           {/* Main Heading */}
//           <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-3">
//             अगला Selection आपका
//           </h1>

//           {/* Subheading */}
//           <p className="text-sm md:text-lg text-gray-200 mb-6">
//             Practice with real exam-level mock tests, previous year papers,
//             and boost your preparation with smart analytics.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-wrap gap-3">
            
//             <button
//               onClick={() => navigate("/exams")}
//               className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-lg font-medium shadow-md transition"
//             >
//               Explore Exams
//             </button>

//             <button
//               onClick={() => navigate("/test-series")}
//               className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2.5 rounded-lg font-medium shadow-md transition"
//             >
//               Start Practice
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* Bottom Blur Glow (Premium Feel) */}
//       <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent" />
//     </div>
//   );
// };

// export default HeroBanner;


// ==============================
// src/components/home/HeroBanner.jsx
// ==============================

import React from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-[32px] min-h-[520px] md:min-h-[620px] bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900">

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
        alt="Students preparing"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-indigo-900/40" />

      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-14 py-16 md:py-24 flex flex-col justify-center h-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

          <p className="text-sm text-indigo-100 font-medium">
            Trusted by Aspirants Across India 🇮🇳
          </p>
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-white font-black leading-tight text-4xl sm:text-5xl lg:text-7xl">
          Crack Government Exams
          <span className="block text-indigo-400 mt-2">
            With Smart Practice
          </span>
        </h1>

        {/* Hindi Line */}
        <h2 className="text-xl md:text-3xl font-bold text-orange-300 mt-4">
          अगला Selection आपका 🚀
        </h2>

        {/* Description */}
        <p className="max-w-2xl text-gray-300 mt-6 text-base md:text-lg leading-relaxed">
          Practice real exam-level mock tests, previous year papers,
          daily quizzes, study notes, current affairs and advanced
          analytics — all in one platform.
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-3 mt-8">

          {[
            "5000+ Mock Tests",
            "Daily Current Affairs",
            "PYQ Collection",
            "Smart Analytics",
            "Daily Quiz",
            "Study Notes"
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white"
            >
              ✅ {item}
            </div>
          ))}

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-10">

          <button
            onClick={() => navigate("/exams")}
            className="
              bg-indigo-600 hover:bg-indigo-700
              text-white px-8 py-4 rounded-2xl
              font-semibold text-lg shadow-2xl
              transition-all duration-300 hover:scale-105
            "
          >
            Start Preparation
          </button>

          <button
            onClick={() => navigate("/daily-quiz")}
            className="
              bg-white/10 backdrop-blur-md border border-white/20
              hover:bg-white/20
              text-white px-8 py-4 rounded-2xl
              font-semibold text-lg
              transition-all duration-300
            "
          >
            Attempt Daily Quiz
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-5xl">

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <h3 className="text-3xl font-bold text-white">
              50K+
            </h3>

            <p className="text-gray-300 mt-1 text-sm">
              Students
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <h3 className="text-3xl font-bold text-white">
              10K+
            </h3>

            <p className="text-gray-300 mt-1 text-sm">
              Questions
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <h3 className="text-3xl font-bold text-white">
              500+
            </h3>

            <p className="text-gray-300 mt-1 text-sm">
              Test Series
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <h3 className="text-3xl font-bold text-white">
              99%
            </h3>

            <p className="text-gray-300 mt-1 text-sm">
              Mobile Friendly
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroBanner;