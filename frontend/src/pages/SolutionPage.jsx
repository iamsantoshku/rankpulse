

// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import {
//   getAttemptById,
//   getQuestionsByTest
// } from "../services/test.service";

// const SolutionPage = () => {
//   const { attemptId } = useParams();

//   const [attempt, setAttempt] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [filter, setFilter] = useState("all");

//   const questionRefs = useRef([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // ✅ GET ATTEMPT
//       const res = await getAttemptById(attemptId);
//       const attemptData = res.data;
//       setAttempt(attemptData);

//       // ✅ GET ALL QUESTIONS
//       const qRes = await getQuestionsByTest(
//         attemptData.test._id
//       );

//       setQuestions(qRes.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!attempt || questions.length === 0)
//     return <p className="p-6">Loading...</p>;

//   // 🔥 MAP ANSWERS FOR FAST ACCESS
//   const answerMap = {};
//   attempt.answers.forEach((a) => {
//     const id = a.questionId?._id || a.questionId;
//     answerMap[id] = a;
//   });

//   // 🔥 MERGE QUESTIONS + ANSWERS
//   const merged = questions.map((q) => {
//     const ans = answerMap[q._id];

//     const selected = ans?.selectedOption;
//     const correctIndex = q.options.findIndex(
//       (o) => o.isCorrect
//     );

//     return {
//       ...q,
//       selectedOption: selected,
//       isCorrect: selected === correctIndex
//     };
//   });

//   // 🔥 FILTER
//   const filtered = merged.filter((q) => {
//     if (filter === "attempted")
//       return q.selectedOption !== undefined;
//     if (filter === "skipped")
//       return q.selectedOption === undefined;
//     return true;
//   });

//   const scrollToQuestion = (index) => {
//     questionRefs.current[index]?.scrollIntoView({
//       behavior: "smooth"
//     });
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">

//       {/* LEFT */}
//       <div className="w-3/4 p-6">

//         {/* HEADER */}
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Solution Review
//         </h2>

//         {/* FILTER */}
//         <div className="flex gap-3 mb-6 justify-center">
//           {["all", "attempted", "skipped"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilter(type)}
//               className={`px-4 py-2 rounded ${
//                 filter === type
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {/* QUESTIONS */}
//         <div className="space-y-4">

//           {filtered.map((q, i) => (
//             <div
//               key={q._id}
//               ref={(el) => (questionRefs.current[i] = el)}
//               className="bg-white p-5 rounded-xl shadow"
//             >
//               {/* QUESTION */}
//               <p className="font-semibold mb-3">
//                 Q{i + 1}. {q.question?.en}
//               </p>

//               {/* OPTIONS */}
//               <div className="space-y-2">
//                 {q.options.map((opt, idx) => {
//                   const isSelected =
//                     q.selectedOption === idx;

//                   const isCorrect = opt.isCorrect;

//                   return (
//                     <div
//                       key={idx}
//                       className={`p-2 border rounded flex gap-2
//                         ${
//                           isCorrect
//                             ? "bg-green-100 border-green-500"
//                             : isSelected
//                             ? "bg-red-100 border-red-400"
//                             : ""
//                         }
//                       `}
//                     >
//                       <span>
//                         {String.fromCharCode(65 + idx)}.
//                       </span>
//                       {opt.text?.en}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* STATUS */}
//               <div className="mt-2 text-sm">
//                 {q.selectedOption === undefined ? (
//                   <span className="text-gray-500">
//                     ⚪ Skipped
//                   </span>
//                 ) : q.isCorrect ? (
//                   <span className="text-green-600">
//                     ✅ Correct
//                   </span>
//                 ) : (
//                   <span className="text-red-500">
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
//           ))}
//         </div>
//       </div>

//       {/* RIGHT PALETTE */}
//       <div className="w-1/4 bg-white p-4 border-l sticky top-0 h-screen overflow-y-auto">

//         <h3 className="font-semibold mb-4">
//           Question Palette
//         </h3>

//         <div className="grid grid-cols-5 gap-2">
//           {merged.map((q, i) => {
//             let color = "bg-gray-300";

//             if (q.selectedOption === undefined) {
//               color = "bg-gray-300";
//             } else if (q.isCorrect) {
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
//           <p>
//             <span className="w-4 h-4 bg-green-500 inline-block mr-2"></span>
//             Correct
//           </p>
//           <p>
//             <span className="w-4 h-4 bg-red-500 inline-block mr-2"></span>
//             Wrong
//           </p>
//           <p>
//             <span className="w-4 h-4 bg-gray-300 inline-block mr-2"></span>
//             Skipped
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SolutionPage;




