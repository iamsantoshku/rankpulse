


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import {
//   getQuestionsByTest,
//   getTestById,
//   submitTest
// } from "../services/test.service";

// const TestEngine = () => {
//   const { testId } = useParams();

//   const [questions, setQuestions] = useState([]);
//   const [test, setTest] = useState(null);

//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [marked, setMarked] = useState({});

//   const navigate = useNavigate();

//   // ✅ FETCH QUESTIONS + TEST
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const qRes = await getQuestionsByTest(testId);
//         const tRes = await getTestById(testId);

//         setQuestions(qRes.data);
//         setTest(tRes.data);

//         // 🔥 SET TIMER FROM DB (minutes → seconds)
//         setTimeLeft(tRes.data.duration * 60);

//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, [testId]);

//   // 🔥 FETCH QUESTIONS
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await getQuestionsByTest(testId);
//       setQuestions(res.data);
//     };
//     fetchQuestions();
//   }, [testId]);

//   // 🔥 SAVE STATE
//   useEffect(() => {
//     localStorage.setItem(
//       `test-${testId}`,
//       JSON.stringify({ answers, marked, timeLeft, current })
//     );
//   }, [answers, marked, timeLeft, current]);

//   // 🔥 TIMER


// useEffect(() => {
//   if (!timeLeft) return;

//   const timer = setInterval(() => {
//     setTimeLeft((prev) => {
//       if (prev <= 1) {
//         clearInterval(timer);
//         handleSubmit();
//         return 0;
//       }
//       return prev - 1;
//     });
//   }, 1000);

//   return () => clearInterval(timer);
// }, []);



// const formatTime = () => {
//   const hr = Math.floor(timeLeft / 3600);
//   const min = Math.floor((timeLeft % 3600) / 60);
//   const sec = timeLeft % 60;

//   return `${hr > 0 ? hr + ":" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
// };

//   // ✅ ANSWER SELECT
//   const handleAnswer = (qid, index) => {
//     setAnswers({ ...answers, [qid]: index });
//   };

//   // ✅ MARK FOR REVIEW
//   const toggleMark = (qid) => {
//     setMarked({ ...marked, [qid]: !marked[qid] });
//   };

//   // NAV
//   const handleNext = () => {
//     if (current < questions.length - 1) setCurrent(current + 1);
//   };

//   const handlePrev = () => {
//     if (current > 0) setCurrent(current - 1);
//   };

//   // ✅ RESULT CALCULATION
//   const calculateResult = () => {
//     let score = 0;
//     let correct = 0;
//     let wrong = 0;

//     questions.forEach((q) => {
//       const selected = answers[q._id];
//       const correctIndex = q.options.findIndex((o) => o.isCorrect);

//       if (selected === correctIndex) {
//         score += q.marks;
//         correct++;
//       } else if (selected !== undefined) {
//         score -= q.negativeMarks;
//         wrong++;
//       }
//     });

//     return { score, correct, wrong };
//   };

//   // ✅ SUBMIT


// const handleSubmit = async () => {
//   try {
//     const res = await submitTest({
//       testId,
//       answers,
//       timeTaken: (test.duration * 60) - timeLeft
//     });

//     navigate(`/result/${res.data.attemptId}`);

//   } catch (err) {
//     console.error(err);
//   }
// };

//   const q = questions[current];
//   if (!q) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">

//       {/* LEFT */}
//       <div className="md:w-3/4 w-full p-4 flex flex-col">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-3">
//           <h2 className="font-semibold text-sm md:text-lg">
//             Q {current + 1}/{questions.length}
//           </h2>

//           <div className="bg-black text-white px-3 py-1 rounded text-sm">
//             ⏱ {formatTime()}
//           </div>
//         </div>

//         {/* QUESTION */}
//         <div className="bg-white p-4 rounded shadow mb-3">
//           <p className="font-medium mb-3">{q.question?.en}</p>

//           <div className="space-y-2">
//             {q.options.map((opt, i) => (
//               <label
//                 key={opt._id}
//                 className={`block border p-2 rounded cursor-pointer ${
//                   answers[q._id] === i
//                     ? "bg-blue-100 border-blue-500"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   checked={answers[q._id] === i}
//                   onChange={() => handleAnswer(q._id, i)}
//                 />
//                 <span className="ml-2">{opt.text?.en}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-wrap gap-2 justify-between mt-auto">

//           <button
//             onClick={handlePrev}
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//           >
//             Prev
//           </button>

//           <button
//             onClick={() => toggleMark(q._id)}
//             className={`px-4 py-2 rounded ${
//               marked[q._id] ? "bg-yellow-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             ⭐ Mark
//           </button>

//           <button
//             onClick={handleNext}
//             className="bg-indigo-600 text-white px-4 py-2 rounded"
//           >
//             Save & Next
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="md:w-1/4 w-full bg-white p-4 border-t md:border-l overflow-y-auto">

//         <h3 className="font-semibold mb-3">Palette</h3>

//         <div className="grid grid-cols-5 gap-2">
//           {questions.map((item, i) => {
//             const isAnswered = answers[item._id] !== undefined;
//             const isMarked = marked[item._id];

//             return (
//               <button
//                 key={item._id}
//                 onClick={() => setCurrent(i)}
//                 className={`w-10 h-10 rounded text-sm
//                   ${isAnswered ? "bg-green-500 text-white" : "bg-gray-300"}
//                   ${isMarked ? "border-2 border-yellow-500" : ""}
//                   ${current === i ? "ring-2 ring-black" : ""}
//                 `}
//               >
//                 {i + 1}
//               </button>
//             );
//           })}
//         </div>

//         {/* LEGEND */}
//         <div className="mt-4 text-xs space-y-1">
//           <p><span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>Answered</p>
//           <p><span className="inline-block w-3 h-3 bg-gray-300 mr-2"></span>Not Answered</p>
//           <p><span className="inline-block w-3 h-3 border-2 border-yellow-500 mr-2"></span>Marked</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestEngine;






// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import {
//   getQuestionsByTest,
//   getTestById,
//   submitTest
// } from "../services/test.service";

// const TestEngine = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();

//   const [questions, setQuestions] = useState([]);
//   const [test, setTest] = useState(null);

//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [marked, setMarked] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // 🔥 FETCH DATA + RESUME
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [qRes, tRes] = await Promise.all([
//           getQuestionsByTest(testId),
//           getTestById(testId)
//         ]);

//         const qData = qRes.data || [];
//         const tData = tRes.data;

//         setQuestions(qData);
//         setTest(tData);

//         // 🔥 RESUME FROM LOCAL STORAGE
//         const saved = localStorage.getItem(`test-${testId}`);

//         if (saved) {
//           const parsed = JSON.parse(saved);
//           setAnswers(parsed.answers || {});
//           setMarked(parsed.marked || {});
//           setCurrent(parsed.current || 0);
//           setTimeLeft(parsed.timeLeft || tData.duration * 60);
//         } else {
//           setTimeLeft(tData.duration * 60);
//         }

//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [testId]);

//   // 🔥 TIMER (FIXED)
//   useEffect(() => {
//     if (!timeLeft || !test) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit(); // auto submit
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, test]);

//   // 🔥 SAVE STATE
//   useEffect(() => {
//     localStorage.setItem(
//       `test-${testId}`,
//       JSON.stringify({ answers, marked, timeLeft, current })
//     );
//   }, [answers, marked, timeLeft, current, testId]);

//   // 🔥 FORMAT TIME
//   const formatTime = () => {
//     const hr = Math.floor(timeLeft / 3600);
//     const min = Math.floor((timeLeft % 3600) / 60);
//     const sec = timeLeft % 60;

//     return `${hr > 0 ? hr + ":" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
//   };

//   // ANSWER
//   const handleAnswer = (qid, index) => {
//     setAnswers((prev) => ({ ...prev, [qid]: index }));
//   };

//   // MARK
//   const toggleMark = (qid) => {
//     setMarked((prev) => ({ ...prev, [qid]: !prev[qid] }));
//   };

//   // NAV
//   const handleNext = () => {
//     if (current < questions.length - 1) setCurrent(current + 1);
//   };

//   const handlePrev = () => {
//     if (current > 0) setCurrent(current - 1);
//   };

//   // SUBMIT
//   const handleSubmit = async () => {
//     try {
//       if (!test) return;

//       const res = await submitTest({
//         testId,
//         answers,
//         timeTaken: (test.duration * 60) - timeLeft
//       });

//       localStorage.removeItem(`test-${testId}`);

//       navigate(`/result/${res.data.attemptId}`);

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // LOADING
//   if (loading) return <p className="p-6">Loading test...</p>;

//   const q = questions[current];
//   if (!q) return <p className="p-6">No questions found</p>;

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">

//       {/* LEFT */}
//       <div className="md:w-3/4 w-full p-4 flex flex-col">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-3">
//           <h2 className="font-semibold text-sm md:text-lg">
//             Q {current + 1}/{questions.length}
//           </h2>

//           <div className="bg-black text-white px-3 py-1 rounded text-sm">
//             ⏱ {formatTime()}
//           </div>
//         </div>

//         {/* QUESTION */}
//         <div className="bg-white p-4 rounded shadow mb-3">
//           <p className="font-medium mb-3">{q.question?.en}</p>

//           <div className="space-y-2">
//             {q.options.map((opt, i) => (
//               <label
//                 key={opt._id}
//                 className={`block border p-2 rounded cursor-pointer ${
//                   answers[q._id] === i
//                     ? "bg-blue-100 border-blue-500"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   checked={answers[q._id] === i}
//                   onChange={() => handleAnswer(q._id, i)}
//                 />
//                 <span className="ml-2">{opt.text?.en}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-wrap gap-2 justify-between mt-auto">

//           <button
//             onClick={handlePrev}
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//           >
//             Prev
//           </button>

//           <button
//             onClick={() => toggleMark(q._id)}
//             className={`px-4 py-2 rounded ${
//               marked[q._id] ? "bg-yellow-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             ⭐ Mark
//           </button>

//           <button
//             onClick={handleNext}
//             className="bg-indigo-600 text-white px-4 py-2 rounded"
//           >
//             Save & Next
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="md:w-1/4 w-full bg-white p-4 border-t md:border-l overflow-y-auto">

//         <h3 className="font-semibold mb-3">Palette</h3>

//         <div className="grid grid-cols-5 gap-2">
//           {questions.map((item, i) => {
//             const isAnswered = answers[item._id] !== undefined;
//             const isMarked = marked[item._id];

//             return (
//               <button
//                 key={item._id}
//                 onClick={() => setCurrent(i)}
//                 className={`w-10 h-10 rounded text-sm
//                   ${isAnswered ? "bg-green-500 text-white" : "bg-gray-300"}
//                   ${isMarked ? "border-2 border-yellow-500" : ""}
//                   ${current === i ? "ring-2 ring-black" : ""}
//                 `}
//               >
//                 {i + 1}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestEngine;




// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getQuestionsByTest,
//   getTestById,
//   submitTest
// } from "../services/test.service";

// const TestEngine = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();

//   const [questions, setQuestions] = useState([]);
//   const [test, setTest] = useState(null);

//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [marked, setMarked] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);

//   const [loading, setLoading] = useState(true);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [filter, setFilter] = useState("all");

//   const [tabSwitchCount, setTabSwitchCount] = useState(0);

//   // 🔥 FETCH + RESUME
//   useEffect(() => {
//     const fetchData = async () => {
//       const [qRes, tRes] = await Promise.all([
//         getQuestionsByTest(testId),
//         getTestById(testId)
//       ]);

//       setQuestions(qRes.data || []);
//       setTest(tRes.data);

//       const saved = localStorage.getItem(`test-${testId}`);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         setAnswers(parsed.answers || {});
//         setMarked(parsed.marked || {});
//         setCurrent(parsed.current || 0);
//         setTimeLeft(parsed.timeLeft || tRes.data.duration * 60);
//       } else {
//         setTimeLeft(tRes.data.duration * 60);
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [testId]);

//   // 🔥 TIMER
//   useEffect(() => {
//     if (!timeLeft || !test) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, test]);

//   // 🔥 SAVE STATE
//   useEffect(() => {
//     localStorage.setItem(
//       `test-${testId}`,
//       JSON.stringify({ answers, marked, timeLeft, current })
//     );
//   }, [answers, marked, timeLeft, current, testId]);

//   // 🔥 FULLSCREEN MODE
//   useEffect(() => {
//     const enterFullscreen = () => {
//       if (document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//       }
//     };
//     enterFullscreen();
//   }, []);

//   // 🔥 TAB SWITCH DETECTION
//   useEffect(() => {
//     const handleVisibility = () => {
//       if (document.hidden) {
//         setTabSwitchCount((prev) => prev + 1);
//         alert("⚠️ Do not switch tabs during the test!");
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibility);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibility);
//   }, []);

//   // 🔥 FORMAT TIME
//   const formatTime = () => {
//     const min = Math.floor(timeLeft / 60);
//     const sec = timeLeft % 60;
//     return `${min}:${sec < 10 ? "0" : ""}${sec}`;
//   };

//   // ANSWER
//   const handleAnswer = (qid, index) => {
//     setAnswers((prev) => ({ ...prev, [qid]: index }));
//   };

//   const toggleMark = (qid) => {
//     setMarked((prev) => ({ ...prev, [qid]: !prev[qid] }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await submitTest({
//         testId,
//         answers,
//         timeTaken: (test.duration * 60) - timeLeft,
//         tabSwitchCount
//       });

//       localStorage.removeItem(`test-${testId}`);
//       navigate(`/result/${res.data.attemptId}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔥 FILTER LOGIC
//   const filteredQuestions = questions.filter((q, i) => {
//     if (filter === "answered") return answers[q._id] !== undefined;
//     if (filter === "unanswered") return answers[q._id] === undefined;
//     if (filter === "marked") return marked[q._id];
//     return true;
//   });

//   if (loading) return <p className="p-6">Loading...</p>;

//   const q = questions[current];

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">

//       {/* LEFT */}
//       <div className="md:w-3/4 p-4 flex flex-col">

//         {/* HEADER */}
//         <div className="flex justify-between mb-4">
//           <h2 className="font-semibold">
//             Q {current + 1}/{questions.length}
//           </h2>
//           <div className="bg-black text-white px-3 py-1 rounded">
//             ⏱ {formatTime()}
//           </div>
//         </div>

//         {/* QUESTION */}
//         <div className="bg-white p-5 rounded-xl shadow-md transition-all">
//           <p className="mb-4 font-medium">{q?.question?.en}</p>

//           {q?.options.map((opt, i) => (
//             <label
//               key={opt._id}
//               className={`block border p-3 rounded mb-2 cursor-pointer transition
//                 ${answers[q._id] === i ? "bg-indigo-100 border-indigo-500" : "hover:bg-gray-50"}
//               `}
//             >
//               <input
//                 type="radio"
//                 checked={answers[q._id] === i}
//                 onChange={() => handleAnswer(q._id, i)}
//               />
//               <span className="ml-2">{opt.text?.en}</span>
//             </label>
//           ))}
//         </div>

//         {/* ACTIONS */}
//         <div className="flex gap-2 mt-4 flex-wrap">
//           <button onClick={() => setCurrent((c) => c - 1)} className="btn-gray">Prev</button>
//           <button onClick={() => toggleMark(q._id)} className="btn-yellow">Mark</button>
//           <button onClick={() => setCurrent((c) => c + 1)} className="btn-indigo">Next</button>
//           <button onClick={() => setShowSubmitModal(true)} className="btn-green">Submit</button>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="md:w-1/4 bg-white p-4 border-l">

//         {/* FILTERS */}
//         <div className="flex gap-2 mb-4">
//           {["all", "answered", "unanswered", "marked"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-2 py-1 text-xs rounded ${
//                 filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {/* PALETTE */}
//         <div className="grid grid-cols-5 gap-2">
//           {filteredQuestions.map((item, i) => {
//             const index = questions.findIndex(q => q._id === item._id);
//             return (
//               <button
//                 key={item._id}
//                 onClick={() => setCurrent(index)}
//                 className={`w-10 h-10 rounded
//                   ${answers[item._id] ? "bg-green-500 text-white" : "bg-gray-300"}
//                   ${marked[item._id] ? "border-2 border-yellow-500" : ""}
//                 `}
//               >
//                 {index + 1}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* SUBMIT MODAL */}
//       {showSubmitModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl shadow-lg">
//             <h3 className="font-bold mb-2">Submit Test?</h3>
//             <p className="text-sm mb-4">Are you sure you want to submit?</p>

//             <div className="flex gap-2">
//               <button onClick={handleSubmit} className="btn-green">Yes</button>
//               <button onClick={() => setShowSubmitModal(false)} className="btn-gray">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default TestEngine;




// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getQuestionsByTest,
//   getTestById,
//   submitTest
// } from "../services/test.service";

// const TestEngine = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();

//   const [questions, setQuestions] = useState([]);
//   const [test, setTest] = useState(null);

//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [marked, setMarked] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);

//   const [loading, setLoading] = useState(true);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [filter, setFilter] = useState("all");

//   const [violations, setViolations] = useState({
//     tabSwitch: 0,
//     blur: 0,
//     copy: 0,
//     rightClick: 0
//   });

//   // 🔥 FETCH + RESUME
//   useEffect(() => {
//     const fetchData = async () => {
//       const [qRes, tRes] = await Promise.all([
//         getQuestionsByTest(testId),
//         getTestById(testId)
//       ]);

//       setQuestions(qRes.data || []);
//       setTest(tRes.data);

//       const saved = localStorage.getItem(`test-${testId}`);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         setAnswers(parsed.answers || {});
//         setMarked(parsed.marked || {});
//         setCurrent(parsed.current || 0);
//         setTimeLeft(parsed.timeLeft || tRes.data.duration * 60);
//       } else {
//         setTimeLeft(tRes.data.duration * 60);
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [testId]);

//   // 🔥 FULLSCREEN ONLY IN TEST
//   useEffect(() => {
//     const enterFullscreen = () => {
//       if (document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//       }
//     };

//     enterFullscreen();

//     return () => {
//       if (document.fullscreenElement) {
//         document.exitFullscreen();
//       }
//     };
//   }, []);

//   // 🔒 DISABLE COPY / RIGHT CLICK
//   useEffect(() => {
//     const disableCopy = (e) => {
//       e.preventDefault();
//       setViolations(v => ({ ...v, copy: v.copy + 1 }));
//     };

//     const disableRightClick = (e) => {
//       e.preventDefault();
//       setViolations(v => ({ ...v, rightClick: v.rightClick + 1 }));
//     };

//     document.addEventListener("copy", disableCopy);
//     document.addEventListener("contextmenu", disableRightClick);

//     return () => {
//       document.removeEventListener("copy", disableCopy);
//       document.removeEventListener("contextmenu", disableRightClick);
//     };
//   }, []);

//   // 🔥 TAB SWITCH + BLUR DETECTION
//   useEffect(() => {
//     const handleVisibility = () => {
//       if (document.hidden) {
//         setViolations(v => ({ ...v, tabSwitch: v.tabSwitch + 1 }));
//         alert("⚠️ Tab switching detected!");
//       }
//     };

//     const handleBlur = () => {
//       setViolations(v => ({ ...v, blur: v.blur + 1 }));
//     };

//     document.addEventListener("visibilitychange", handleVisibility);
//     window.addEventListener("blur", handleBlur);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibility);
//       window.removeEventListener("blur", handleBlur);
//     };
//   }, []);

//   // 🔥 TIMER
//   useEffect(() => {
//     if (!timeLeft || !test) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, test]);

//   // SAVE STATE
//   useEffect(() => {
//     localStorage.setItem(
//       `test-${testId}`,
//       JSON.stringify({ answers, marked, timeLeft, current })
//     );
//   }, [answers, marked, timeLeft, current]);

//   const handleAnswer = (qid, index) => {
//     setAnswers(prev => ({ ...prev, [qid]: index }));
//   };

//   const handleSaveNext = () => {
//     if (current < questions.length - 1) {
//       setCurrent(prev => prev + 1);
//     }
//   };

//   const handleSubmit = async () => {
//     const res = await submitTest({
//       testId,
//       answers,
//       timeTaken: (test.duration * 60) - timeLeft,
//       violations
//     });

//     localStorage.removeItem(`test-${testId}`);
//     navigate(`/result/${res.data.attemptId}`);
//   };

