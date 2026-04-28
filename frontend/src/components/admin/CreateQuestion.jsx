



// import { useState, useEffect } from "react";
// import {
//   getExams,
//   getTestSeriesByExam,
//   getPYPByExam,
//   getTestsBySeries,
//   getTestsByPYP,
//   createQuestion
// } from "../../services/test.service";

// const CreateQuestion = () => {
//   const [exams, setExams] = useState([]);
//   const [series, setSeries] = useState([]);
//   const [pyps, setPyps] = useState([]);
//   const [tests, setTests] = useState([]);

//   const [mode, setMode] = useState("series");

//   const [form, setForm] = useState({
//     exam: "",
//     series: "",
//     pyp: "",
//     test: ""
//   });

//   const [questions, setQuestions] = useState([]);

//   const [current, setCurrent] = useState({
//     question: "",
//     options: [
//       { text: "", isCorrect: false },
//       { text: "", isCorrect: false },
//       { text: "", isCorrect: false },
//       { text: "", isCorrect: false }
//     ],
//     explanation: ""
//   });

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     const res = await getExams();
//     setExams(res.data);
//   };

//   // ✅ SELECT EXAM
//   const handleExam = async (slug) => {
//     setForm({
//       exam: slug,
//       series: "",
//       pyp: "",
//       test: ""
//     });

//     const s = await getTestSeriesByExam(slug);
//     const p = await getPYPByExam(slug);

//     setSeries(s.data);
//     setPyps(p.data);
//     setTests([]);
//   };

//   // ✅ SELECT SERIES
//   const handleSeries = async (id) => {
//     setForm({
//       ...form,
//       series: id,
//       pyp: "",
//       test: ""
//     });

//     const res = await getTestsBySeries(id);
//     setTests(res.data);
//   };

//   // ✅ SELECT PYP
//   const handlePYP = async (id) => {
//     setForm({
//       ...form,
//       pyp: id,
//       series: "",
//       test: ""
//     });

//     const res = await getTestsByPYP(id);
//     setTests(res.data);
//   };

//   // OPTION TEXT
//   const handleOption = (i, val) => {
//     const updated = [...current.options];
//     updated[i].text = val;
//     setCurrent({ ...current, options: updated });
//   };

//   // CORRECT ANSWER
//   const handleCorrect = (i) => {
//     const updated = current.options.map((o, idx) => ({
//       ...o,
//       isCorrect: idx === i
//     }));
//     setCurrent({ ...current, options: updated });
//   };

//   // ADD QUESTION
//   const addQuestion = () => {
//     if (!current.question) return alert("Enter question");

//     setQuestions([...questions, current]);

//     setCurrent({
//       question: "",
//       options: [
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false }
//       ],
//       explanation: ""
//     });
//   };

//   // FINAL SAVE
//   const handleSubmit = async () => {
//     if (!form.test) return alert("⚠️ Select Test Paper");

//     try {
//       for (let q of questions) {
//         await createQuestion({
//           ...q,
//           test: form.test
//         });
//       }

//       alert("✅ All Questions Added");

//       setQuestions([]);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to save questions");
//     }
//   };

//   return (
//     <div className="ml-64 p-6 bg-gray-100 min-h-screen">

//       <h2 className="text-2xl font-bold mb-6">Add Questions</h2>

//       {/* 🔥 SELECTION FLOW */}
//       <div className="bg-white p-4 rounded shadow space-y-3">

//         <select
//           className="w-full border p-2"
//           onChange={(e)=>handleExam(e.target.value)}
//         >
//           <option>Select Exam</option>
//           {exams.map(e => (
//             <option key={e._id} value={e.slug}>
//               {e.title}
//             </option>
//           ))}
//         </select>

//         <div className="flex gap-3">
//           <button
//             onClick={()=>setMode("series")}
//             className={mode==="series" ? "bg-blue-500 text-white px-3 py-1" : ""}
//           >
//             Test Series
//           </button>

//           <button
//             onClick={()=>setMode("pyp")}
//             className={mode==="pyp" ? "bg-blue-500 text-white px-3 py-1" : ""}
//           >
//             PYP
//           </button>
//         </div>

//         {mode === "series" && (
//           <select onChange={(e)=>handleSeries(e.target.value)}>
//             <option>Select Series</option>
//             {series.map(s => (
//               <option key={s._id} value={s._id}>
//                 {s.title}
//               </option>
//             ))}
//           </select>
//         )}

//         {mode === "pyp" && (
//           <select onChange={(e)=>handlePYP(e.target.value)}>
//             <option>Select PYP</option>
//             {pyps.map(p => (
//               <option key={p._id} value={p._id}>
//                 {p.title}
//               </option>
//             ))}
//           </select>
//         )}

//         <select
//           onChange={(e)=>setForm({...form, test:e.target.value})}
//         >
//           <option>Select Test Paper</option>
//           {tests.map(t => (
//             <option key={t._id} value={t._id}>
//               {t.title}
//             </option>
//           ))}
//         </select>

//       </div>

