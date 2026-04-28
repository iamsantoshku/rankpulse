import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttemptById } from "../services/test.service";

const ReviewPage = () => {
  const { attemptId } = useParams();

  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAttemptById(attemptId);
    setData(res.data);
  };

  if (!data) return <p className="p-6">Loading...</p>;

  const getStatus = (q, selected) => {
    if (selected === undefined) return "skipped";

    const correctIndex = q.options.findIndex(o => o.isCorrect);

    return selected === correctIndex ? "correct" : "wrong";
  };

  const filteredQuestions = data.answers.filter((a) => {
    const status = getStatus(a.question, a.selected);

    if (filter === "all") return true;
    return filter === status;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-2xl font-bold mb-4">Review Solutions</h2>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-6">
          {["all", "correct", "wrong", "skipped"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* QUESTIONS */}
        <div className="space-y-6">

          {filteredQuestions.map((item, index) => {
            const q = item.question;
            const selected = item.selected;

            const correctIndex = q.options.findIndex(o => o.isCorrect);

            return (
              <div key={q._id} className="bg-white p-4 rounded shadow">

                <h3 className="font-semibold mb-2">
                  Q{index + 1}. {q.question?.en}
                </h3>

                <div className="space-y-2">
                  {q.options.map((opt, i) => {

                    let style = "border p-2 rounded";

                    if (i === correctIndex) {
                      style += " bg-green-100 border-green-500";
                    }

                    if (i === selected && i !== correctIndex) {
                      style += " bg-red-100 border-red-500";
                    }

                    return (
                      <div key={opt._id} className={style}>
                        {opt.text?.en}
                      </div>
                    );
                  })}
                </div>

                {/* EXPLANATION */}
                {q.explanation?.en && (
                  <div className="mt-3 bg-gray-50 p-3 rounded">
                    <b>Explanation:</b> {q.explanation.en}
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default ReviewPage;