//   const formatTime = () => {
//     const m = Math.floor(timeLeft / 60);
//     const s = timeLeft % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//     const filteredQuestions = questions.filter((q, i) => {
//     if (filter === "answered") return answers[q._id] !== undefined;
//     if (filter === "unanswered") return answers[q._id] === undefined;
//     if (filter === "marked") return marked[q._id];
//     return true;
//   });

//   if (loading) return <p className="p-6">Loading...</p>;

//   const q = questions[current];

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">

//       {/* HEADER */}
//       <div className="flex justify-between p-4 bg-white shadow">
//         <h2>Q {current + 1}/{questions.length}</h2>
//         <div className="bg-black text-white px-3 py-1 rounded">
//           ⏱ {formatTime()}
//         </div>
//       </div>

//       {/* QUESTION */}
//       <div className="flex-1 overflow-y-auto p-4">
//         <div className="bg-white p-5 rounded shadow">
//           <p className="mb-4">{q?.question?.en}</p>

//           {q.options.map((opt, i) => (
//             <label
//               key={opt._id}
//               className={`block border p-3 mb-2 rounded cursor-pointer
//                 ${answers[q._id] === i ? "bg-indigo-100 border-indigo-500" : ""}
//               `}
//             >
//               <input
//                 type="radio"
//                 checked={answers[q._id] === i}
//                 onChange={() => handleAnswer(q._id, i)}
//               />
//               <span className="ml-2">{opt.text?.en}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* 🔥 BOTTOM ACTION BAR */}
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between">

//         <button
//           onClick={() => setCurrent(c => Math.max(0, c - 1))}
//           className="bg-gray-400 text-white px-4 py-2 rounded"
//         >
//           Prev
//         </button>

//         <button
//           onClick={handleSaveNext}
//           className="bg-indigo-600 text-white px-6 py-2 rounded"
//         >
//           Save & Next
//         </button>

//         <button
//           onClick={() => setShowSubmitModal(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </div>


//          <div className="grid grid-cols-5 gap-2">
//           {filteredQuestions.map((item, i) => {
//             const index = questions.findIndex(q => q._id === item._id);
//             return (
//               <button
//                 key={item._id}
//                 onClick={() => setCurrent(index)}
//                 className={`w-10 h-10 rounded
//                   ${answers[item._id] ? "bg-green-500 text-white" : "bg-gray-300"}
//                   ${marked[item._id] ? "border-2 border-yellow-500" : ""}
//                 `}
//               >
//                 {index + 1}
//               </button>
//             );
//           })}
//         </div>

//       {/* MODAL */}
//       {showSubmitModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded">
//             <h3 className="mb-4 font-bold">Submit Test?</h3>
//             <div className="flex gap-3">
//               <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
//                 Yes
//               </button>
//               <button onClick={() => setShowSubmitModal(false)} className="bg-gray-400 px-4 py-2 rounded">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default TestEngine;




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getQuestionsByTest,
  getTestById,
  submitTest
} from "../services/test.service";

