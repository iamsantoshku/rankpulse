// import { useNavigate } from "react-router-dom";

// const ExamCard = ({ exam }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/exam/${exam.slug}`)}
//       className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl hover:scale-[1.03] transition duration-300 border"
//     >
      
//       {/* Logo */}
//       <div className="flex items-center gap-4">
//         <img
//           src={exam.logo || "https://via.placeholder.com/50"}
//           alt={exam.title}
//           className="w-12 h-12 object-contain rounded"
//         />

//         <div>
//           <h3 className="font-semibold text-lg text-gray-800">
//             {exam.title}
//           </h3>

//           {exam.isPopular && (
//             <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
//               Popular
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       <p className="text-sm text-gray-500 mt-3 line-clamp-2">
//         {exam.description || "Explore mock tests, previous papers and more."}
//       </p>

//       {/* Footer */}
//       <div className="mt-4 flex justify-between items-center">
//         <span className="text-blue-600 text-sm font-medium">
//           View Details →
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ExamCard;




// import { useNavigate } from "react-router-dom";

// const ExamCard = ({ exam }) => {
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
//         <li>• {exam.mockCount || 0} Full Mock Tests</li>
//         <li>• {exam.pypCount || 0} Previous Year Papers</li>
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

const ExamCard = ({ exam, mocks = 0, pyp = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center border">

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={exam.logo || "https://via.placeholder.com/60"}
          alt={exam.title}
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {exam.title}
      </h3>

      {/* Features */}
      <ul className="text-sm text-gray-600 mb-4 space-y-1 text-left inline-block">
        <li>• {mocks} Full Mock Tests</li>
        <li>• {pyp} Previous Year Papers</li>
      </ul>

      {/* Buttons */}
      <div className="flex justify-center gap-3 mt-3">
        <button
          onClick={() => navigate(`/exam/${exam.slug}`)}
          className="bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-800"
        >
          View All Tests
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ExamCard;