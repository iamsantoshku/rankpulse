import { useEffect, useState } from "react";

import {
  createStudyNote
} from "../../services/studyNote.service";

import { getExams }
from "../../services/test.service";

const AdminStudyNotes = () => {

  const [exams, setExams] = useState([]);

  const [form, setForm] = useState({
    exam: "",
    subject: "",
    title: ""
  });

  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await getExams();
    setExams(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("exam", form.exam);
    data.append("subject", form.subject);
    data.append("title", form.title);
    data.append("pdf", pdf);

    await createStudyNote(data);

    alert("Study Note Uploaded");

    setForm({
      exam: "",
      subject: "",
      title: ""
    });

    setPdf(null);
  };

  return (
    <div className="p-6">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Upload Study Notes
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                exam: e.target.value
              })
            }
          >
            <option>Select Exam</option>

            {exams.map((exam) => (
              <option
                key={exam._id}
                value={exam._id}
              >
                {exam.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Subject"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                subject: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value
              })
            }
          />

          <input
            type="file"
            accept=".pdf"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setPdf(e.target.files[0])
            }
          />

          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Upload PDF
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminStudyNotes;