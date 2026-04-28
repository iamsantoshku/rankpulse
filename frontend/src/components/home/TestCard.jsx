// const TestCard = ({ title, features, logo, examName }) => {
//   return (
//     <div className="relative bg-white rounded-2xl shadow-md p-5 pt-14 w-full max-w-sm hover:scale-105 transition duration-300">
      
//       {/* Floating Badge */}
//       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl px-6 py-3 flex flex-col items-center">
        
//         {/* LOGO */}
//         <img
//           src={
//             logo ||
//             "https://via.placeholder.com/40?text=Exam"
//           }
//           alt="exam logo"
//           className="w-10 h-10 mb-1 object-contain"
//         />

//         {/* EXAM NAME */}
//         <p className="text-xs text-gray-500 text-center">
//           {examName || "Exam"}
//         </p>

//         <p className="font-semibold text-sm">View Plans</p>
//       </div>

//       {/* TITLE */}
//       <h3 className="text-lg font-bold mt-2 text-gray-800">
//         {title}
//       </h3>

//       {/* FEATURES */}
//       <ul className="mt-3 text-sm text-gray-600 space-y-1">
//         {features?.map((f, i) => (
//           <li key={i}>• {f}</li>
//         ))}
//       </ul>

//       {/* BUTTONS */}
//       <div className="flex gap-2 mt-4">
//         <button className="flex-1 bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition">
//           View All Tests
//         </button>

//         <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
//           Buy Now
//         </button>
//       </div>

//       <button className="w-full mt-3 border border-blue-500 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition">
//         Attempt Now
//       </button>
//     </div>
//   );
// };

// export default TestCard;
// export default TestCard;


// import { useNavigate } from "react-router-dom";

// const TestCard = ({ title, features, logo, examName, slug }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative bg-white rounded-2xl shadow-md p-5 pt-14 w-full max-w-sm hover:scale-105 transition duration-300">
      
//       {/* Floating Badge */}
//       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl px-6 py-3 flex flex-col items-center">
        
//         <img
//           src={logo || "https://via.placeholder.com/40"}
//           className="w-10 h-10 mb-1 object-contain"
//         />

//         <p className="text-xs text-gray-500">{examName}</p>
//         <p className="font-semibold text-sm">View Plans</p>
//       </div>

//       <h3 className="text-lg font-bold mt-2">{title}</h3>

//       <ul className="mt-3 text-sm text-gray-600 space-y-1">
//         {features?.map((f, i) => (
//           <li key={i}>• {f}</li>
//         ))}
//       </ul>

//       <div className="flex gap-2 mt-4">
        
//         {/* 🔥 NAVIGATION HERE */}
//         <button
//           onClick={() => navigate(`/exam/${slug}`)}
//           className="flex-1 bg-indigo-700 text-white py-2 rounded-md"
//         >
//           View All Tests
//         </button>

//         <button className="flex-1 bg-blue-500 text-white py-2 rounded-md">
//           Buy Now
//         </button>
//       </div>

//       <button className="w-full mt-3 border border-blue-500 text-blue-600 py-2 rounded-md">
//         Attempt Now
//       </button>
//     </div>
//   );
// };

// export default TestCard;




import { useNavigate } from "react-router-dom";

const TestCard = ({ title, features, logo, examName, slug }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 w-full max-w-sm overflow-hidden">

      {/* Top Section */}
      <div className="flex items-center gap-4 p-4 border-b">
        <img
          src={logo || "https://via.placeholder.com/50"}
          alt="logo"
          className="w-12 h-12 object-contain rounded-md border"
        />

        <div>
          <p className="text-sm text-gray-500">{examName}</p>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </div>

      {/* Features */}
      <div className="p-4">
        <ul className="text-sm text-gray-600 space-y-1">
          {features?.map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/exam/${slug}`)}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            View Tests
          </button>

          <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Buy
          </button>
        </div>

        <button className="w-full mt-3 border border-indigo-500 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50">
          Attempt Free
        </button>
      </div>
    </div>
  );
};

export default TestCard;


// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getExamStats } from "../../services/test.service";

// const TestCard = ({ title, features, logo, examName, slug }) => {
//   const navigate = useNavigate();


// const [stats, setStats] = useState({
//   seriesCount: 0,
//   pypCount: 0
// });

// // useEffect(() => {
// //   const fetchStats = async () => {
// //     try {
// //       const res = await getExamStats(slug);

// //       if (res && res.data) {
// //         setStats(res.data);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (slug) fetchStats();
// // }, [slug]);
  
// useEffect(() => {
//   if (!slug) {
//     console.warn("❌ No slug provided to TestCard");
//     return;
//   }

//   const fetchStats = async () => {
//     try {
//       const res = await getExamStats(slug);
//       setStats(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchStats();
// }, [slug]);
//   return (
//     <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 w-full max-w-sm overflow-hidden">

//       {/* Top */}
//       <div className="flex items-center gap-4 p-4 border-b">
//         <img
//           src={logo || "https://via.placeholder.com/50"}
//           alt="logo"
//           className="w-12 h-12 object-contain rounded-md border"
//         />

//         <div>
//           <p className="text-sm text-gray-500">{examName}</p>
//           <h3 className="text-lg font-bold">{title}</h3>
//         </div>
//       </div>

//       {/* Features */}
//       <div className="p-4">

//         {/* 🔥 DYNAMIC STATS */}
//         <div className="flex justify-between text-sm text-gray-700 mb-3">
//           <span>📘 {stats.seriesCount} Test Series</span>
//           <span>📄 {stats.pypCount} PYPs</span>
//         </div>

//         <ul className="text-sm text-gray-600 space-y-1">
//           {features?.map((f, i) => (
//             <li key={i}>• {f}</li>
//           ))}
//         </ul>

//         {/* Buttons */}
//         <div className="flex gap-2 mt-4">
//           <button
//             onClick={() => navigate(`/exam/${slug}`)}
//             className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//           >
//             View Tests
//           </button>

//           <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
//             Buy
//           </button>
//         </div>

//         <button className="w-full mt-3 border border-indigo-500 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50">
//           Attempt Free
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TestCard;