import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  getAttemptById,
  getQuestionsByTest
} from "../services/test.service";

const SolutionPage = () => {
  const { attemptId } = useParams();

  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questionRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 🔥 FETCH ATTEMPT
      const attemptRes = await getAttemptById(attemptId);

      const attemptData = attemptRes.data;

      setAttempt(attemptData);

      // 🔥 FETCH QUESTIONS
      const questionRes = await getQuestionsByTest(
        attemptData.test._id
      );

      setQuestions(questionRes.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ANSWER MAP
  const answerMap = useMemo(() => {
    const map = {};

    if (!attempt?.answers) return map;

    attempt.answers.forEach((a) => {
      const id = a.questionId?._id || a.questionId;

      map[id] = a;
    });

    return map;
  }, [attempt]);

  // 🔥 MERGED DATA
  const mergedQuestions = useMemo(() => {
    return questions.map((q) => {
      const answer = answerMap[q._id];

      const selectedOption = answer?.selectedOption;

      const correctIndex = q.options.findIndex(
        (o) => o.isCorrect
      );

      const isCorrect =
        selectedOption !== undefined &&
        selectedOption === correctIndex;

      return {
        ...q,
        selectedOption,
        correctIndex,
        isCorrect
      };
    });
  }, [questions, answerMap]);

  // 🔥 FILTERED QUESTIONS
  const filteredQuestions = useMemo(() => {
    return mergedQuestions.filter((q) => {

      if (filter === "correct") {
        return q.isCorrect;
      }

      if (filter === "wrong") {
        return (
          q.selectedOption !== undefined &&
          !q.isCorrect
        );
      }

      if (filter === "skipped") {
        return q.selectedOption === undefined;
      }

      if (filter === "attempted") {
        return q.selectedOption !== undefined;
      }

      return true;
    });
  }, [mergedQuestions, filter]);

  // 🔥 STATS
  const stats = useMemo(() => {
    const correct = mergedQuestions.filter(
      (q) => q.isCorrect
    ).length;

    const wrong = mergedQuestions.filter(
      (q) =>
        q.selectedOption !== undefined &&
        !q.isCorrect
    ).length;

    const skipped = mergedQuestions.filter(
      (q) => q.selectedOption === undefined
    ).length;

    return {
      correct,
      wrong,
      skipped,
      total: mergedQuestions.length
    };
  }, [mergedQuestions]);

  // 🔥 SCROLL
  const scrollToQuestion = (index, qid) => {
    setActiveQuestion(qid);

    questionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  // 🔥 LOADER
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load solution.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 TOP HEADER */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-6 shadow-lg">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold">
            Solution Review
          </h1>

          <p className="mt-2 text-indigo-100">
            {attempt.test?.title}
          </p>

          {/* 🔥 STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <p className="text-sm">Total Questions</p>
              <h2 className="text-2xl font-bold mt-1">
                {stats.total}
              </h2>
            </div>

            <div className="bg-green-500/20 rounded-xl p-4">
              <p className="text-sm">Correct</p>
              <h2 className="text-2xl font-bold mt-1 text-green-200">
                {stats.correct}
              </h2>
            </div>

            <div className="bg-red-500/20 rounded-xl p-4">
              <p className="text-sm">Wrong</p>
              <h2 className="text-2xl font-bold mt-1 text-red-200">
                {stats.wrong}
              </h2>
            </div>

            <div className="bg-yellow-500/20 rounded-xl p-4">
              <p className="text-sm">Skipped</p>
              <h2 className="text-2xl font-bold mt-1 text-yellow-200">
                {stats.skipped}
              </h2>
            </div>

          </div>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6">

        {/* ========================================= */}
        {/* LEFT SECTION */}
        {/* ========================================= */}

        <div className="flex-1">

          {/* 🔥 FILTERS */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 sticky top-3 z-20">

            <div className="flex flex-wrap gap-3">

              {[
                "all",
                "correct",
                "wrong",
                "skipped",
                "attempted"
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition
                  
                  ${
                    filter === item
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200"
                  }
                  
                  `}
                >
                  {item.toUpperCase()}
                </button>
              ))}

            </div>
          </div>

          {/* 🔥 QUESTIONS */}
          <div className="space-y-6">

            {filteredQuestions.map((q, index) => {

              const originalIndex = mergedQuestions.findIndex(
                (item) => item._id === q._id
              );

              return (
                <div
                  key={q._id}
                  ref={(el) =>
                    (questionRefs.current[originalIndex] = el)
                  }
                  className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition
                  
                  ${
                    activeQuestion === q._id
                      ? "ring-2 ring-indigo-500"
                      : ""
                  }
                  
                  `}
                >

                  {/* HEADER */}
                  <div className="flex justify-between items-center bg-gray-50 border-b px-5 py-4">

                    <h2 className="font-bold text-lg">
                      Question {originalIndex + 1}
                    </h2>

                    {q.selectedOption === undefined ? (
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        SKIPPED
                      </span>
                    ) : q.isCorrect ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        CORRECT
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        WRONG
                      </span>
                    )}

                  </div>

                  {/* BODY */}
                  <div className="p-5">

                    {/* QUESTION */}
                    <div className="text-gray-800 font-medium text-lg leading-relaxed mb-6">
                      {q.question?.en}
                    </div>

                    {/* OPTIONS */}
                    <div className="space-y-3">

                      {q.options.map((opt, idx) => {

                        const isSelected =
                          q.selectedOption === idx;

                        const isCorrect =
                          q.correctIndex === idx;

                        return (
                          <div
                            key={idx}
                            className={`border rounded-xl p-4 flex items-start gap-3 transition

                            ${
                              isCorrect
                                ? "bg-green-50 border-green-500"
                                : isSelected
                                ? "bg-red-50 border-red-400"
                                : "bg-white"
                            }

                            `}
                          >

                            {/* OPTION LABEL */}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0

                              ${
                                isCorrect
                                  ? "bg-green-500 text-white"
                                  : isSelected
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-200"
                              }

                              `}
                            >
                              {String.fromCharCode(65 + idx)}
                            </div>

                            {/* TEXT */}
                            <div className="flex-1">

                              <p className="text-gray-800">
                                {opt.text?.en}
                              </p>

                              {/* BADGES */}
                              <div className="flex gap-2 mt-2 flex-wrap">

                                {isCorrect && (
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                    Correct Answer
                                  </span>
                                )}

                                {isSelected && !isCorrect && (
                                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                    Your Answer
                                  </span>
                                )}

                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </div>

                    {/* EXPLANATION */}
                    <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4">

                      <h3 className="font-semibold text-indigo-700 mb-2">
                        Explanation
                      </h3>

                      <p className="text-gray-700 leading-relaxed">
                        {q.explanation?.en ||
                          "No explanation available"}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* ========================================= */}
        {/* RIGHT PALETTE */}
        {/* ========================================= */}

        <div className="lg:w-80">

          <div className="bg-white rounded-2xl shadow-sm sticky top-4 p-5">

            <h2 className="text-xl font-bold mb-5">
              Question Palette
            </h2>

            {/* 🔥 GRID */}
            <div className="grid grid-cols-5 gap-3">

              {mergedQuestions.map((q, index) => {

                let style =
                  "bg-gray-300 text-black";

                if (q.selectedOption === undefined) {
                  style =
                    "bg-gray-300 text-black";
                } else if (q.isCorrect) {
                  style =
                    "bg-green-500 text-white";
                } else {
                  style =
                    "bg-red-500 text-white";
                }

                return (
                  <button
                    key={q._id}
                    onClick={() =>
                      scrollToQuestion(index, q._id)
                    }
                    className={`w-11 h-11 rounded-xl font-semibold transition hover:scale-105
                    ${style}
                    ${
                      activeQuestion === q._id
                        ? "ring-4 ring-indigo-300"
                        : ""
                    }
                    `}
                  >
                    {index + 1}
                  </button>
                );
              })}

            </div>

            {/* 🔥 LEGEND */}
            <div className="mt-8 space-y-3 text-sm">

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-green-500"></div>
                <span>Correct Answered</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-red-500"></div>
                <span>Wrong Answered</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-gray-300"></div>
                <span>Skipped</span>
              </div>

            </div>

            {/* 🔥 QUICK SUMMARY */}
            <div className="mt-8 border-t pt-5">

              <h3 className="font-semibold mb-4">
                Quick Summary
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">
                    {stats.total}
                  </span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Correct</span>
                  <span className="font-semibold">
                    {stats.correct}
                  </span>
                </div>

                <div className="flex justify-between text-red-500">
                  <span>Wrong</span>
                  <span className="font-semibold">
                    {stats.wrong}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Skipped</span>
                  <span className="font-semibold">
                    {stats.skipped}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;