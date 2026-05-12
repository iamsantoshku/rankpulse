// import {
//   useEffect,
//   useState
// } from "react";

// import {
//   getTodayQuiz
// } from "../services/dailyQuiz.service";

// import {
//   useNavigate
// } from "react-router-dom";

// const DailyQuizPage = () => {

//   const [quiz, setQuiz] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {

//     fetchQuiz();

//   }, []);

//   const fetchQuiz = async () => {

//     const res = await getTodayQuiz();

//     setQuiz(res.data);
//   };

//   if (!quiz)
//     return <p>No Quiz Today</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

//         <h1 className="text-3xl font-bold">
//           {quiz.title}
//         </h1>

//         <p className="mt-2 text-gray-500">
//           {quiz.questions.length} Questions
//         </p>

//         <button
//           onClick={() =>
//             navigate(`/daily-quiz/${quiz._id}`)
//           }
//           className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
//         >
//           Start Quiz
//         </button>

//       </div>
//     </div>
//   );
// };

// export default DailyQuizPage;




import { useEffect, useState } from "react";
import { getTodayQuiz } from "../services/dailyQuiz.service";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Clock,
  Brain,
  Zap,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Target,
} from "lucide-react";

const DailyQuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const res = await getTodayQuiz();
      setQuiz(res.data);
    } catch (error) {
      console.error("Failed to fetch daily quiz:", error);
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mb-6" />
          <div className="h-5 w-96 max-w-full bg-gray-200 rounded mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 bg-gray-100 rounded-2xl"
              />
            ))}
          </div>

          <div className="h-14 w-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  // No Quiz Available
  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-6">
            <CalendarDays className="w-12 h-12 text-indigo-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            No Quiz Available Today
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Our experts are preparing new questions for you.
            Check back tomorrow and continue improving your
            score.
          </p>

          <button
            onClick={fetchQuiz}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Refresh
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm shadow-sm">
            <Sparkles className="w-4 h-4" />
            Today's Challenge
          </div>
        </div>

        {/* Main Card */}
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl border border-gray-100">
          {/* Background Decoration */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-70" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-70" />

          <div className="relative z-10 p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {quiz.title}
              </h1>

              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {quiz.description ||
                  "Sharpen your aptitude, reasoning, and general awareness with today's expertly crafted quiz."}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
              <div className="bg-indigo-50 rounded-2xl p-5 text-center border border-indigo-100">
                <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-600 flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {quiz.questions?.length || 0}
                </p>
                <p className="text-sm text-gray-600">
                  Questions
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 text-center border border-purple-100">
                <div className="w-12 h-12 mx-auto rounded-xl bg-purple-600 flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {quiz.duration || 10}
                </p>
                <p className="text-sm text-gray-600">
                  Minutes
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 text-center border border-amber-100">
                <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500 flex items-center justify-center mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  100%
                </p>
                <p className="text-sm text-gray-600">
                  Accuracy Goal
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                <div className="w-12 h-12 mx-auto rounded-xl bg-green-600 flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  Daily
                </p>
                <p className="text-sm text-gray-600">
                  Practice
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="font-semibold text-gray-800">
                  Instant Results
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Get your score immediately after submission.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="font-semibold text-gray-800">
                  Detailed Solutions
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Understand every answer with explanations.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="font-semibold text-gray-800">
                  Daily Improvement
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Build consistency and boost exam readiness.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() =>
                  navigate(`/daily-quiz/${quiz._id}`)
                }
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Today's Quiz
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <p className="mt-4 text-sm text-gray-500">
                Challenge yourself and track your progress every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuizPage;