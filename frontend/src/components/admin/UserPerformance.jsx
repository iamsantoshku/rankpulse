import { useEffect, useState } from "react";
import { getUserPerformance } from "../../services/test.service";
import { useParams } from "react-router-dom";

const UserPerformance = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getUserPerformance(id);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load performance");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading performance...</p>;

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">📊 User Performance</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No attempts found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {data.map((a) => (
            <div
              key={a._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                {a.test?.title || "Test"}
              </h3>

              <div className="space-y-1 text-sm text-gray-700">

                <p>🎯 Score: <b>{a.score}</b></p>
                <p>📈 Accuracy: <b>{a.accuracy}%</b></p>
                <p>✅ Correct: {a.correct}</p>
                <p>❌ Wrong: {a.wrong}</p>

              </div>

              {/* PROGRESS BAR */}
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: `${a.accuracy}%` }}
                  />
                </div>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default UserPerformance;