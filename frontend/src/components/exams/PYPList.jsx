




import { useEffect, useState } from "react";
import {getTestsByPYP} from "../../services/test.service";
import { useParams } from "react-router-dom";

const PYPList = () => {
  const { slug } = useParams(); // ✅ FIXED (same as TestSeriesList)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [slug]); // ✅ dependency added

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTestsByPYP(slug);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load PYP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Loading state
  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // 🔥 Error state
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h2 className="text-2xl font-bold mb-6">Previous Year Papers</h2>

      {data.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {data.map((test) => (
            <div
              key={test._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{test.title}</h3>
              <p className="text-gray-500">{test.year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No PYP Available</p>
      )}
    </div>
  );
};

export default PYPList;