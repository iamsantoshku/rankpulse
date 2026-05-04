import { useEffect, useState } from "react";
import {
  getCurrentAffairs,
  generateCurrentAffair,
  publishCA,
  deleteCA
} from "../../services/test.service.js";

const AdminGenerateCA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ FIXED
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCA();
  }, []);

  const fetchCA = async () => {
    try {
      const res = await getCurrentAffairs();
      console.log("CA DATA:", res.data); // 🔍 DEBUG
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    }
  };

  // 🤖 GENERATE CA
  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      await generateCurrentAffair();

      await fetchCA();
    } catch (err) {
      console.error(err);
      setError("Failed to generate current affairs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ PUBLISH
  const handlePublish = async (id) => {
    try {
      await publishCA(id);
      fetchCA();
    } catch (err) {
      console.error(err);
      setError("Publish failed");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await deleteCA(id);
      fetchCA();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Current Affairs Admin
        </h2>

        {/* 🤖 GENERATE BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-5 py-2 rounded text-white ${
            loading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Generating..." : "🤖 Generate CA"}
        </button>
      </div>

      {/* ❗ ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 mb-4 rounded">
          {error}
        </div>
      )}

      {/* 📄 EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No Current Affairs Found
        </div>
      ) : (
        <div className="space-y-4">

          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
            >

              {/* TITLE */}
              <h3 className="text-lg font-semibold">
                {item.title}
              </h3>

              {/* CONTENT */}
              <p className="text-sm text-gray-600 mt-2">
                {item.content}
              </p>

              {/* SOURCE */}
              <p className="text-xs text-gray-400 mt-1">
                Source: {item.source || "Unknown"}
              </p>

              {/* STATUS */}
              <p
                className={`text-sm mt-2 font-medium ${
                  item.isPublished
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {item.isPublished ? "Published" : "Draft"}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-4">

                {!item.isPublished && (
                  <button
                    onClick={() => handlePublish(item._id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Publish
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

              {/* 📊 MCQ COUNT */}
              {item.mcqs?.length > 0 && (
                <p className="text-xs text-gray-500 mt-3">
                  {item.mcqs.length} MCQs generated
                </p>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default AdminGenerateCA;