


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

//   // 🔥 FETCH
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

//   // 🔥 FULLSCREEN ONLY HERE
//   useEffect(() => {
//     document.documentElement.requestFullscreen?.();

//     return () => {
//       document.exitFullscreen?.();
//     };
//   }, []);

//   // 🔒 ANTI-CHEAT
//   useEffect(() => {
//     const blockCopy = (e) => {
//       e.preventDefault();
//       setViolations(v => ({ ...v, copy: v.copy + 1 }));
//     };

//     const blockRightClick = (e) => {
//       e.preventDefault();
//       setViolations(v => ({ ...v, rightClick: v.rightClick + 1 }));
//     };

//     const handleVisibility = () => {
//       if (document.hidden) {
//         setViolations(v => ({ ...v, tabSwitch: v.tabSwitch + 1 }));
//       }
//     };

//     const handleBlur = () => {
//       setViolations(v => ({ ...v, blur: v.blur + 1 }));
//     };

//     document.addEventListener("copy", blockCopy);
//     document.addEventListener("contextmenu", blockRightClick);
//     document.addEventListener("visibilitychange", handleVisibility);
//     window.addEventListener("blur", handleBlur);

//     return () => {
//       document.removeEventListener("copy", blockCopy);
//       document.removeEventListener("contextmenu", blockRightClick);
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

//   // ACTIONS
//   const handleAnswer = (qid, index) => {
//     setAnswers(prev => ({ ...prev, [qid]: index }));
//   };

//   const handleSaveNext = () => {
//     if (current < questions.length - 1) {
//       setCurrent(prev => prev + 1);
//     }
//   };

//   const toggleMark = (qid) => {
//     setMarked(prev => ({ ...prev, [qid]: !prev[qid] }));
//   };



//     const handleSubmit = async () => {
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

//   const filteredQuestions = questions.filter((q) => {
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

//       {/* MAIN */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* LEFT SIDE */}
//         <div className="flex-1 p-4 overflow-y-auto">
//           <div className="bg-white p-5 rounded shadow">
//             <p className="mb-4">{q?.question?.en}</p>

//             {q.options.map((opt, i) => (
//               <label
//                 key={opt._id}
//                 className={`block border p-3 mb-2 rounded cursor-pointer
//                 ${answers[q._id] === i ? "bg-indigo-100 border-indigo-500" : ""}
//               `}
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

//         {/* RIGHT PANEL */}
//         <div className="w-72 bg-white border-l p-4 overflow-y-auto hidden md:block">

//           <h3 className="font-semibold mb-3">Questions</h3>

//           {/* FILTER */}
//           <div className="flex gap-1 mb-3 flex-wrap">
//             {["all", "answered", "unanswered", "marked"].map(f => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`text-xs px-2 py-1 rounded ${
//                   filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>

//           {/* PALETTE */}
//           <div className="grid grid-cols-5 gap-2">
//             {filteredQuestions.map((item) => {
//               const index = questions.findIndex(q => q._id === item._id);

//               return (
//                 <button
//                   key={item._id}
//                   onClick={() => setCurrent(index)}
//                   className={`w-10 h-10 rounded text-sm
//                     ${answers[item._id] !== undefined ? "bg-green-500 text-white" : "bg-gray-300"}
//                     ${marked[item._id] ? "border-2 border-yellow-500" : ""}
//                     ${current === index ? "ring-2 ring-black" : ""}
//                   `}
//                 >
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>

//         </div>
//       </div>

//       {/* BOTTOM BAR */}
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between">

//         <button
//           onClick={() => setCurrent(c => Math.max(0, c - 1))}
//           className="bg-gray-400 text-white px-4 py-2 rounded"
//         >
//           Prev
//         </button>

//         <button
//           onClick={() => toggleMark(q._id)}
//           className="bg-yellow-500 text-white px-4 py-2 rounded"
//         >
//           Mark
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




// import { useEffect, useState, useRef } from "react";
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
//   const [visited, setVisited] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);

//   const [loading, setLoading] = useState(true);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [filter, setFilter] = useState("all");

//   const [fullscreenWarning, setFullscreenWarning] = useState(false);

//   const timerRef = useRef(null);

