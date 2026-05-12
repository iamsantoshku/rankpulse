import {
  getSubjectsByExam
} from "../../services/studyNote.service";

import { useEffect, useState } from "react";

import { useNavigate, useParams }
from "react-router-dom";

const SubjectNotesPage = () => {

  const { examId } = useParams();

  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const res =
      await getSubjectsByExam(examId);

    setSubjects(res.data);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">

      <h1 className="text-4xl font-bold mb-10">
        Subjects
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {subjects.map((subject, i) => (

          <div
            key={i}
            onClick={() =>
              navigate(
                `/study-notes/${examId}/${subject}`
              )
            }
            className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-xl"
          >

            <h2 className="text-2xl font-bold">
              {subject}
            </h2>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectNotesPage;