import { useState } from "react";
import { bulkUploadQuestions } from "../../services/test.service";

const AddQuestionBulk = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [testId, setTestId] = useState("");
  const [preview, setPreview] = useState([]);

  // ✅ PARSE JSON
  const handlePreview = () => {
    try {
      const data = JSON.parse(jsonInput);
      setPreview(data);
    } catch (err) {
      alert("❌ Invalid JSON format");
    }
  };

  // ✅ UPLOAD
  const handleUpload = async () => {
    if (!testId) return alert("Enter Test ID");

    try {
      const data = JSON.parse(jsonInput);

      const res = await bulkUploadQuestions({
        questions: data,
        testId
      });

      alert(`✅ ${res.data.count} Questions Uploaded`);
      setJsonInput("");
      setPreview([]);

    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-4">
        📦 Bulk Upload Questions
      </h2>

      {/* TEST ID */}
      <input
        placeholder="Enter Test ID"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {/* JSON INPUT */}
      <textarea
        rows={10}
        placeholder="Paste JSON here..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="w-full border p-3 font-mono text-sm"
      />

      {/* ACTIONS */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handlePreview}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Preview
        </button>

        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {/* PREVIEW */}
      {preview.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-3">
            Preview ({preview.length} Questions)
          </h3>

          {preview.slice(0, 5).map((q, i) => (
            <div key={i} className="border p-3 mb-2 rounded">
              <p className="font-medium">{q.question}</p>

              <ul className="ml-4 list-disc">
                {q.options.map((opt, idx) => (
                  <li key={idx}>
                    {opt}
                    {idx === q.correctIndex && " ✅"}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {preview.length > 5 && (
            <p className="text-sm text-gray-500">
              Showing first 5 questions...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddQuestionBulk;