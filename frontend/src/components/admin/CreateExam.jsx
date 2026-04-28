import { useState, useEffect } from "react";
import { createExam, getExams } from "../../services/test.service";

const CreateExam = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    logo: "",
    isPopular: false
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

    await createExam(form);

    alert("Exam Created ✅");

    setForm({
      title: "",
      description: "",
      logo: "",
      isPopular: false
    });

    fetchExams();
  };

  return (
    <div className="p-6">
      
      {/* FORM */}
      <h2 className="text-2xl font-bold mb-4">Create Exam</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3 max-w-md"
      >
        <input
          className="w-full border p-2 rounded"
          placeholder="Exam Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Logo URL"
          value={form.logo}
          onChange={(e) =>
            setForm({ ...form, logo: e.target.value })
          }
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPopular}
            onChange={(e) =>
              setForm({ ...form, isPopular: e.target.checked })
            }
          />
          Popular Exam
        </label>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Exam
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-xl font-bold mt-8 mb-4">All Exams</h2>

      <div className="grid grid-cols-3 gap-4">
        {exams.map((exam) => (
          <div key={exam._id} className="bg-white p-4 rounded shadow">
            <img
              src={exam.logo}
              alt=""
              className="w-10 h-10 mb-2"
            />
            <h3 className="font-semibold">{exam.title}</h3>
            <p className="text-sm text-gray-500">
              {exam.description}
            </p>

            {exam.isPopular && (
              <span className="text-xs text-green-600 font-bold">
                Popular
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateExam;