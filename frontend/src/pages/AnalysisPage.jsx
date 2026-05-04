

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttemptById,getLeaderboard } from "../services/test.service";
import Leaderboard from "../components/analysis/Leaderboard";


const AnalysisPage = () => {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAttemptById(attemptId);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <p className="p-6">Loading...</p>;

  const {
    score = 0,
    correct = 0,
    wrong = 0,
    attempted = 0,
    totalMarks = 100,
    accuracy = 0
  } = data;

  const totalQuestions = correct + wrong + (data.unattempted || 0);

  // 🔥 MOCK RANK + PERCENTILE (later replace with backend)
  const percentile = Math.min(100, (score / totalMarks) * 100);
  const rank = Math.floor(1000 - percentile * 10);

  const CircleCard = ({ title, value, total, color, suffix = "" }) => {
  const percentage = (value / total) * 100;
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const colors = {
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    orange: "stroke-orange-500"
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <svg height={radius * 2} width={radius * 2} className="mx-auto">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          className={colors[color]}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <h3 className="text-lg font-bold mt-2">
        {value}{suffix}
      </h3>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
};


const ProgressBar = ({ label, value, total, color }) => {
  const percent = (value / total) * 100;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

const SummaryBox = ({ label, value, color }) => {
  const colors = {
    green: "text-green-600",
    red: "text-red-500",
    blue: "text-blue-500"
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-semibold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    green: "text-green-600",
    red: "text-red-500",
    gray: "text-gray-500",
    blue: "text-blue-500",
    purple: "text-purple-500"
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-lg font-bold ${colors[color]}`}>
        {value}
      </h3>
    </div>
  );
};
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-center mb-6">
        {data.test?.title}
      </h2>

      {/* 🔥 TOP METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <CircleCard
          title="Score"
          value={score}
          total={totalMarks}
          color="blue"
        />

        <CircleCard
          title="Accuracy"
          value={accuracy}
          total={100}
          color="green"
          suffix="%"
        />

        <CircleCard
          title="Attempted"
          value={attempted}
          total={totalQuestions}
          color="orange"
        />

      </div>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

        <StatCard title="Correct" value={correct} color="green" />
        <StatCard title="Wrong" value={wrong} color="red" />
        <StatCard title="Skipped" value={totalQuestions - attempted} color="gray" />
        <StatCard title="Rank" value={`#${rank}`} color="purple" />
        <StatCard title="Percentile" value={`${percentile.toFixed(1)}%`} color="blue" />

      </div>

      {/* 🔥 PERFORMANCE SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Performance Summary
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <SummaryBox
            label="Strong Area"
            value={accuracy > 70 ? "Good Accuracy 🎯" : "Needs Improvement"}
            color="green"
          />

          <SummaryBox
            label="Weak Area"
            value={accuracy < 50 ? "Low Accuracy ⚠️" : "Moderate"}
            color="red"
          />

          <SummaryBox
            label="Time Management"
            value={
              data.timeTaken < 3600
                ? "Good Speed ⚡"
                : "Too Slow 🐢"
            }
            color="blue"
          />

        </div>
      </div>

      {/* 🔥 PROGRESS BAR SECTION */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-lg font-semibold mb-4">
          Question Breakdown
        </h3>

        <ProgressBar label="Correct" value={correct} total={totalQuestions} color="bg-green-500" />
        <ProgressBar label="Wrong" value={wrong} total={totalQuestions} color="bg-red-500" />
        <ProgressBar label="Skipped" value={totalQuestions - attempted} total={totalQuestions} color="bg-gray-400" />

      </div>
      {/* <Leaderboard/> */}
      {/* <Leaderboard testId={data.test?._id} /> */}
      <Leaderboard testId={data.test?._id} />

    </div>
  );
};

export default AnalysisPage;