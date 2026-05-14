

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getAttemptById,getLeaderboard } from "../services/test.service";
// import Leaderboard from "../components/analysis/Leaderboard";


// const AnalysisPage = () => {
//   const { attemptId } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await getAttemptById(attemptId);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!data) return <p className="p-6">Loading...</p>;

//   const {
//     score = 0,
//     correct = 0,
//     wrong = 0,
//     attempted = 0,
//     totalMarks = 100,
//     accuracy = 0
//   } = data;

//   const totalQuestions = correct + wrong + (data.unattempted || 0);

//   // 🔥 MOCK RANK + PERCENTILE (later replace with backend)
//   const percentile = Math.min(100, (score / totalMarks) * 100);
//   const rank = Math.floor(1000 - percentile * 10);

//   const CircleCard = ({ title, value, total, color, suffix = "" }) => {
//   const percentage = (value / total) * 100;
//   const radius = 50;
//   const stroke = 8;
//   const normalizedRadius = radius - stroke * 2;
//   const circumference = normalizedRadius * 2 * Math.PI;
//   const strokeDashoffset =
//     circumference - (percentage / 100) * circumference;

//   const colors = {
//     blue: "stroke-blue-500",
//     green: "stroke-green-500",
//     orange: "stroke-orange-500"
//   };

//   return (
//     <div className="bg-white p-4 rounded-xl shadow text-center">
//       <svg height={radius * 2} width={radius * 2} className="mx-auto">
//         <circle
//           stroke="#e5e7eb"
//           fill="transparent"
//           strokeWidth={stroke}
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//         />
//         <circle
//           stroke="currentColor"
//           className={colors[color]}
//           fill="transparent"
//           strokeWidth={stroke}
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round"
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//         />
//       </svg>

//       <h3 className="text-lg font-bold mt-2">
//         {value}{suffix}
//       </h3>
//       <p className="text-sm text-gray-500">{title}</p>
//     </div>
//   );
// };


// const ProgressBar = ({ label, value, total, color }) => {
//   const percent = (value / total) * 100;

//   return (
//     <div className="mb-3">
//       <div className="flex justify-between text-sm mb-1">
//         <span>{label}</span>
//         <span>{value}</span>
//       </div>

//       <div className="w-full bg-gray-200 h-2 rounded">
//         <div
//           className={`${color} h-2 rounded`}
//           style={{ width: `${percent}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// const SummaryBox = ({ label, value, color }) => {
//   const colors = {
//     green: "text-green-600",
//     red: "text-red-500",
//     blue: "text-blue-500"
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg">
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className={`font-semibold ${colors[color]}`}>
//         {value}
//       </p>
//     </div>
//   );
// };

// const StatCard = ({ title, value, color }) => {
//   const colors = {
//     green: "text-green-600",
//     red: "text-red-500",
//     gray: "text-gray-500",
//     blue: "text-blue-500",
//     purple: "text-purple-500"
//   };

//   return (
//     <div className="bg-white p-4 rounded-xl shadow text-center">
//       <p className="text-sm text-gray-500">{title}</p>
//       <h3 className={`text-lg font-bold ${colors[color]}`}>
//         {value}
//       </h3>
//     </div>
//   );
// };
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       {/* HEADER */}
//       <h2 className="text-2xl font-bold text-center mb-6">
//         {data.test?.title}
//       </h2>

//       {/* 🔥 TOP METRICS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//         <CircleCard
//           title="Score"
//           value={score}
//           total={totalMarks}
//           color="blue"
//         />

//         <CircleCard
//           title="Accuracy"
//           value={accuracy}
//           total={100}
//           color="green"
//           suffix="%"
//         />

//         <CircleCard
//           title="Attempted"
//           value={attempted}
//           total={totalQuestions}
//           color="orange"
//         />

//       </div>

//       {/* 🔥 STATS CARDS */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

//         <StatCard title="Correct" value={correct} color="green" />
//         <StatCard title="Wrong" value={wrong} color="red" />
//         <StatCard title="Skipped" value={totalQuestions - attempted} color="gray" />
//         <StatCard title="Rank" value={`#${rank}`} color="purple" />
//         <StatCard title="Percentile" value={`${percentile.toFixed(1)}%`} color="blue" />

//       </div>

//       {/* 🔥 PERFORMANCE SUMMARY */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4">
//           Performance Summary
//         </h3>

//         <div className="grid md:grid-cols-3 gap-4">

//           <SummaryBox
//             label="Strong Area"
//             value={accuracy > 70 ? "Good Accuracy 🎯" : "Needs Improvement"}
//             color="green"
//           />

//           <SummaryBox
//             label="Weak Area"
//             value={accuracy < 50 ? "Low Accuracy ⚠️" : "Moderate"}
//             color="red"
//           />

//           <SummaryBox
//             label="Time Management"
//             value={
//               data.timeTaken < 3600
//                 ? "Good Speed ⚡"
//                 : "Too Slow 🐢"
//             }
//             color="blue"
//           />

//         </div>
//       </div>

//       {/* 🔥 PROGRESS BAR SECTION */}
//       <div className="bg-white p-6 rounded-xl shadow">

//         <h3 className="text-lg font-semibold mb-4">
//           Question Breakdown
//         </h3>

//         <ProgressBar label="Correct" value={correct} total={totalQuestions} color="bg-green-500" />
//         <ProgressBar label="Wrong" value={wrong} total={totalQuestions} color="bg-red-500" />
//         <ProgressBar label="Skipped" value={totalQuestions - attempted} total={totalQuestions} color="bg-gray-400" />

//       </div>
//       {/* <Leaderboard/> */}
//       {/* <Leaderboard testId={data.test?._id} /> */}
//       <Leaderboard testId={data.test?._id} />

//     </div>
//   );
// };

// export default AnalysisPage;



// ============================================
// 📁 src/pages/AnalysisPage.jsx
// ============================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAttemptById
} from "../services/test.service";

import Leaderboard from "../components/analysis/Leaderboard";

const AnalysisPage = () => {
  const { attemptId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAttemptById(attemptId);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Failed to load analysis
      </div>
    );
  }

  const {
    score = 0,
    correct = 0,
    wrong = 0,
    attempted = 0,
    totalMarks = 100,
    accuracy = 0,
    timeTaken = 0
  } = data;

  const totalQuestions =
    correct +
    wrong +
    (data.unattempted || 0);

  const skipped = totalQuestions - attempted;

  const percentile = Math.min(
    100,
    ((score / totalMarks) * 100).toFixed(1)
  );

  const rank = Math.max(
    1,
    Math.floor(1000 - percentile * 8)
  );

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(
      (seconds % 3600) / 60
    );
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  const CircleProgress = ({
    title,
    value,
    total,
    color,
    suffix = ""
  }) => {
    const percentage = (value / total) * 100;

    const radius = 58;
    const stroke = 10;
    const normalizedRadius =
      radius - stroke * 2;

    const circumference =
      normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
      circumference -
      (percentage / 100) * circumference;

    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">

        <div className="relative">

          <svg
            height={radius * 2}
            width={radius * 2}
            className="-rotate-90"
          >
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            <circle
              stroke={color}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={
                strokeDashoffset
              }
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h3 className="text-2xl font-bold">
              {value}
              {suffix}
            </h3>

          </div>
        </div>

        <p className="mt-4 text-gray-600 font-medium">
          {title}
        </p>
      </div>
    );
  };

  const StatCard = ({
    title,
    value,
    bg,
    text
  }) => {
    return (
      <div className={`${bg} rounded-2xl p-5 shadow`}>
        <p className="text-sm font-medium text-gray-600">
          {title}
        </p>

        <h3
          className={`text-3xl font-bold mt-2 ${text}`}
        >
          {value}
        </h3>
      </div>
    );
  };

  const ProgressBar = ({
    title,
    value,
    total,
    color
  }) => {
    const percentage =
      (value / total) * 100;

    return (
      <div className="mb-5">

        <div className="flex justify-between mb-2">
          <p className="font-medium">
            {title}
          </p>

          <p className="font-semibold">
            {value}
          </p>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

          <div
            className={`${color} h-4 rounded-full transition-all duration-500`}
            style={{
              width: `${percentage}%`
            }}
          ></div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>
            <p className="text-indigo-600 font-semibold mb-2">
              Performance Analysis
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              {data.test?.title}
            </h1>

            <p className="text-gray-500 mt-2">
              Detailed insights of your test attempt
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">

            <div className="bg-indigo-100 px-5 py-3 rounded-2xl">
              <p className="text-sm text-gray-500">
                Rank
              </p>

              <h3 className="text-2xl font-bold text-indigo-700">
                #{rank}
              </h3>
            </div>

            <div className="bg-green-100 px-5 py-3 rounded-2xl">
              <p className="text-sm text-gray-500">
                Percentile
              </p>

              <h3 className="text-2xl font-bold text-green-700">
                {percentile}%
              </h3>
            </div>

          </div>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <CircleProgress
          title="Score"
          value={score}
          total={totalMarks}
          color="#4f46e5"
        />

        <CircleProgress
          title="Accuracy"
          value={accuracy.toFixed(1)}
          total={100}
          color="#16a34a"
          suffix="%"
        />

        <CircleProgress
          title="Attempted"
          value={attempted}
          total={totalQuestions}
          color="#ea580c"
        />

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

        <StatCard
          title="Correct"
          value={correct}
          bg="bg-green-50"
          text="text-green-600"
        />

        <StatCard
          title="Wrong"
          value={wrong}
          bg="bg-red-50"
          text="text-red-600"
        />

        <StatCard
          title="Skipped"
          value={skipped}
          bg="bg-gray-100"
          text="text-gray-700"
        />

        <StatCard
          title="Time Taken"
          value={formatTime(timeTaken)}
          bg="bg-blue-50"
          text="text-blue-600"
        />

        <StatCard
          title="Total Questions"
          value={totalQuestions}
          bg="bg-purple-50"
          text="text-purple-600"
        />

      </div>

      {/* PERFORMANCE */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* BREAKDOWN */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Question Breakdown
          </h2>

          <ProgressBar
            title="Correct Answers"
            value={correct}
            total={totalQuestions}
            color="bg-green-500"
          />

          <ProgressBar
            title="Wrong Answers"
            value={wrong}
            total={totalQuestions}
            color="bg-red-500"
          />

          <ProgressBar
            title="Skipped Questions"
            value={skipped}
            total={totalQuestions}
            color="bg-gray-500"
          />

        </div>

        {/* INSIGHTS */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            AI Performance Insights
          </h2>

          <div className="space-y-4">

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <h3 className="font-bold text-green-700">
                Strong Area
              </h3>

              <p className="text-sm mt-1 text-gray-700">
                {
                  accuracy >= 75
                    ? "Excellent accuracy and question solving ability."
                    : "Good attempt ratio but accuracy can improve."
                }
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <h3 className="font-bold text-red-700">
                Weak Area
              </h3>

              <p className="text-sm mt-1 text-gray-700">
                {
                  wrong > correct / 2
                    ? "Too many incorrect attempts. Improve precision."
                    : "Your mistakes are under control."
                }
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h3 className="font-bold text-blue-700">
                Time Management
              </h3>

              <p className="text-sm mt-1 text-gray-700">
                {
                  timeTaken <
                  data.test?.duration * 60 * 0.8
                    ? "Excellent speed management."
                    : "Try to increase solving speed."
                }
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* LEADERBOARD */}
      <Leaderboard testId={data.test?._id} />

    </div>
  );
};

export default AnalysisPage;