

// import { useNavigate } from "react-router-dom";

// const ExamCard = ({ exam, mocks = 0, pyp = 0 }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center border">

//       {/* Logo */}
//       <div className="flex justify-center mb-4">
//         <img
//           src={exam.logo || "https://via.placeholder.com/60"}
//           alt={exam.title}
//           className="w-14 h-14 object-contain"
//         />
//       </div>

//       {/* Title */}
//       <h3 className="text-lg font-semibold text-gray-800 mb-3">
//         {exam.title}
//       </h3>

//       {/* Features */}
//       <ul className="text-sm text-gray-600 mb-4 space-y-1 text-left inline-block">
//         <li>• {mocks} Full Mock Tests</li>
//         <li>• {pyp} Previous Year Papers</li>
//       </ul>

//       {/* Buttons */}
//       <div className="flex justify-center gap-3 mt-3">
//         <button
//           onClick={() => navigate(`/exam/${exam.slug}`)}
//           className="bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-800"
//         >
//           View All Tests
//         </button>

//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExamCard;




import { useNavigate } from "react-router-dom";
import { memo } from "react";

const ExamCard = ({ exam, mocks = 0, pyp = 0 }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        group bg-white rounded-2xl border shadow-sm 
        hover:shadow-xl transition-all duration-300
        p-5 flex flex-col justify-between
        hover:-translate-y-1
      "
    >

      {/* TOP SECTION */}
      <div className="flex flex-col items-center text-center">

        {/* LOGO */}
        <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={exam.logo || "https://via.placeholder.com/60"}
            alt={exam.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/60";
            }}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* TITLE */}
        <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
          {exam.title}
        </h3>

        {/* BADGE */}
        <span className="mt-2 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
          {exam.title.split(" ")[0]}
        </span>
      </div>

      {/* STATS */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">

        <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
          <span>Mock Tests</span>
          <span className="font-semibold text-indigo-600">
            {mocks}
          </span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
          <span>PYP Papers</span>
          <span className="font-semibold text-blue-600">
            {pyp}
          </span>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="mt-5 flex gap-2">

        <button
          onClick={() => navigate(`/exam/${exam.slug}`)}
          className="
            flex-1 bg-indigo-600 text-white text-sm py-2 rounded-lg
            hover:bg-indigo-700 transition
          "
        >
          View Tests
        </button>

        <button
          className="
            flex-1 bg-blue-500 text-white text-sm py-2 rounded-lg
            hover:bg-blue-600 transition
          "
        >
          Buy
        </button>

      </div>

    </div>
  );
};

// 🔥 Prevent unnecessary re-renders
export default memo(ExamCard);