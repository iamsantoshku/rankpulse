import { useEffect, useState } from "react";
import { getUserAttempts } from "../services/test.service";
import { useNavigate } from "react-router-dom";

const AttemptList = () => {
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const res = await getUserAttempts();
      setAttempts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">
        Attempt Analysis
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto">
        {attempts.map((a) => (
          <div
            key={a._id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {a.test?.title}
              </h3>
              <p className="text-sm text-gray-500">
                Attempted on{" "}
                {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  navigate(`/solution/${a._id}`)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Solution
              </button>

              <button
                onClick={() =>
                  navigate(`/analysis/${a._id}`)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Analysis
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttemptList;