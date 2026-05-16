import { useNavigate } from "react-router-dom";

const PYPCard = ({ test }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">

      {/* LEFT */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {test.title}
        </h3>

        {/* Year + Shift */}
        <div className="flex gap-2 mt-1">
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
          <span> YEAR</span>  {test.year}
          </span>

          {test.shift && (
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">
              <span> SHIFT</span> {test.shift}
            </span>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span>❓ {test.totalQuestions} Qs</span>
          <span>📄 {test.totalMarks} Marks</span>
          <span>⏱ {test.duration} Mins</span>

          {test.tag && (
            <span className="bg-gray-200 px-2 py-1 rounded text-xs">
              {test.tag}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div>
        {test.isFree ? (
          <button
            // onClick={() => navigate(`/start-test/${test._id}`)}
            // className="bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-800"
            onClick={() => navigate(`/instructions/${test._id}`)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Start Now
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Unlock Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PYPCard;