const TestEngine = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filter, setFilter] = useState("all");

  const [violations, setViolations] = useState({
    tabSwitch: 0,
    blur: 0,
    copy: 0,
    rightClick: 0
  });

  // 🔥 FETCH
  useEffect(() => {
    const fetchData = async () => {
      const [qRes, tRes] = await Promise.all([
        getQuestionsByTest(testId),
        getTestById(testId)
      ]);

      setQuestions(qRes.data || []);
      setTest(tRes.data);

      const saved = localStorage.getItem(`test-${testId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setMarked(parsed.marked || {});
        setCurrent(parsed.current || 0);
        setTimeLeft(parsed.timeLeft || tRes.data.duration * 60);
      } else {
        setTimeLeft(tRes.data.duration * 60);
      }

      setLoading(false);
    };

    fetchData();
  }, [testId]);

  // 🔥 FULLSCREEN ONLY HERE
  useEffect(() => {
    document.documentElement.requestFullscreen?.();

    return () => {
      document.exitFullscreen?.();
    };
  }, []);

  // 🔒 ANTI-CHEAT
  useEffect(() => {
    const blockCopy = (e) => {
      e.preventDefault();
      setViolations(v => ({ ...v, copy: v.copy + 1 }));
    };

    const blockRightClick = (e) => {
      e.preventDefault();
      setViolations(v => ({ ...v, rightClick: v.rightClick + 1 }));
    };

    const handleVisibility = () => {
      if (document.hidden) {
        setViolations(v => ({ ...v, tabSwitch: v.tabSwitch + 1 }));
      }
    };

    const handleBlur = () => {
      setViolations(v => ({ ...v, blur: v.blur + 1 }));
    };

    document.addEventListener("copy", blockCopy);
    document.addEventListener("contextmenu", blockRightClick);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("contextmenu", blockRightClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // 🔥 TIMER
  useEffect(() => {
    if (!timeLeft || !test) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, test]);

  // SAVE STATE
  useEffect(() => {
    localStorage.setItem(
      `test-${testId}`,
      JSON.stringify({ answers, marked, timeLeft, current })
    );
  }, [answers, marked, timeLeft, current]);

  // ACTIONS
  const handleAnswer = (qid, index) => {
    setAnswers(prev => ({ ...prev, [qid]: index }));
  };

  const handleSaveNext = () => {
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
    }
  };

  const toggleMark = (qid) => {
    setMarked(prev => ({ ...prev, [qid]: !prev[qid] }));
  };

  // const handleSubmit = async () => {
  //   const res = await submitTest({
  //     testId,
  //     answers,
  //     timeTaken: (test.duration * 60) - timeLeft,
  //     violations
  //   });

  //   localStorage.removeItem(`test-${testId}`);
  //   navigate(`/result/${res.data.attemptId}`);
  // };


    const handleSubmit = async () => {
    const res = await submitTest({
      testId,
      answers,
      timeTaken: (test.duration * 60) - timeLeft,
      violations
    });

    localStorage.removeItem(`test-${testId}`);
    navigate(`/result/${res.data.attemptId}`);
  };

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const filteredQuestions = questions.filter((q) => {
    if (filter === "answered") return answers[q._id] !== undefined;
    if (filter === "unanswered") return answers[q._id] === undefined;
    if (filter === "marked") return marked[q._id];
    return true;
  });

  if (loading) return <p className="p-6">Loading...</p>;

  const q = questions[current];

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* HEADER */}
      <div className="flex justify-between p-4 bg-white shadow">
        <h2>Q {current + 1}/{questions.length}</h2>
        <div className="bg-black text-white px-3 py-1 rounded">
          ⏱ {formatTime()}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-white p-5 rounded shadow">
            <p className="mb-4">{q?.question?.en}</p>

            {q.options.map((opt, i) => (
              <label
                key={opt._id}
                className={`block border p-3 mb-2 rounded cursor-pointer
                ${answers[q._id] === i ? "bg-indigo-100 border-indigo-500" : ""}
              `}
              >
                <input
                  type="radio"
                  checked={answers[q._id] === i}
                  onChange={() => handleAnswer(q._id, i)}
                />
                <span className="ml-2">{opt.text?.en}</span>
              </label>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-72 bg-white border-l p-4 overflow-y-auto hidden md:block">

          <h3 className="font-semibold mb-3">Questions</h3>

          {/* FILTER */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {["all", "answered", "unanswered", "marked"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-2 py-1 rounded ${
                  filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* PALETTE */}
          <div className="grid grid-cols-5 gap-2">
            {filteredQuestions.map((item) => {
              const index = questions.findIndex(q => q._id === item._id);

              return (
                <button
                  key={item._id}
                  onClick={() => setCurrent(index)}
                  className={`w-10 h-10 rounded text-sm
                    ${answers[item._id] !== undefined ? "bg-green-500 text-white" : "bg-gray-300"}
                    ${marked[item._id] ? "border-2 border-yellow-500" : ""}
                    ${current === index ? "ring-2 ring-black" : ""}
                  `}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between">

        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => toggleMark(q._id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Mark
        </button>

        <button
          onClick={handleSaveNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Save & Next
        </button>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h3 className="mb-4 font-bold">Submit Test?</h3>
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
                Yes
              </button>
              <button onClick={() => setShowSubmitModal(false)} className="bg-gray-400 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TestEngine;