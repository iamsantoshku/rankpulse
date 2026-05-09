// const TestListCard = ({ test }) => {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
      
//       {/* LEFT SIDE */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800">
//           {test.title}
//         </h3>

//         <div className="flex gap-4 text-sm text-gray-600 mt-2">
//           <span>❓ {test.totalQuestions} Questions</span>
//           <span>📄 {test.totalMarks} Marks</span>
//           <span>⏱ {test.duration} Mins</span>

//           <span className="bg-gray-200 px-2 py-1 rounded text-xs">
//             {test.tag}
//           </span>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div>
//         {test.isFree ? (
//           <button className="bg-indigo-700 text-white px-6 py-2 rounded-lg">
//             Start Now
//           </button>
//         ) : (
//           <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
//             Unlock Now
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestListCard;



// import { useNavigate } from "react-router-dom";

// const TestListCard = ({ test }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
      
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800">
//           {test.title}
//         </h3>

//         <div className="flex gap-4 text-sm text-gray-600 mt-2">
//           <span>❓ {test.totalQuestions} Questions</span>
//           <span>📄 {test.totalMarks} Marks</span>
//           <span>⏱ {test.duration} Mins</span>

//           <span className="bg-gray-200 px-2 py-1 rounded text-xs">
//             {test.tag}
//           </span>
//         </div>
//       </div>

//       {/* <div>
//         {test.isFree ? (
//           <button
//             // onClick={() => navigate(`/instructions/${test._id}`)}
//             onClick={() => navigate(`/instructions/${test._id}`)}
//             className="bg-indigo-700 text-white px-6 py-2 rounded-lg"
//           >
//             Start Now
//           </button>
//         ) : (
//           // <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
//           //   Unlock Now
//           // </button>

//           {!user?.isSubscribed && (
//   <button className="bg-yellow-500 text-white px-4 py-2 rounded">
//     🔒 Premium
//   </button>
// )}
//         )}
//       </div> */}

//       <div>
//   {test.isFree ? (
//     <button
//       onClick={() => navigate(`/instructions/${test._id}`)}
//       className="bg-indigo-700 text-white px-6 py-2 rounded-lg"
//     >
//       Start Now
//     </button>
//   ) : user?.isSubscribed ? (
//     <button
//       onClick={() => navigate(`/instructions/${test._id}`)}
//       className="bg-green-600 text-white px-6 py-2 rounded-lg"
//     >
//       Start Test
//     </button>
//   ) : (
//     <button
//       onClick={() => navigate("/pricing")}
//       className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
//     >
//       🔒 Unlock Premium
//     </button>
//   )}
// </div>
//     </div>
//   );
// };

// export default TestListCard;


import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ correct import

const TestListCard = ({ test }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // ✅ FIX

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {test.title}
        </h3>

        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span>❓ {test.totalQuestions} Questions</span>
          <span>📄 {test.totalMarks} Marks</span>
          <span>⏱ {test.duration} Mins</span>

          <span className="bg-gray-200 px-2 py-1 rounded text-xs">
            {test.tag}
          </span>
        </div>
      </div>

      {/* 🔥 ACCESS CONTROL */}
      <div>
        {test.isFree ? (
          <button
            onClick={() => navigate(`/instructions/${test._id}`)}
            className="bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Start Now
          </button>
        ) : user?.isSubscribed ? (
          <button
            onClick={() => navigate(`/instructions/${test._id}`)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Start Test
          </button>
        ) : (
          <button
            onClick={() => navigate("/pricing")}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
          >
            🔒 Unlock Premium
          </button>
        )}
      </div>

    </div>
  );
};

export default TestListCard;