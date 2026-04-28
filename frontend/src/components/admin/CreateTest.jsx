// import { useState, useEffect } from "react";
// import {
//   createTest,
//   getTestSeriesByExam,
//   getPYPByExam,
//   getExams
// } from "../../services/test.service";

// const CreateTest = () => {
//   const [exams, setExams] = useState([]);
//   const [series, setSeries] = useState([]);
//   const [pyps, setPyps] = useState([]);

//   const [mode, setMode] = useState("series");

//   const [form, setForm] = useState({
//     title: "",
//     testSeries: "",
//     pyp: "",
//     totalQuestions: "",
//     duration: "",
//     isFree: true,
//     price: ""
//   });

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     const res = await getExams();
//     setExams(res.data);
//   };

//   const handleExam = async (slug) => {
//     const s = await getTestSeriesByExam(slug);
//     const p = await getPYPByExam(slug);

//     setSeries(s.data);
//     setPyps(p.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await createTest(form);

//     alert("✅ Test Created");
//   };



//   return (
//     <div className="ml-64 p-6">
//       <h2>Create Test Paper</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">

//         <input
//           placeholder="Test Title"
//           onChange={(e)=>setForm({...form,title:e.target.value})}
//         />

//         <select onChange={(e)=>handleExam(e.target.value)}>
//           <option>Select Exam</option>
//           {exams.map(e => (
//             <option key={e._id} value={e.slug}>
//               {e.title}
//             </option>
//           ))}
//         </select>

//         <div>
//           <button type="button" onClick={()=>setMode("series")}>
//             Series
//           </button>
//           <button type="button" onClick={()=>setMode("pyp")}>
//             PYP
//           </button>
//         </div>

//         {mode === "series" && (
//           <select
//             onChange={(e)=>setForm({...form,testSeries:e.target.value, pyp:""})}
//           >
//             <option>Select Series</option>
//             {series.map(s => (
//               <option key={s._id} value={s._id}>
//                 {s.title}
//               </option>
//             ))}
//           </select>
//         )}

//         {mode === "pyp" && (
//           <select
//             onChange={(e)=>setForm({...form,pyp:e.target.value, testSeries:""})}
//           >
//             <option>Select PYP</option>
//             {pyps.map(p => (
//               <option key={p._id} value={p._id}>
//                 {p.title}
//               </option>
//             ))}
//           </select>
//         )}

//         <input
//           placeholder="Total Questions"
//           onChange={(e)=>setForm({...form,totalQuestions:e.target.value})}
//         />

//         <input
//           placeholder="Duration"
//           onChange={(e)=>setForm({...form,duration:e.target.value})}
//         />

//         <button>Create Test</button>

//       </form>
//     </div>
//   );
// };

// export default CreateTest;





import { useState, useEffect } from "react";
import {
  createTest,
  getTestSeriesByExam,
  getPYPByExam,
  getExams
} from "../../services/test.service";

const CreateTest = () => {
  const [exams, setExams] = useState([]);
  const [series, setSeries] = useState([]);
  const [pyps, setPyps] = useState([]);

  const [mode, setMode] = useState("series");

  const [form, setForm] = useState({
    title: "",
    testSeries: "",
    pyp: "",
    totalQuestions: "",
    duration: "",
    hasSections: false,
    sections: [],
    language: "both",
    isFree: true,
    price: ""
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await getExams();
    setExams(res.data);
  };

  const handleExam = async (slug) => {
    const s = await getTestSeriesByExam(slug);
    const p = await getPYPByExam(slug);

    setSeries(s.data);
    setPyps(p.data);
  };

  // ✅ ADD SECTION
  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        { name: "", questions: "", marks: "" }
      ]
    });
  };

  const handleSectionChange = (i, field, value) => {
    const updated = [...form.sections];
    updated[i][field] = value;
    setForm({ ...form, sections: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTest(form);

    alert("✅ Test Created");
  };

  return (
    <div className="ml-64 p-6">
      <h2 className="text-xl font-bold mb-4">Create Test</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Test Title"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,title:e.target.value})}
        />

        <select onChange={(e)=>handleExam(e.target.value)}>
          <option>Select Exam</option>
          {exams.map(e => (
            <option key={e._id} value={e.slug}>
              {e.title}
            </option>
          ))}
        </select>

        <div>
          <button type="button" onClick={()=>setMode("series")}>
            Series
          </button>
          <button type="button" onClick={()=>setMode("pyp")}>
            PYP
          </button>
        </div>

        {mode === "series" && (
          <select
            onChange={(e)=>setForm({...form,testSeries:e.target.value, pyp:""})}
          >
            <option>Select Series</option>
            {series.map(s => (
              <option key={s._id} value={s._id}>
                {s.title}
              </option>
            ))}
          </select>
        )}

        {mode === "pyp" && (
          <select
            onChange={(e)=>setForm({...form,pyp:e.target.value, testSeries:""})}
          >
            <option>Select PYP</option>
            {pyps.map(p => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
        )}

        <input
          placeholder="Total Questions"
          onChange={(e)=>setForm({...form,totalQuestions:e.target.value})}
        />

        <input
          placeholder="Duration (minutes)"
          onChange={(e)=>setForm({...form,duration:e.target.value})}
        />

        {/* ✅ LANGUAGE */}
        <select
          onChange={(e)=>setForm({...form,language:e.target.value})}
        >
          <option value="both">English + Hindi</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>

        {/* ✅ SECTION TOGGLE */}
        <label>
          <input
            type="checkbox"
            checked={form.hasSections}
            onChange={(e)=>setForm({...form,hasSections:e.target.checked})}
          />
          Section Wise Test
        </label>

        {/* ✅ SECTIONS */}
        {form.hasSections && (
          <div className="border p-3">
            <button type="button" onClick={addSection}>
              ➕ Add Section
            </button>

            {form.sections.map((sec, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <input
                  placeholder="Subject (Maths, GK...)"
                  onChange={(e)=>handleSectionChange(i,"name",e.target.value)}
                />
                <input
                  placeholder="Questions"
                  onChange={(e)=>handleSectionChange(i,"questions",e.target.value)}
                />
                <input
                  placeholder="Marks"
                  onChange={(e)=>handleSectionChange(i,"marks",e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        <button className="bg-blue-600 text-white px-4 py-2">
          Create Test
        </button>

      </form>
    </div>
  );
};

export default CreateTest;