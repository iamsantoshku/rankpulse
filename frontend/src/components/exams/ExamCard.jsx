

import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  FileText,
  ArrowRight,
  Star,
  Trophy,
  ShieldCheck,
} from "lucide-react";

const ExamCard = ({ exam, mocks = 0, pyp = 0 }) => {
  const navigate = useNavigate();

  // ✅ SAFE NAVIGATION
  const handleNavigate = useCallback(() => {
    if (!exam?.slug) return;

    navigate(`/exam/${exam.slug}`);
  }, [navigate, exam]);

  // ✅ FALLBACK IMAGE
  const fallbackImage =
    "https://via.placeholder.com/100?text=Exam";

  return (
    <div
      className="
        group relative overflow-hidden
        bg-white border border-gray-200
        rounded-3xl shadow-sm
        hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
        flex flex-col justify-between
      "
    >

      {/* ===============================
          TOP GRADIENT
      ================================ */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />

      {/* ===============================
          POPULAR TAG
      ================================ */}
      {exam?.isPopular && (
        <div
          className="
            absolute top-4 right-4 z-20
            bg-yellow-400 text-yellow-900
            text-xs font-bold
            px-3 py-1 rounded-full
            flex items-center gap-1
            shadow
          "
        >
          <Star size={12} fill="currentColor" />
          Popular
        </div>
      )}

      {/* ===============================
          CARD CONTENT
      ================================ */}
      <div className="relative z-10 p-6 flex flex-col h-full">

        {/* ===============================
            LOGO + TITLE
        ================================ */}
        <div className="flex flex-col items-center text-center">

          {/* LOGO */}
          <div
            className="
              w-24 h-24 rounded-2xl
              bg-gradient-to-br from-gray-50 to-gray-100
              border border-gray-200
              flex items-center justify-center
              overflow-hidden shadow-sm
            "
          >
            <img
              src={exam?.logo || fallbackImage}
              alt={exam?.title || "Exam"}
              loading="lazy"
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
              className="
                w-full h-full object-contain p-3
                transition-transform duration-300
                group-hover:scale-105
              "
            />
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-5 text-lg md:text-xl
              font-bold text-gray-800
              line-clamp-2
            "
          >
            {exam?.title || "Exam"}
          </h2>

          {/* CATEGORY BADGE */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">

            <span
              className="
                px-3 py-1 rounded-full
                bg-indigo-100 text-indigo-700
                text-xs font-semibold
              "
            >
              {exam?.title?.split(" ")[0] || "Exam"}
            </span>

            <span
              className="
                px-3 py-1 rounded-full
                bg-green-100 text-green-700
                text-xs font-semibold
                flex items-center gap-1
              "
            >
              <ShieldCheck size={12} />
              Trusted
            </span>

          </div>
        </div>

        {/* ===============================
            STATS SECTION
        ================================ */}
        <div className="mt-6 grid grid-cols-2 gap-3">

          {/* MOCK TESTS */}
          <div
            className="
              bg-indigo-50 border border-indigo-100
              rounded-2xl p-4 text-center
            "
          >
            <BookOpen
              size={22}
              className="mx-auto text-indigo-600 mb-2"
            />

            <p className="text-xs text-gray-500">
              Mock Tests
            </p>

            <h3 className="text-2xl font-bold text-indigo-700 mt-1">
              {mocks}
            </h3>
          </div>

          {/* PYP */}
          <div
            className="
              bg-blue-50 border border-blue-100
              rounded-2xl p-4 text-center
            "
          >
            <FileText
              size={22}
              className="mx-auto text-blue-600 mb-2"
            />

            <p className="text-xs text-gray-500">
              PYP Papers
            </p>

            <h3 className="text-2xl font-bold text-blue-700 mt-1">
              {pyp}
            </h3>
          </div>

        </div>

        {/* ===============================
            FEATURES
        ================================ */}
        <div className="mt-5 space-y-2">

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Trophy
              size={16}
              className="text-yellow-500"
            />
            Full Length Mock Tests
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck
              size={16}
              className="text-green-500"
            />
            Real Exam Level Questions
          </div>

        </div>

        {/* ===============================
            ACTION BUTTONS
        ================================ */}
        <div className="mt-6 flex gap-3">

          {/* VIEW TESTS */}
          <button
            onClick={handleNavigate}
            className="
              flex-1 bg-indigo-600
              hover:bg-indigo-700
              text-white font-semibold
              py-3 rounded-2xl
              transition-all duration-300
              shadow-md hover:shadow-indigo-200
              flex items-center justify-center gap-2
            "
          >
            View Tests
            <ArrowRight size={18} />
          </button>

          {/* BUY */}
          <button
            className="
              flex-1 bg-gray-100
              hover:bg-gray-200
              text-gray-700 font-semibold
              py-3 rounded-2xl
              transition-all duration-300
            "
          >
            Buy Now
          </button>

        </div>

      </div>

      {/* ===============================
          BOTTOM HOVER LINE
      ================================ */}
      <div
        className="
          h-1 w-0 group-hover:w-full
          bg-gradient-to-r from-indigo-500 to-blue-500
          transition-all duration-500
        "
      />
    </div>
  );
};

// ✅ PREVENT UNNECESSARY RE-RENDER
export default memo(ExamCard);