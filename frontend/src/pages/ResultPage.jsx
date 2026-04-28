import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttemptById } from "../services/test.service";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    const res = await getAttemptById(attemptId);
    setData(res.data);
  };

  if (!data) return <p>Loading...</p>;

  const accuracy = ((data.correct / data.attempted) * 100).toFixed(2);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">Test Result</h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-green-100 p-4 rounded">
          Score: {data.score}
        </div>

        <div className="bg-blue-100 p-4 rounded">
          Accuracy: {accuracy}%
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          Attempted: {data.attempted}
        </div>

        <div className="bg-red-100 p-4 rounded">
          Wrong: {data.wrong}
        </div>

      </div>

      <button
  onClick={() => navigate(`/review/${attemptId}`)}
  className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
>
  Review Solutions
</button>

    </div>
  );
};

export default ResultPage;