import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentAffairById } from "../services/test.service";

const CurrentAffairDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchCA();
  }, []);

  const fetchCA = async () => {
    const res = await getCurrentAffairById(id);
    setData(res.data);
  };

  const handleSelect = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-4">
          {data.title}
        </h2>

        <p className="text-gray-700 mb-6">
          {data.content}
        </p>

        {/* MCQs */}
        <div className="space-y-6">
          {data.mcqs.map((q, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">

              <p className="font-semibold mb-3">
                Q{i + 1}. {q.question}
              </p>

              {q.options.map((opt, idx) => {
                const isSelected = answers[i] === idx;
                const isCorrect = q.correctIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelect(i, idx)}
                    className={`p-2 border rounded mb-2 cursor-pointer
                      ${
                        isCorrect
                          ? "bg-green-100"
                          : isSelected
                          ? "bg-red-100"
                          : ""
                      }
                    `}
                  >
                    {opt}
                  </div>
                );
              })}

              {answers[i] !== undefined && (
                <p className="text-sm text-gray-600 mt-2">
                  <b>Explanation:</b> {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CurrentAffairDetails;