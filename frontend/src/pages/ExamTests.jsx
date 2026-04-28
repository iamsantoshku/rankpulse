import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestSeriesByExam } from "../services/test.service";
import TestListCard from "../components/exams/TestListCard";

const ExamTests = () => {
  const { slug } = useParams();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, [slug]);

  const fetchTests = async () => {
    const res = await getTestSeriesByExam(slug);
    setTests(res.data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h2 className="text-2xl font-bold mb-6">
        Test Series
      </h2>

      <div className="space-y-4">
        {tests.map((test) => (
          <TestListCard key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default ExamTests;