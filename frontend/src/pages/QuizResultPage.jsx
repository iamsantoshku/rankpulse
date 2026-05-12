import {
  useLocation
} from "react-router-dom";

const QuizResultPage = () => {

  const { state } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow text-center">

        <h1 className="text-4xl font-bold">
          Quiz Result
        </h1>

        <p className="mt-6 text-2xl">
          Score:
        </p>

        <h2 className="text-5xl font-bold text-indigo-600">
          {state.score}/{state.total}
        </h2>

      </div>
    </div>
  );
};

export default QuizResultPage;