//   // 🔥 ANTI CHEAT
//   const [violations, setViolations] = useState({
//     tabSwitch: 0,
//     blur: 0,
//     copy: 0,
//     rightClick: 0,
//     fullscreenExit: 0,
//     keyPress: 0
//   });

//   // =========================================
//   // FETCH DATA
//   // =========================================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [qRes, tRes] = await Promise.all([
//           getQuestionsByTest(testId),
//           getTestById(testId)
//         ]);

//         setQuestions(qRes.data || []);
//         setTest(tRes.data);

//         const saved = localStorage.getItem(`test-${testId}`);

//         if (saved) {
//           const parsed = JSON.parse(saved);

//           setAnswers(parsed.answers || {});
//           setMarked(parsed.marked || {});
//           setVisited(parsed.visited || {});
//           setCurrent(parsed.current || 0);
//           setTimeLeft(
//             parsed.timeLeft || tRes.data.duration * 60
//           );
//         } else {
//           setTimeLeft(tRes.data.duration * 60);
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, [testId]);

//   // =========================================
//   // FULLSCREEN MODE
//   // =========================================
//   useEffect(() => {
//     const enterFullscreen = async () => {
//       try {
//         await document.documentElement.requestFullscreen();
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     enterFullscreen();

//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement) {
//         setFullscreenWarning(true);

//         setViolations((prev) => ({
//           ...prev,
//           fullscreenExit: prev.fullscreenExit + 1
//         }));

//         setTimeout(() => {
//           document.documentElement.requestFullscreen?.();
//           setFullscreenWarning(false);
//         }, 2000);
//       }
//     };

//     document.addEventListener(
//       "fullscreenchange",
//       handleFullscreenChange
//     );

//     return () => {
//       document.removeEventListener(
//         "fullscreenchange",
//         handleFullscreenChange
//       );

//       document.exitFullscreen?.();
//     };
//   }, []);

//   // =========================================
//   // TIMER
//   // =========================================
//   useEffect(() => {
//     if (!timeLeft || !test) return;

//     timerRef.current = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           handleSubmit();
//           return 0;
//         }

//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [timeLeft, test]);

//   // =========================================
//   // SAVE TEST STATE
//   // =========================================
//   useEffect(() => {
//     localStorage.setItem(
//       `test-${testId}`,
//       JSON.stringify({
//         answers,
//         marked,
//         visited,
//         current,
//         timeLeft
//       })
//     );
//   }, [
//     answers,
//     marked,
//     visited,
//     current,
//     timeLeft,
//     testId
//   ]);

//   // =========================================
//   // QUESTION VISITED
//   // =========================================
//   useEffect(() => {
//     const q = questions[current];

//     if (q) {
//       setVisited((prev) => ({
//         ...prev,
//         [q._id]: true
//       }));
//     }
//   }, [current, questions]);

//   // =========================================
//   // ANTI CHEAT SYSTEM
//   // =========================================
//   useEffect(() => {
//     // BLOCK COPY
//     const blockCopy = (e) => {
//       e.preventDefault();

//       setViolations((prev) => ({
//         ...prev,
//         copy: prev.copy + 1
//       }));
//     };

//     // BLOCK RIGHT CLICK
//     const blockRightClick = (e) => {
//       e.preventDefault();

//       setViolations((prev) => ({
//         ...prev,
//         rightClick: prev.rightClick + 1
//       }));
//     };

//     // TAB SWITCH
//     const handleVisibility = () => {
//       if (document.hidden) {
//         setViolations((prev) => ({
//           ...prev,
//           tabSwitch: prev.tabSwitch + 1
//         }));
//       }
//     };

//     // WINDOW BLUR
//     const handleBlur = () => {
//       setViolations((prev) => ({
//         ...prev,
//         blur: prev.blur + 1
//       }));
//     };

//     // BLOCK KEYS
//     const handleKeyDown = (e) => {
//       // F12
//       if (e.key === "F12") {
//         e.preventDefault();
//       }

//       // Ctrl shortcuts
//       if (
//         e.ctrlKey &&
//         ["c", "v", "u", "p", "s"].includes(
//           e.key.toLowerCase()
//         )
//       ) {
//         e.preventDefault();

//         setViolations((prev) => ({
//           ...prev,
//           keyPress: prev.keyPress + 1
//         }));
//       }

//       // Alt Tab
//       if (e.altKey && e.key === "Tab") {
//         e.preventDefault();

//         setViolations((prev) => ({
//           ...prev,
//           keyPress: prev.keyPress + 1
//         }));
//       }
//     };

//     // BLOCK SELECT
//     const disableSelection = (e) => {
//       e.preventDefault();
//     };

//     document.addEventListener("copy", blockCopy);
//     document.addEventListener(
//       "contextmenu",
//       blockRightClick
//     );

//     document.addEventListener(
//       "visibilitychange",
//       handleVisibility
//     );

//     window.addEventListener("blur", handleBlur);

//     document.addEventListener(
//       "keydown",
//       handleKeyDown
//     );

//     document.addEventListener(
//       "selectstart",
//       disableSelection
//     );

//     return () => {
//       document.removeEventListener("copy", blockCopy);

//       document.removeEventListener(
//         "contextmenu",
//         blockRightClick
//       );

//       document.removeEventListener(
//         "visibilitychange",
//         handleVisibility
//       );

//       window.removeEventListener("blur", handleBlur);

//       document.removeEventListener(
//         "keydown",
//         handleKeyDown
//       );

//       document.removeEventListener(
//         "selectstart",
//         disableSelection
//       );
//     };
//   }, []);

//   // =========================================
//   // ACTIONS
//   // =========================================
//   const handleAnswer = (qid, index) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [qid]: index
//     }));
//   };

//   const clearAnswer = (qid) => {
//     const updated = { ...answers };

//     delete updated[qid];

//     setAnswers(updated);
//   };

//   const handleSaveNext = () => {
//     if (current < questions.length - 1) {
//       setCurrent((prev) => prev + 1);
//     }
//   };

//   const toggleMark = (qid) => {
//     setMarked((prev) => ({
//       ...prev,
//       [qid]: !prev[qid]
//     }));
//   };

//   // =========================================
//   // SUBMIT
//   // =========================================
//   const handleSubmit = async () => {
//     try {
//       const res = await submitTest({
//         testId,
//         answers,
//         timeTaken:
//           test.duration * 60 - timeLeft,
//         violations
//       });

//       localStorage.removeItem(`test-${testId}`);

//       navigate(`/result/${res.data.attemptId}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // =========================================
//   // TIME FORMAT
//   // =========================================
//   const formatTime = () => {
//     const hrs = Math.floor(timeLeft / 3600);
//     const mins = Math.floor((timeLeft % 3600) / 60);
//     const secs = timeLeft % 60;

//     return `${hrs}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   // =========================================
//   // FILTER QUESTIONS
//   // =========================================
//   const filteredQuestions = questions.filter((q) => {
//     if (filter === "answered") {
//       return answers[q._id] !== undefined;
//     }

//     if (filter === "unanswered") {
//       return answers[q._id] === undefined;
//     }

//     if (filter === "marked") {
//       return marked[q._id];
//     }

//     return true;
//   });

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   const q = questions[current];

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">

//       {/* FULLSCREEN WARNING */}
//       {fullscreenWarning && (
//         <div className="fixed inset-0 bg-red-600 z-50 flex items-center justify-center">
//           <div className="bg-white p-10 rounded-2xl text-center">
//             <h1 className="text-3xl font-bold text-red-600">
//               Fullscreen Required
//             </h1>

//             <p className="mt-4 text-gray-700">
//               Please stay in fullscreen mode during the test.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

//         <div>
//           <h2 className="font-bold text-xl">
//             {test?.title}
//           </h2>

//           <p className="text-sm text-gray-500">
//             Question {current + 1} of {questions.length}
//           </p>
//         </div>

//         <div className="bg-black text-white px-5 py-2 rounded-xl text-lg font-bold">
//           ⏱ {formatTime()}
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* LEFT */}
//         <div className="flex-1 overflow-y-auto p-6">

//           <div className="bg-white rounded-2xl shadow p-6">

//             {/* QUESTION */}
//             <div className="flex justify-between mb-6">
//               <h3 className="text-xl font-bold">
//                 Question {current + 1}
//               </h3>

//               {marked[q._id] && (
//                 <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
//                   Marked
//                 </span>
//               )}
//             </div>

//             <p className="text-lg mb-6 leading-8">
//               {q?.question?.en}
//             </p>

//             {/* OPTIONS */}
//             <div className="space-y-4">

//               {q?.options?.map((opt, i) => (
//                 <label
//                   key={i}
//                   className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition
//                   ${
//                     answers[q._id] === i
//                       ? "border-indigo-600 bg-indigo-50"
//                       : "border-gray-200 hover:border-indigo-300"
//                   }
//                 `}
//                 >
//                   <input
//                     type="radio"
//                     checked={answers[q._id] === i}
//                     onChange={() =>
//                       handleAnswer(q._id, i)
//                     }
//                     className="w-5 h-5"
//                   />

//                   <span className="text-lg">
//                     {opt.text?.en}
//                   </span>
//                 </label>
//               ))}

//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex flex-wrap gap-3 mt-8">

//               <button
//                 onClick={() =>
//                   setCurrent((prev) =>
//                     Math.max(prev - 1, 0)
//                   )
//                 }
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-xl"
//               >
//                 Previous
//               </button>

//               <button
//                 onClick={() => toggleMark(q._id)}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl"
//               >
//                 Mark for Review
//               </button>

//               <button
//                 onClick={() =>
//                   clearAnswer(q._id)
//                 }
//                 className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
//               >
//                 Clear Answer
//               </button>

//               <button
//                 onClick={handleSaveNext}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
//               >
//                 Save & Next
//               </button>

//             </div>

//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="w-80 bg-white border-l overflow-y-auto hidden lg:block">

//           <div className="p-5 border-b">

//             <h3 className="text-lg font-bold mb-4">
//               Question Palette
//             </h3>

//             {/* STATS */}
//             <div className="grid grid-cols-2 gap-3 text-sm">

//               <div className="bg-green-100 p-3 rounded-xl">
//                 ✅ Answered: {
//                   Object.keys(answers).length
//                 }
//               </div>

//               <div className="bg-red-100 p-3 rounded-xl">
//                 ❌ Unanswered: {
//                   questions.length -
//                   Object.keys(answers).length
//                 }
//               </div>

//               <div className="bg-yellow-100 p-3 rounded-xl">
//                 🚩 Marked: {
//                   Object.values(marked).filter(Boolean)
//                     .length
//                 }
//               </div>

//               <div className="bg-blue-100 p-3 rounded-xl">
//                 👁 Visited: {
//                   Object.keys(visited).length
//                 }
//               </div>

//             </div>

//             {/* FILTER */}
//             <div className="flex flex-wrap gap-2 mt-5">

//               {[
//                 "all",
//                 "answered",
//                 "unanswered",
//                 "marked"
//               ].map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => setFilter(f)}
//                   className={`px-3 py-2 rounded-lg text-sm capitalize
//                   ${
//                     filter === f
//                       ? "bg-indigo-600 text-white"
//                       : "bg-gray-200"
//                   }
//                 `}
//                 >
//                   {f}
//                 </button>
//               ))}

//             </div>
//           </div>

//           {/* PALETTE */}
//           <div className="p-5 grid grid-cols-5 gap-3">

//             {filteredQuestions.map((item) => {
//               const index = questions.findIndex(
//                 (q) => q._id === item._id
//               );

//               return (
//                 <button
//                   key={item._id}
//                   onClick={() =>
//                     setCurrent(index)
//                   }
//                   className={`
//                     h-12 w-12 rounded-xl font-semibold transition

//                     ${
//                       answers[item._id] !==
//                       undefined
//                         ? "bg-green-500 text-white"
//                         : visited[item._id]
//                         ? "bg-red-400 text-white"
//                         : "bg-gray-300"
//                     }

//                     ${
//                       marked[item._id]
//                         ? "ring-4 ring-yellow-400"
//                         : ""
//                     }

//                     ${
//                       current === index
//                         ? "border-4 border-black"
//                         : ""
//                     }
//                   `}
//                 >
//                   {index + 1}
//                 </button>
//               );
//             })}

//           </div>

//           {/* VIOLATIONS */}
//           <div className="p-5 border-t">

//             <h3 className="font-bold mb-3 text-red-600">
//               Anti Cheat Monitor
//             </h3>

//             <div className="space-y-2 text-sm">

//               <p>
//                 Tab Switch: {
//                   violations.tabSwitch
//                 }
//               </p>

//               <p>
//                 Window Blur: {
//                   violations.blur
//                 }
//               </p>

//               <p>
//                 Copy Attempts: {
//                   violations.copy
//                 }
//               </p>

//               <p>
//                 Right Clicks: {
//                   violations.rightClick
//                 }
//               </p>

//               <p>
//                 Fullscreen Exit: {
//                   violations.fullscreenExit
//                 }
//               </p>

//             </div>
//           </div>

//         </div>
//       </div>

//       {/* SUBMIT BAR */}
//       <div className="bg-white border-t p-4 flex justify-end">

//         <button
//           onClick={() =>
//             setShowSubmitModal(true)
//           }
//           className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
//         >
//           Submit Test
//         </button>

//       </div>

//       {/* SUBMIT MODAL */}
//       {showSubmitModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

//           <div className="bg-white rounded-2xl p-8 w-full max-w-md">

//             <h2 className="text-2xl font-bold mb-5">
//               Submit Test?
//             </h2>

//             <div className="space-y-3 text-gray-700">

//               <p>
//                 ✅ Answered:
//                 {" "}
//                 {Object.keys(answers).length}
//               </p>

//               <p>
//                 ❌ Unanswered:
//                 {" "}
//                 {questions.length -
//                   Object.keys(answers).length}
//               </p>

//               <p>
//                 🚩 Marked:
//                 {" "}
//                 {
//                   Object.values(marked).filter(
//                     Boolean
//                   ).length
//                 }
//               </p>

//             </div>

//             <div className="flex gap-3 mt-8">

//               <button
//                 onClick={handleSubmit}
//                 className="flex-1 bg-green-600 text-white py-3 rounded-xl"
//               >
//                 Final Submit
//               </button>

//               <button
//                 onClick={() =>
//                   setShowSubmitModal(false)
//                 }
//                 className="flex-1 bg-gray-300 py-3 rounded-xl"
//               >
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



import { useEffect, useState, useRef, useMemo } from "react";
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
  const [visited, setVisited] = useState({});

  const [timeLeft, setTimeLeft] = useState(0);

  const [loading, setLoading] = useState(true);

  const [showSubmitModal, setShowSubmitModal] =
    useState(false);

  const [filter, setFilter] = useState("all");

  const [fullscreenWarning, setFullscreenWarning] =
    useState(false);

  const timerRef = useRef(null);

  // =========================================
  // ANTI CHEAT
  // =========================================

  const [violations, setViolations] = useState({
    tabSwitch: 0,
    blur: 0,
    copy: 0,
    rightClick: 0,
    fullscreenExit: 0,
    keyPress: 0
  });

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {

    const fetchData = async () => {

      try {

        const [qRes, tRes] = await Promise.all([
          getQuestionsByTest(testId),
          getTestById(testId)
        ]);

        setQuestions(qRes.data || []);

        setTest(tRes.data);

        const saved =
          localStorage.getItem(`test-${testId}`);

        if (saved) {

          const parsed = JSON.parse(saved);

          setAnswers(parsed.answers || {});
          setMarked(parsed.marked || {});
          setVisited(parsed.visited || {});
          setCurrent(parsed.current || 0);

          setTimeLeft(
            parsed.timeLeft ||
              tRes.data.duration * 60
          );

        } else {

          setTimeLeft(
            tRes.data.duration * 60
          );
        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, [testId]);

  // =========================================
  // FULLSCREEN
  // =========================================

  useEffect(() => {

    const enterFullscreen = async () => {

      try {

        await document.documentElement.requestFullscreen();

      } catch (err) {

        console.log(err);
      }
    };

    enterFullscreen();

    const handleFullscreenChange = () => {

      if (!document.fullscreenElement) {

        setFullscreenWarning(true);

        setViolations((prev) => ({
          ...prev,
          fullscreenExit:
            prev.fullscreenExit + 1
        }));

        setTimeout(() => {

          document.documentElement
            .requestFullscreen?.();

          setFullscreenWarning(false);

        }, 2000);
      }
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {

      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );

      document.exitFullscreen?.();
    };

  }, []);

  // =========================================
  // TIMER
  // =========================================

  useEffect(() => {

    if (!timeLeft || !test) return;

    timerRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timerRef.current);

          handleSubmit();

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(timerRef.current);

  }, [timeLeft, test]);

  // =========================================
  // SAVE STATE
  // =========================================

  useEffect(() => {

    localStorage.setItem(
      `test-${testId}`,
      JSON.stringify({
        answers,
        marked,
        visited,
        current,
        timeLeft
      })
    );

  }, [
    answers,
    marked,
    visited,
    current,
    timeLeft,
    testId
  ]);

  // =========================================
  // VISITED
  // =========================================

  useEffect(() => {

    const q = questions[current];

    if (q) {

      setVisited((prev) => ({
        ...prev,
        [q._id]: true
      }));
    }

  }, [current, questions]);

  // =========================================
  // ANTI CHEAT
  // =========================================

  useEffect(() => {

    const blockCopy = (e) => {

      e.preventDefault();

      setViolations((prev) => ({
        ...prev,
        copy: prev.copy + 1
      }));
    };

    const blockRightClick = (e) => {

      e.preventDefault();

      setViolations((prev) => ({
        ...prev,
        rightClick: prev.rightClick + 1
      }));
    };

    const handleVisibility = () => {

      if (document.hidden) {

        setViolations((prev) => ({
          ...prev,
          tabSwitch:
            prev.tabSwitch + 1
        }));
      }
    };

    const handleBlur = () => {

      setViolations((prev) => ({
        ...prev,
        blur: prev.blur + 1
      }));
    };

    const handleKeyDown = (e) => {

      if (e.key === "F12") {
        e.preventDefault();
      }

      if (
        e.ctrlKey &&
        ["c", "v", "u", "p", "s"].includes(
          e.key.toLowerCase()
        )
      ) {

        e.preventDefault();

        setViolations((prev) => ({
          ...prev,
          keyPress:
            prev.keyPress + 1
        }));
      }

      if (e.altKey && e.key === "Tab") {

        e.preventDefault();

        setViolations((prev) => ({
          ...prev,
          keyPress:
            prev.keyPress + 1
        }));
      }
    };

    const disableSelection = (e) => {
      e.preventDefault();
    };

    document.addEventListener(
      "copy",
      blockCopy
    );

    document.addEventListener(
      "contextmenu",
      blockRightClick
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    window.addEventListener(
      "blur",
      handleBlur
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.addEventListener(
      "selectstart",
      disableSelection
    );

    return () => {

      document.removeEventListener(
        "copy",
        blockCopy
      );

      document.removeEventListener(
        "contextmenu",
        blockRightClick
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      window.removeEventListener(
        "blur",
        handleBlur
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.removeEventListener(
        "selectstart",
        disableSelection
      );
    };

  }, []);

  // =========================================
  // SECTION GROUPING
  // =========================================

  const sectionGroups = useMemo(() => {

    const grouped = {};

    questions.forEach((q, index) => {

      const section =
        q.section || "General";

      if (!grouped[section]) {
        grouped[section] = [];
      }

      grouped[section].push({
        ...q,
        globalIndex: index
      });
    });

    return grouped;

  }, [questions]);

  // =========================================
  // ACTIONS
  // =========================================

  const handleAnswer = (qid, index) => {

    setAnswers((prev) => ({
      ...prev,
      [qid]: index
    }));
  };

  const clearAnswer = (qid) => {

    const updated = { ...answers };

    delete updated[qid];

    setAnswers(updated);
  };

  const handleSaveNext = () => {

    if (current < questions.length - 1) {

      setCurrent((prev) => prev + 1);
    }
  };

  const toggleMark = (qid) => {

    setMarked((prev) => ({
      ...prev,
      [qid]: !prev[qid]
    }));
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async () => {

    try {

      const res = await submitTest({
        testId,
        answers,
        timeTaken:
          test.duration * 60 - timeLeft,
        violations
      });

      localStorage.removeItem(
        `test-${testId}`
      );

      navigate(
        `/result/${res.data.attemptId}`
      );

    } catch (err) {

      console.error(err);
    }
  };

  // =========================================
  // TIME FORMAT
  // =========================================

  const formatTime = () => {

    const hrs = Math.floor(
      timeLeft / 3600
    );

    const mins = Math.floor(
      (timeLeft % 3600) / 60
    );

    const secs = timeLeft % 60;

    return `${hrs}:${mins
      .toString()
      .padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // =========================================
  // FILTER QUESTIONS
  // =========================================

  const filteredQuestions =
    questions.filter((q) => {

      if (filter === "answered") {
        return answers[q._id] !== undefined;
      }

      if (filter === "unanswered") {
        return answers[q._id] === undefined;
      }

      if (filter === "marked") {
        return marked[q._id];
      }

      return true;
    });

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center">

        <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  const q = questions[current];

  // =========================================
  // UI
  // =========================================

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">

      {/* FULLSCREEN WARNING */}
      {fullscreenWarning && (

        <div className="fixed inset-0 bg-red-600 z-50 flex items-center justify-center">

          <div className="bg-white p-10 rounded-2xl text-center">

            <h1 className="text-3xl font-bold text-red-600">
              Fullscreen Required
            </h1>

            <p className="mt-4 text-gray-700">
              Please stay in fullscreen mode during the test.
            </p>

          </div>

        </div>
      )}

      {/* HEADER */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <div>

          <h2 className="font-bold text-xl">
            {test?.title}
          </h2>

          <p className="text-sm text-gray-500">

            Question {current + 1} of{" "}
            {questions.length}

          </p>

          {q?.section && (
            <p className="text-sm text-indigo-600 font-semibold mt-1">
              Section: {q.section}
            </p>
          )}

        </div>

        <div className="bg-black text-white px-5 py-2 rounded-xl text-lg font-bold">
          ⏱ {formatTime()}
        </div>

      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT */}
        <div className="flex-1 overflow-y-auto p-6">

          <div className="bg-white rounded-2xl shadow p-6">

            {/* QUESTION */}
            <div className="flex justify-between mb-6">

              <h3 className="text-xl font-bold">
                Question {current + 1}
              </h3>

              {marked[q._id] && (

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Marked
                </span>
              )}

            </div>

            <p className="text-lg mb-6 leading-8">
              {q?.question?.en}
            </p>

            {/* OPTIONS */}
            <div className="space-y-4">

              {q?.options?.map((opt, i) => (

                <label
                  key={i}
                  className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition

                  ${
                    answers[q._id] === i
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }
                  `}
                >

                  <input
                    type="radio"
                    checked={
                      answers[q._id] === i
                    }
                    onChange={() =>
                      handleAnswer(
                        q._id,
                        i
                      )
                    }
                    className="w-5 h-5"
                  />

                  <span className="text-lg">
                    {opt.text?.en}
                  </span>

                </label>
              ))}

            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3 mt-8">

              <button
                onClick={() =>
                  setCurrent((prev) =>
                    Math.max(prev - 1, 0)
                  )
                }
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-xl"
              >
                Previous
              </button>

              <button
                onClick={() =>
                  toggleMark(q._id)
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl"
              >
                Mark for Review
              </button>

              <button
                onClick={() =>
                  clearAnswer(q._id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
              >
                Clear Answer
              </button>

              <button
                onClick={handleSaveNext}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
              >
                Save & Next
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 bg-white border-l overflow-y-auto hidden lg:block">

          <div className="p-5 border-b">

            <h3 className="text-lg font-bold mb-4">
              Question Palette
            </h3>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 text-sm">

              <div className="bg-green-100 p-3 rounded-xl">
                ✅ Answered:
                {" "}
                {Object.keys(answers).length}
              </div>

              <div className="bg-red-100 p-3 rounded-xl">
                ❌ Unanswered:
                {" "}
                {questions.length -
                  Object.keys(answers).length}
              </div>

              <div className="bg-yellow-100 p-3 rounded-xl">
                🚩 Marked:
                {" "}
                {
                  Object.values(marked).filter(
                    Boolean
                  ).length
                }
              </div>

              <div className="bg-blue-100 p-3 rounded-xl">
                👁 Visited:
                {" "}
                {Object.keys(visited).length}
              </div>

            </div>

            {/* FILTER */}
            <div className="flex flex-wrap gap-2 mt-5">

              {[
                "all",
                "answered",
                "unanswered",
                "marked"
              ].map((f) => (

                <button
                  key={f}
                  onClick={() =>
                    setFilter(f)
                  }
                  className={`px-3 py-2 rounded-lg text-sm capitalize

                  ${
                    filter === f
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }
                  `}
                >
                  {f}
                </button>
              ))}

            </div>

          </div>

          {/* SECTION WISE QUESTIONS */}
          <div className="p-5">

            {test?.hasSections ? (

              Object.entries(sectionGroups).map(
                ([sectionName, sectionQuestions]) => (

                  <div
                    key={sectionName}
                    className="mb-8"
                  >

                    <h3 className="font-bold text-indigo-700 mb-4 sticky top-0 bg-white py-2">
                      {sectionName}
                    </h3>

                    <div className="grid grid-cols-5 gap-3">

                      {sectionQuestions
                        .filter((item) => {

                          if (
                            filter === "answered"
                          ) {
                            return (
                              answers[item._id] !==
                              undefined
                            );
                          }

                          if (
                            filter === "unanswered"
                          ) {
                            return (
                              answers[item._id] ===
                              undefined
                            );
                          }

                          if (
                            filter === "marked"
                          ) {
                            return marked[item._id];
                          }

                          return true;
                        })
                        .map((item) => {

                          const index =
                            item.globalIndex;

                          return (
                            <button
                              key={item._id}
                              onClick={() =>
                                setCurrent(index)
                              }
                              className={`
                              h-12 w-12 rounded-xl font-semibold transition

                              ${
                                answers[item._id] !==
                                undefined
                                  ? "bg-green-500 text-white"
                                  : visited[item._id]
                                  ? "bg-red-400 text-white"
                                  : "bg-gray-300"
                              }

                              ${
                                marked[item._id]
                                  ? "ring-4 ring-yellow-400"
                                  : ""
                              }

                              ${
                                current === index
                                  ? "border-4 border-black"
                                  : ""
                              }
                              `}
                            >
                              {index + 1}
                            </button>
                          );
                        })}

                    </div>

                  </div>
                )
              )

            ) : (

              <div className="grid grid-cols-5 gap-3">

                {filteredQuestions.map((item) => {

                  const index =
                    questions.findIndex(
                      (q) =>
                        q._id === item._id
                    );

                  return (
                    <button
                      key={item._id}
                      onClick={() =>
                        setCurrent(index)
                      }
                      className={`
                      h-12 w-12 rounded-xl font-semibold transition

                      ${
                        answers[item._id] !==
                        undefined
                          ? "bg-green-500 text-white"
                          : visited[item._id]
                          ? "bg-red-400 text-white"
                          : "bg-gray-300"
                      }

                      ${
                        marked[item._id]
                          ? "ring-4 ring-yellow-400"
                          : ""
                      }

                      ${
                        current === index
                          ? "border-4 border-black"
                          : ""
                      }
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}

              </div>
            )}

          </div>

          {/* VIOLATIONS */}
          <div className="p-5 border-t">

            <h3 className="font-bold mb-3 text-red-600">
              Anti Cheat Monitor
            </h3>

            <div className="space-y-2 text-sm">

              <p>
                Tab Switch:
                {" "}
                {violations.tabSwitch}
              </p>

              <p>
                Window Blur:
                {" "}
                {violations.blur}
              </p>

              <p>
                Copy Attempts:
                {" "}
                {violations.copy}
              </p>

              <p>
                Right Clicks:
                {" "}
                {violations.rightClick}
              </p>

              <p>
                Fullscreen Exit:
                {" "}
                {violations.fullscreenExit}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* SUBMIT BAR */}
      <div className="bg-white border-t p-4 flex justify-end">

        <button
          onClick={() =>
            setShowSubmitModal(true)
          }
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
        >
          Submit Test
        </button>

      </div>

      {/* SUBMIT MODAL */}
      {showSubmitModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-5">
              Submit Test?
            </h2>

            <div className="space-y-3 text-gray-700">

              <p>
                ✅ Answered:
                {" "}
                {Object.keys(answers).length}
              </p>

              <p>
                ❌ Unanswered:
                {" "}
                {questions.length -
                  Object.keys(answers).length}
              </p>

              <p>
                🚩 Marked:
                {" "}
                {
                  Object.values(marked).filter(
                    Boolean
                  ).length
                }
              </p>

            </div>

            <div className="flex gap-3 mt-8">

              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl"
              >
                Final Submit
              </button>

              <button
                onClick={() =>
                  setShowSubmitModal(false)
                }
                className="flex-1 bg-gray-300 py-3 rounded-xl"
              >
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