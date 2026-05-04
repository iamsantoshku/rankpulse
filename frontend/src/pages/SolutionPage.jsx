


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getAttemptById } from "../services/test.service";

// const SolutionPage = () => {
//   const { attemptId } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await getAttemptById(attemptId);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!data) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Solution Review
//       </h2>

//       <div className="space-y-4 max-w-4xl mx-auto">

//         {data.answers?.map((ans, i) => {
//           // 🔥 HANDLE BOTH OLD + NEW DATA
//           const q = ans.questionId || ans.question;

//           // ❌ SAFETY CHECK
//           if (!q) {
//             return (
//               <div key={i} className="bg-red-100 p-4 rounded">
//                 ⚠️ Question not found (deleted or not populated)
//               </div>
//             );
//           }

//           return (
//             <div
//               key={i}
//               className="bg-white p-5 rounded-xl shadow-md"
//             >
//               {/* QUESTION */}
//               <p className="font-semibold mb-3">
//                 Q{i + 1}. {q?.question?.en || "No question text"}
//               </p>

//               {/* OPTIONS */}
//               <div className="space-y-2">
//                 {q.options?.map((opt, idx) => {
//                   const isSelected =
//                     ans.selectedOption === idx;

//                   const isCorrect = opt.isCorrect;

//                   return (
//                     <div
//                       key={idx}
//                       className={`p-2 border rounded flex items-center gap-2
//                         ${
//                           isCorrect
//                             ? "bg-green-100 border-green-500"
//                             : isSelected
//                             ? "bg-red-100 border-red-400"
//                             : ""
//                         }
//                       `}
//                     >
//                       <span className="font-medium">
//                         {String.fromCharCode(65 + idx)}.
//                       </span>
//                       {opt.text?.en || "Option text missing"}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* RESULT */}
//               <div className="mt-3 text-sm">
//                 {ans.isCorrect ? (
//                   <span className="text-green-600 font-semibold">
//                     ✅ Correct
//                   </span>
//                 ) : (
//                   <span className="text-red-500 font-semibold">
//                     ❌ Wrong
//                   </span>
//                 )}
//               </div>

//               {/* EXPLANATION */}
//               <p className="text-sm mt-2 text-gray-600">
//                 <b>Explanation:</b>{" "}
//                 {q.explanation?.en || "No explanation"}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SolutionPage;





// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { getAttemptById } from "../services/test.service";

// const SolutionPage = () => {
//   const { attemptId } = useParams();
//   const [data, setData] = useState(null);
//   const [filter, setFilter] = useState("all");

//   const questionRefs = useRef([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await getAttemptById(attemptId);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!data) return <p className="p-6">Loading...</p>;

//   const answers = data.answers || [];

//   // 🔥 FILTER LOGIC
//   const filteredAnswers = answers.filter((ans) => {
//     if (filter === "attempted")
//       return ans.selectedOption !== undefined;
//     if (filter === "skipped")
//       return ans.selectedOption === undefined;
//     return true;
//   });

//   // 🔥 SCROLL FUNCTION
//   const scrollToQuestion = (index) => {
//     questionRefs.current[index]?.scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     });
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">

//       {/* LEFT CONTENT */}
//       <div className="w-3/4 p-6">

//         {/* 🔥 HEADER */}
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Solution Review
//         </h2>

//         {/* 🔥 FILTER BUTTONS */}
//         <div className="flex gap-3 mb-6 justify-center">
//           {["all", "attempted", "skipped"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilter(type)}
//               className={`px-4 py-2 rounded-lg capitalize ${
//                 filter === type
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {/* 🔥 QUESTIONS */}
//         <div className="space-y-4">

//           {filteredAnswers.map((ans, i) => {
//             const q = ans.questionId || ans.question;

//             if (!q) {
//               return (
//                 <div key={i} className="bg-red-100 p-4 rounded">
//                   ⚠️ Question not found
//                 </div>
//               );
//             }

//             return (
//               <div
//                 key={i}
//                 ref={(el) => (questionRefs.current[i] = el)}
//                 className="bg-white p-5 rounded-xl shadow-md"
//               >
//                 {/* QUESTION */}
//                 <p className="font-semibold mb-3">
//                   Q{i + 1}. {q.question?.en}
//                 </p>

//                 {/* OPTIONS */}
//                 <div className="space-y-2">
//                   {q.options.map((opt, idx) => {
//                     const isSelected =
//                       ans.selectedOption === idx;

//                     const isCorrect = opt.isCorrect;

//                     return (
//                       <div
//                         key={idx}
//                         className={`p-2 border rounded flex gap-2
//                           ${
//                             isCorrect
//                               ? "bg-green-100 border-green-500"
//                               : isSelected
//                               ? "bg-red-100 border-red-400"
//                               : ""
//                           }
//                         `}
//                       >
//                         <span>
//                           {String.fromCharCode(65 + idx)}.
//                         </span>
//                         {opt.text?.en}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* RESULT */}
//                 <div className="mt-3 text-sm">
//                   {ans.selectedOption === undefined ? (
//                     <span className="text-gray-500">
//                       ⚪ Not Attempted
//                     </span>
//                   ) : ans.isCorrect ? (
//                     <span className="text-green-600 font-semibold">
//                       ✅ Correct
//                     </span>
//                   ) : (
//                     <span className="text-red-500 font-semibold">
//                       ❌ Wrong
//                     </span>
//                   )}
//                 </div>

//                 {/* EXPLANATION */}
//                 <p className="text-sm mt-2 text-gray-600">
//                   <b>Explanation:</b>{" "}
//                   {q.explanation?.en || "No explanation"}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* 🔥 RIGHT PALETTE */}
//       <div className="w-1/4 bg-white p-4 border-l sticky top-0 h-screen overflow-y-auto">

//         <h3 className="font-semibold mb-4">
//           Question Palette
//         </h3>

//         <div className="grid grid-cols-5 gap-2">
//           {answers.map((ans, i) => {
//             let color = "bg-gray-300";

//             if (ans.selectedOption === undefined) {
//               color = "bg-gray-300"; // skipped
//             } else if (ans.isCorrect) {
//               color = "bg-green-500 text-white";
//             } else {
//               color = "bg-red-500 text-white";
//             }

//             return (
//               <button
//                 key={i}
//                 onClick={() => scrollToQuestion(i)}
//                 className={`w-10 h-10 rounded ${color}`}
//               >
//                 {i + 1}
//               </button>
//             );
//           })}
//         </div>

//         {/* LEGEND */}
//         <div className="mt-6 space-y-2 text-sm">
//           <p><span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>Correct</p>
//           <p><span className="inline-block w-4 h-4 bg-red-500 mr-2"></span>Wrong</p>
//           <p><span className="inline-block w-4 h-4 bg-gray-300 mr-2"></span>Skipped</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SolutionPage;



import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getAttemptById,
  getQuestionsByTest
} from "../services/test.service";

const SolutionPage = () => {
  const { attemptId } = useParams();

  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");

  const questionRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // ✅ GET ATTEMPT
      const res = await getAttemptById(attemptId);
      const attemptData = res.data;
      setAttempt(attemptData);

      // ✅ GET ALL QUESTIONS
      const qRes = await getQuestionsByTest(
        attemptData.test._id
      );

      setQuestions(qRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!attempt || questions.length === 0)
    return <p className="p-6">Loading...</p>;

  // 🔥 MAP ANSWERS FOR FAST ACCESS
  const answerMap = {};
  attempt.answers.forEach((a) => {
    const id = a.questionId?._id || a.questionId;
    answerMap[id] = a;
  });

  // 🔥 MERGE QUESTIONS + ANSWERS
  const merged = questions.map((q) => {
    const ans = answerMap[q._id];

    const selected = ans?.selectedOption;
    const correctIndex = q.options.findIndex(
      (o) => o.isCorrect
    );

    return {
      ...q,
      selectedOption: selected,
      isCorrect: selected === correctIndex
    };
  });

  // 🔥 FILTER
  const filtered = merged.filter((q) => {
    if (filter === "attempted")
      return q.selectedOption !== undefined;
    if (filter === "skipped")
      return q.selectedOption === undefined;
    return true;
  });

  const scrollToQuestion = (index) => {
    questionRefs.current[index]?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* LEFT */}
      <div className="w-3/4 p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Solution Review
        </h2>

        {/* FILTER */}
        <div className="flex gap-3 mb-6 justify-center">
          {["all", "attempted", "skipped"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* QUESTIONS */}
        <div className="space-y-4">

          {filtered.map((q, i) => (
            <div
              key={q._id}
              ref={(el) => (questionRefs.current[i] = el)}
              className="bg-white p-5 rounded-xl shadow"
            >
              {/* QUESTION */}
              <p className="font-semibold mb-3">
                Q{i + 1}. {q.question?.en}
              </p>

              {/* OPTIONS */}
              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected =
                    q.selectedOption === idx;

                  const isCorrect = opt.isCorrect;

                  return (
                    <div
                      key={idx}
                      className={`p-2 border rounded flex gap-2
                        ${
                          isCorrect
                            ? "bg-green-100 border-green-500"
                            : isSelected
                            ? "bg-red-100 border-red-400"
                            : ""
                        }
                      `}
                    >
                      <span>
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt.text?.en}
                    </div>
                  );
                })}
              </div>

              {/* STATUS */}
              <div className="mt-2 text-sm">
                {q.selectedOption === undefined ? (
                  <span className="text-gray-500">
                    ⚪ Skipped
                  </span>
                ) : q.isCorrect ? (
                  <span className="text-green-600">
                    ✅ Correct
                  </span>
                ) : (
                  <span className="text-red-500">
                    ❌ Wrong
                  </span>
                )}
              </div>

              {/* EXPLANATION */}
              <p className="text-sm mt-2 text-gray-600">
                <b>Explanation:</b>{" "}
                {q.explanation?.en || "No explanation"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PALETTE */}
      <div className="w-1/4 bg-white p-4 border-l sticky top-0 h-screen overflow-y-auto">

        <h3 className="font-semibold mb-4">
          Question Palette
        </h3>

        <div className="grid grid-cols-5 gap-2">
          {merged.map((q, i) => {
            let color = "bg-gray-300";

            if (q.selectedOption === undefined) {
              color = "bg-gray-300";
            } else if (q.isCorrect) {
              color = "bg-green-500 text-white";
            } else {
              color = "bg-red-500 text-white";
            }

            return (
              <button
                key={i}
                onClick={() => scrollToQuestion(i)}
                className={`w-10 h-10 rounded ${color}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="mt-6 space-y-2 text-sm">
          <p>
            <span className="w-4 h-4 bg-green-500 inline-block mr-2"></span>
            Correct
          </p>
          <p>
            <span className="w-4 h-4 bg-red-500 inline-block mr-2"></span>
            Wrong
          </p>
          <p>
            <span className="w-4 h-4 bg-gray-300 inline-block mr-2"></span>
            Skipped
          </p>
        </div>

      </div>
    </div>
  );
};

export default SolutionPage;