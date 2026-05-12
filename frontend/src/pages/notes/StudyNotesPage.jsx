import { useEffect, useState } from "react";

import { getExams }
from "../../services/test.service";

import { useNavigate } from "react-router-dom";

const StudyNotesPage = () => {

  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await getExams();
    setExams(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-5xl font-bold text-center mb-4">
        Access all Exam Study Notes
      </h1>

      <div className="flex justify-center gap-8 mb-14 mt-6">

        <div>✅ Created by Toppers</div>
        <div>✅ Vetted by Experts</div>
        <div>✅ Includes all Exams</div>

      </div>

      <h2 className="text-3xl font-bold text-center mb-10">
        Select Your Exam
      </h2>

      <div className="grid grid-cols-4 gap-6">

        {exams.map((exam) => (

          <div
            key={exam._id}
            onClick={() =>
              navigate(`/study-notes/${exam._id}`)
            }
            className="bg-white p-5 rounded-2xl shadow hover:shadow-xl cursor-pointer flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <img
                src={exam.logo}
                className="w-12 h-12 rounded-full object-cover"
              />

              <p className="font-bold">
                {exam.title}
              </p>

            </div>

            <span>➜</span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyNotesPage;