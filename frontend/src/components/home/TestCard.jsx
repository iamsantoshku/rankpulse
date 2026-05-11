




// import { useNavigate } from "react-router-dom";

// const TestCard = ({ title, features, logo, examName, slug }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 w-full max-w-sm overflow-hidden">

//       {/* Top Section */}
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



import { useNavigate } from "react-router-dom";

const TestCard = ({
  title,
  logo,
  examName,
  slug,
  mockCount,
  pypCount,
  seriesCount
}) => {

  const navigate = useNavigate();

  return (

    <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden w-full max-w-sm border">

      {/* Top */}
      <div className="p-5 border-b bg-gradient-to-r from-indigo-50 to-white">

        <div className="flex items-center gap-4">

          <div className="bg-white p-2 rounded-xl shadow-sm border">

            <img
              src={
                logo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="logo"
              className="w-14 h-14 object-contain"
            />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              {examName}
            </p>

            <h3 className="text-xl font-bold text-gray-800">
              {title}
            </h3>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="p-5">

        <div className="grid grid-cols-3 gap-3 mb-5">

          {/* <div className="bg-indigo-50 rounded-xl p-3 text-center">

            <p className="text-xl font-bold text-indigo-700">
              {seriesCount}
            </p>

            <p className="text-xs text-gray-500">
              Series
            </p>

          </div> */}

          <div className="bg-green-50 rounded-xl p-3 text-center">

            <p className="text-xl font-bold text-green-700">
              {mockCount}
            </p>

            <p className="text-xs text-gray-500">
              Mock Tests
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-3 text-center">

            <p className="text-xl font-bold text-orange-700">
              {pypCount}
            </p>

            <p className="text-xs text-gray-500">
              PYP
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            onClick={() => navigate(`/exam/${slug}`)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            View Tests
          </button>

          <button
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Buy Now
          </button>

        </div>

        {/* Free Attempt */}
        <button
          className="w-full mt-3 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 py-3 rounded-xl font-semibold transition"
        >
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