import { useState, useEffect } from "react";
import { createPYP, getExams } from "../../services/test.service";

const CreatePYP = () => {
  const [form, setForm] = useState({
    title: "",
    exam: "",
    year: "",
    totalQuestions: "",
    totalMarks: "",
    duration: "",
    shift: "",
    tag: "",
    isFree: true,
    price: ""
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

    await createPYP(form);

    alert("✅ PYP Created");

    setForm({
      title: "",
      exam: "",
      year: "",
      totalQuestions: "",
      totalMarks: "",
      duration: "",
      shift: "",
      tag: "",
      isFree: true,
      price: ""
    });
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      
      <h2 className="text-2xl font-bold mb-6">
        Create Previous Year Paper
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-2xl space-y-4"
      >

        {/* Title */}
        <input
          className="w-full border p-2 rounded"
          placeholder="PYP Title (e.g. SSC CGL 2023 Shift 1)"
          value={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})}
        />

        {/* Exam */}
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

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Year (e.g. 2023)"
            className="border p-2 rounded"
            value={form.year}
            onChange={(e)=>setForm({...form,year:e.target.value})}
          />

          <input
            placeholder="Shift (e.g. Shift 1)"
            className="border p-2 rounded"
            value={form.shift}
            onChange={(e)=>setForm({...form,shift:e.target.value})}
          />

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
            Free
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!form.isFree}
              onChange={()=>setForm({...form,isFree:false})}
            />
            Paid
          </label>

        </div>

        {/* Price */}
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
          Create PYP
        </button>

      </form>
    </div>
  );
};

export default CreatePYP;