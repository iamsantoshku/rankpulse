import { useParams } from "react-router-dom";
import { useState } from "react";
import TestSeriesList from "../components/exams/TestSeriesList";
import PYPList from "../components/exams/PYPList";

const ExamDetails = () => {
  const { slug } = useParams();

  const [tab, setTab] = useState("test");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Exam Details
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("test")}
          className={`px-4 py-2 rounded ${
            tab === "test" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Test Series
        </button>

        <button
          onClick={() => setTab("pyp")}
          className={`px-4 py-2 rounded ${
            tab === "pyp" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Previous Year Papers
        </button>
      </div>

      {/* Content */}
      {tab === "test" ? (
        <TestSeriesList />
      ) : (
        <PYPList />
      )}
    </div>
  );
};

export default ExamDetails;