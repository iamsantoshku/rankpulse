


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import {
  getQuestionsByTest,
  getTestById
} from "../services/test.service";

import { AuthContext } from "../context/AuthContext";

const InstructionsPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  // ✅ FIX: Hook INSIDE component
  const { user } = useContext(AuthContext);

  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);

  useEffect(() => {
    fetchData();
  }, [testId]);

  const fetchData = async () => {
    try {
      const qRes = await getQuestionsByTest(testId);
      const tRes = await getTestById(testId);

      setQuestions(qRes.data);
      setTest(tRes.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleStart = () => {
    if (!user) {
      alert("⚠️ Please login first");
      navigate("/login");
      return;
    }

    navigate(`/start-test/${testId}`);
  };

  if (!test) return <p className="p-6">Loading...</p>;

  const exam = test?.testSeries?.exam || test?.pyp?.exam;

  // ✅ SECTION LOGIC
  let sections = [];

  if (test.hasSections && test.sections.length > 0) {
    sections = test.sections;
  } else {
    // fallback auto sections (like Testbook default)
    const subjects = ["English", "Reasoning", "Math", "GK"];
    const perSection = Math.floor(questions.length / 4);

    sections = subjects.map((sub) => ({
      name: sub,
      questions: perSection,
      marks: perSection * 2
    }));
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="bg-white border border-gray-300 rounded shadow max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-[#e9e1c9] p-4 border-b">
          <h2 className="text-lg font-semibold">
            Instructions, Terms & Conditions
          </h2>
        </div>

        <div className="p-6">

          {/* TITLE */}
          <h3 className="text-lg font-bold mb-4">
            {exam?.title?.toUpperCase()} - {test.title}
          </h3>

          {/* ========================= */}
          {/* SECTION 1 */}
          {/* ========================= */}
          <div className="border p-4 mb-6">

            <h3 className="font-semibold mb-3">
              1. Exam Overview / परीक्षा का संक्षिप्त विवरण
            </h3>

            <ul className="list-disc ml-6 text-sm space-y-1">
              <li>
                Duration: <b>{test.duration} minutes</b> /
                <span className="text-gray-600"> {test.duration} मिनट</span>
              </li>

              <li>
                Total Questions: <b>{questions.length}</b>
              </li>

              <li>
                Negative Marking: <b>25%</b>
              </li>

              <li>
                Number of Sections: <b>{sections.length}</b>
              </li>
            </ul>

            {/* TABLE */}
            <div className="mt-4 border">
              <table className="w-full text-sm text-center border-collapse">

                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">Section</th>
                    <th className="border p-2">Subject</th>
                    <th className="border p-2">Number of Questions</th>
                    <th className="border p-2">Maximum Marks</th>
                  </tr>
                </thead>

                <tbody>
                  {sections.map((sec, i) => (
                    <tr key={i}>
                      <td className="border p-2">
                        PART-{String.fromCharCode(65 + i)}
                      </td>
                      <td className="border p-2">{sec.name}</td>
                      <td className="border p-2">{sec.questions}</td>
                      <td className="border p-2">{sec.marks}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>

          {/* ========================= */}
          {/* SECTION 2 */}
          {/* ========================= */}
          <div className="border p-4 mb-6">

            <h3 className="font-semibold mb-3">
              2. Timing & Submission / समय और उत्तर जमा करना
            </h3>

            <ul className="list-disc ml-6 text-sm space-y-2">
              <li>
                The timer will be shown on top right.
              </li>
              <li>
                Test auto submits after time ends.
              </li>
              <li>
                No manual submission required.
              </li>
              <li>
                Ensure stable internet connection.
              </li>
            </ul>

          </div>

          {/* ========================= */}
          {/* SECTION 3 */}
          {/* ========================= */}
          <div className="border p-4 mb-6">

            <h3 className="font-semibold mb-3">
              3. Language / भाषा
            </h3>

            <p className="text-sm">
              {test.language === "both"
                ? "English & Hindi"
                : test.language}
            </p>

          </div>

          {/* ========================= */}
          {/* FOOTER BUTTONS */}
          {/* ========================= */}
          <div className="flex justify-between mt-6">

            <button
              onClick={() => navigate(-1)}
              className="bg-orange-500 text-white px-6 py-2 rounded"
            >
              Go to Tests
            </button>

            {/* <button
              onClick={() => navigate(`/start-test/${testId}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Next
            </button> */}

            <button onClick={handleStart} className="bg-blue-600 text-white px-6 py-2 rounded">
  Start Test
</button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;