//       {/* QUESTION FORM */}
//       <div className="bg-white p-4 mt-6 rounded shadow">

//         <textarea
//           placeholder="Question"
//           className="w-full border p-2 mb-3"
//           value={current.question}
//           onChange={(e)=>setCurrent({...current, question:e.target.value})}
//         />

//         {current.options.map((opt, i) => (
//           <div key={i} className="flex gap-2 mb-2">
//             <input
//               value={opt.text}
//               onChange={(e)=>handleOption(i, e.target.value)}
//               className="border p-2 flex-1"
//             />
//             <input
//               type="radio"
//               checked={opt.isCorrect}
//               onChange={()=>handleCorrect(i)}
//             />
//           </div>
//         ))}

//         <textarea
//           placeholder="Explanation"
//           className="w-full border p-2 mb-3"
//           value={current.explanation}
//           onChange={(e)=>setCurrent({...current, explanation:e.target.value})}
//         />

//         <button
//           onClick={addQuestion}
//           className="bg-green-500 text-white px-4 py-2"
//         >
//           ➕ Add Question
//         </button>
//       </div>

//       {/* PREVIEW */}
//       <div className="mt-6">
//         <h3 className="font-bold">Questions Added: {questions.length}</h3>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="mt-6 bg-blue-600 text-white px-6 py-3"
//       >
//         🚀 Save All Questions
//       </button>

//     </div>
//   );
// };

// export default CreateQuestion;





import { useState, useEffect } from "react";
import {
  getExams,
  getTestSeriesByExam,
  getPYPByExam,
  getTestsBySeries,
  getTestsByPYP,
  createQuestion
} from "../../services/test.service";

const CreateQuestion = () => {
  const [exams, setExams] = useState([]);
  const [series, setSeries] = useState([]);
  const [pyps, setPyps] = useState([]);
  const [tests, setTests] = useState([]);

  const [mode, setMode] = useState("series");

  const [form, setForm] = useState({
    exam: "",
    series: "",
    pyp: "",
    test: ""
  });

  const [questions, setQuestions] = useState([]);

  const [current, setCurrent] = useState({
    question: { en: "", hi: "" },
    options: [
      { text: { en: "", hi: "" }, isCorrect: false },
      { text: { en: "", hi: "" }, isCorrect: false },
      { text: { en: "", hi: "" }, isCorrect: false },
      { text: { en: "", hi: "" }, isCorrect: false }
    ],
    explanation: { en: "", hi: "" },
    section: "General",
    marks: 2,
    negativeMarks: 0.5
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await getExams();
    setExams(res.data);
  };

  const handleExam = async (slug) => {
    setForm({ exam: slug, series: "", pyp: "", test: "" });

    const s = await getTestSeriesByExam(slug);
    const p = await getPYPByExam(slug);

    setSeries(s.data);
    setPyps(p.data);
    setTests([]);
  };

  const handleSeries = async (id) => {
    setForm({ ...form, series: id, pyp: "", test: "" });
    const res = await getTestsBySeries(id);
    setTests(res.data);
  };

  const handlePYP = async (id) => {
    setForm({ ...form, pyp: id, series: "", test: "" });
    const res = await getTestsByPYP(id);
    setTests(res.data);
  };

  // ✅ OPTION HANDLER
  const handleOption = (i, field, val) => {
    const updated = [...current.options];
    updated[i].text[field] = val;
    setCurrent({ ...current, options: updated });
  };

  // ✅ CORRECT ANSWER
  const handleCorrect = (i) => {
    const updated = current.options.map((o, idx) => ({
      ...o,
      isCorrect: idx === i
    }));
    setCurrent({ ...current, options: updated });
  };

  // ✅ ADD QUESTION
//   const addQuestion = () => {
//     if (!current.question.en) return alert("Enter question");

//     setQuestions([...questions, current]);

//     setCurrent({
//       question: { en: "", hi: "" },
//       options: [
//         { text: { en: "", hi: "" }, isCorrect: false },
//         { text: { en: "", hi: "" }, isCorrect: false },
//         { text: { en: "", hi: "" }, isCorrect: false },
//         { text: { en: "", hi: "" }, isCorrect: false }
//       ],
//       explanation: { en: "", hi: "" },
//       section: "General",
//       marks: 2,
//       negativeMarks: 0.5
//     });
//   };


const addQuestion = () => {
  if (!current.question.en) {
    return alert("Enter question");
  }

  const hasCorrect = current.options.some(o => o.isCorrect);
  if (!hasCorrect) {
    return alert("Select correct answer");
  }

  setQuestions([...questions, current]);

  setCurrent({
    question: { en: "", hi: "" },
    options: [
      { text: { en: "", hi: "" }, isCorrect: false },
      { text: { en: "", hi: "" }, isCorrect: false },
      { text: { en: "", hi: "" }, isCorrect: false },
      { text: { en: "", hi: "" }, isCorrect: false }
    ],
    explanation: { en: "", hi: "" },
    section: "General",
    marks: 2,
    negativeMarks: 0.5
  });
};

  // ✅ FINAL SAVE
  const handleSubmit = async () => {
    if (!form.test) return alert("⚠️ Select Test");

    try {
      for (let q of questions) {
        await createQuestion({
          ...q,
          test: form.test
        });
      }

      alert("✅ Questions Saved");
      setQuestions([]);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving questions");
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">Create Questions</h2>

      {/* 🔥 SELECT FLOW */}
      <div className="bg-white p-4 rounded shadow space-y-3">

        <select onChange={(e)=>handleExam(e.target.value)} className="w-full border p-2">
          <option>Select Exam</option>
          {exams.map(e => (
            <option key={e._id} value={e.slug}>{e.title}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <button onClick={()=>setMode("series")} className={mode==="series" ? "bg-blue-500 text-white px-3 py-1" : ""}>
            Series
          </button>
          <button onClick={()=>setMode("pyp")} className={mode==="pyp" ? "bg-blue-500 text-white px-3 py-1" : ""}>
            PYP
          </button>
        </div>

        {mode === "series" && (
          <select onChange={(e)=>handleSeries(e.target.value)}>
            <option>Select Series</option>
            {series.map(s => (
              <option key={s._id} value={s._id}>{s.title}</option>
            ))}
          </select>
        )}

        {mode === "pyp" && (
          <select onChange={(e)=>handlePYP(e.target.value)}>
            <option>Select PYP</option>
            {pyps.map(p => (
              <option key={p._id} value={p._id}>{p.title}</option>
            ))}
          </select>
        )}

        {/* <select onChange={(e)=>setForm({...form, test:e.target.value})}>
          <option>Select Test</option>
          {tests.map(t => (
            <option key={t._id} value={t._id}>{t.title}</option>
          ))}
        </select> */}

        <select
  value={form.test}
  onChange={(e)=>setForm({...form, test:e.target.value})}
  className="border p-2 w-full"
>
  <option value="">Select Test</option>
  {tests.map(t => (
    <option key={t._id} value={t._id}>
      {t.title}
    </option>
  ))}
</select>

      </div>

      {/* 🔥 QUESTION FORM */}
      <div className="bg-white p-4 mt-6 rounded shadow space-y-3">

        <input
          placeholder="Question (English)"
          value={current.question.en}
          onChange={(e)=>setCurrent({...current, question:{...current.question, en:e.target.value}})}
          className="w-full border p-2"
        />

        <input
          placeholder="Question (Hindi)"
          value={current.question.hi}
          onChange={(e)=>setCurrent({...current, question:{...current.question, hi:e.target.value}})}
          className="w-full border p-2"
        />

        {/* OPTIONS */}
        {current.options.map((opt, i) => (
          <div key={i} className="border p-2 rounded">
            <input
              placeholder="Option EN"
              value={opt.text.en}
              onChange={(e)=>handleOption(i, "en", e.target.value)}
              className="border p-2 w-full mb-1"
            />

            <input
              placeholder="Option HI"
              value={opt.text.hi}
              onChange={(e)=>handleOption(i, "hi", e.target.value)}
              className="border p-2 w-full mb-1"
            />

            <label>
              <input
                type="radio"
                checked={opt.isCorrect}
                onChange={()=>handleCorrect(i)}
              /> Correct
            </label>
          </div>
        ))}

        {/* SECTION */}
        <input
          placeholder="Section (Math, Reasoning...)"
          value={current.section}
          onChange={(e)=>setCurrent({...current, section:e.target.value})}
          className="border p-2 w-full"
        />

        {/* MARKING */}
        <div className="flex gap-3">
          <input
            placeholder="Marks"
            value={current.marks}
            onChange={(e)=>setCurrent({...current, marks:e.target.value})}
            className="border p-2"
          />
          <input
            placeholder="Negative"
            value={current.negativeMarks}
            onChange={(e)=>setCurrent({...current, negativeMarks:e.target.value})}
            className="border p-2"
          />
        </div>

        {/* EXPLANATION */}
        <textarea
          placeholder="Explanation (EN)"
          value={current.explanation.en}
          onChange={(e)=>setCurrent({...current, explanation:{...current.explanation, en:e.target.value}})}
          className="w-full border p-2"
        />

        <textarea
          placeholder="Explanation (HI)"
          value={current.explanation.hi}
          onChange={(e)=>setCurrent({...current, explanation:{...current.explanation, hi:e.target.value}})}
          className="w-full border p-2"
        />

        <button
          onClick={addQuestion}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Question
        </button>


        {/* ✅ PREVIEW */}
<div className="mt-6 bg-white p-4 rounded shadow">
  <h3 className="font-bold mb-2">
    Questions Added: {questions.length}
  </h3>

  {questions.map((q, i) => (
    <div key={i} className="border p-3 mb-2 rounded">
      <p className="font-semibold">
        Q{i + 1}. {q.question.en}
      </p>

      <ul className="ml-4 text-sm">
        {q.options.map((opt, idx) => (
          <li key={idx}>
            {opt.text.en}
            {opt.isCorrect && " ✅"}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        🚀 Save All Questions
      </button>

    </div>
  );
};

export default CreateQuestion;