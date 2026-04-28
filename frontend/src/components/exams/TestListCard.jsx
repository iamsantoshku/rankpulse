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



import { useNavigate } from "react-router-dom";

const TestListCard = ({ test }) => {
  const navigate = useNavigate();

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

      <div>
        {test.isFree ? (
          <button
            // onClick={() => navigate(`/instructions/${test._id}`)}
            onClick={() => navigate(`/instructions/${test._id}`)}
            className="bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Start Now
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Unlock Now
          </button>
        )}
      </div>
    </div>
  );
};

export default TestListCard;