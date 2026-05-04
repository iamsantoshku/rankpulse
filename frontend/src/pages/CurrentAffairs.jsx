import { useEffect, useState } from "react";
import { getCurrentAffairs } from "../services/test.service.js";
import { useNavigate } from "react-router-dom";

const CurrentAffairs = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCA();
  }, []);

  const fetchCA = async () => {
    const res = await getCurrentAffairs();
    setData(res.data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-3xl font-bold text-center mb-6">
        📰 Daily Current Affairs
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">

        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/ca/${item._id}`)}
          >
            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>

            <p className="text-gray-600 mt-2 line-clamp-2">
              {item.content}
            </p>

            <div className="flex justify-between mt-3 text-sm text-gray-500">
              <span>{item.source}</span>
              <span>{new Date(item.date).toDateString()}</span>
            </div>

            <p className="text-blue-500 mt-2">
              {item.mcqs?.length || 0} MCQs
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CurrentAffairs;