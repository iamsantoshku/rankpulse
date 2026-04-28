// import { useState, useEffect } from "react";
// import { createTestSeries, getExams } from "../../services/test.service";

// const CreateTestSeries = () => {
//   const [form, setForm] = useState({
//     title: "",
//     exam: "",
//     totalTests: 0
//   });

//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     const res = await getExams();
//     setExams(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createTestSeries(form);
//     alert("Test Series Created");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-3">
      
//       <input
//         placeholder="Title"
//         onChange={(e)=>setForm({...form,title:e.target.value})}
//       />

//       <select
//         onChange={(e)=>setForm({...form,exam:e.target.value})}
//       >
//         <option>Select Exam</option>
//         {exams.map(e => (
//           <option key={e._id} value={e._id}>
//             {e.title}
//           </option>
//         ))}
//       </select>

//       <input
//         type="number"
//         placeholder="Total Tests"
//         onChange={(e)=>setForm({...form,totalTests:e.target.value})}
//       />

//       <button>Create</button>
//     </form>
//   );
// };

// export default CreateTestSeries;





import { useState, useEffect } from "react";
import { createTestSeries, getExams } from "../../services/test.service";

const CreateTestSeries = () => {
  const [form, setForm] = useState({
    title: "",
    exam: "",
    totalQuestions: "",
    totalMarks: "",
    duration: "",
    isFree: true,
    price: "",
    tag: "",
    testNumber: ""
  });

  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await getExams();
    setExams(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTestSeries(form);

    alert("✅ Test Series Created");

    setForm({
      title: "",
      exam: "",
      totalQuestions: "",
      totalMarks: "",
      duration: "",
      isFree: true,
      price: "",
      tag: "",
      testNumber: ""
    });
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      
      <h2 className="text-2xl font-bold mb-6">
        Create Test Series
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-2xl space-y-4"
      >
        
        {/* Title */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Test Title (e.g. SSC CGL Tier 1 - Mock Test 1)"
          value={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})}
        />

        {/* Exam Dropdown */}
        <select
          className="w-full border p-2 rounded"
          value={form.exam}
          onChange={(e)=>setForm({...form,exam:e.target.value})}
        >
          <option value="">Select Exam</option>
          {exams.map((e)=>(
            <option key={e._id} value={e._id}>
              {e.title}
            </option>
          ))}
        </select>

        {/* Grid Fields */}
        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Total Questions"
            className="border p-2 rounded"
            value={form.totalQuestions}
            onChange={(e)=>setForm({...form,totalQuestions:e.target.value})}
          />

          <input
            type="number"
            placeholder="Total Marks"
            className="border p-2 rounded"
            value={form.totalMarks}
            onChange={(e)=>setForm({...form,totalMarks:e.target.value})}
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            className="border p-2 rounded"
            value={form.duration}
            onChange={(e)=>setForm({...form,duration:e.target.value})}
          />

          <input
            type="number"
            placeholder="Test Number"
            className="border p-2 rounded"
            value={form.testNumber}
            onChange={(e)=>setForm({...form,testNumber:e.target.value})}
          />

        </div>

        {/* Tag */}
        <input
          placeholder="Tag (SSC / RRB / UPSC)"
          className="w-full border p-2 rounded"
          value={form.tag}
          onChange={(e)=>setForm({...form,tag:e.target.value})}
        />

        {/* Free / Paid */}
        <div className="flex items-center gap-4">
          
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={form.isFree}
              onChange={()=>setForm({...form,isFree:true})}
            />
            Free Test
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!form.isFree}
              onChange={()=>setForm({...form,isFree:false})}
            />
            Paid Test
          </label>

        </div>

        {/* Price (only if paid) */}
        {!form.isFree && (
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={(e)=>setForm({...form,price:e.target.value})}
          />
        )}

        {/* Submit */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          Create Test Series
        </button>

      </form>
    </div>
  );
};

export default CreateTestSeries;