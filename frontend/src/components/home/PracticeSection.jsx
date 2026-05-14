// import Card from "../common/Card";

// const PracticeSection = () => {
//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-bold mb-4">🧠 Online Practice</h2>

//       <div className="grid grid-cols-3 gap-4">
//         <Card title="Mock Tests" icon="📝"  path="/exams"/>
//         <Card title="Daily Quiz" icon="❓" />
//         <Card title="Typing Test" icon="⌨️" />
//       </div>
//     </div>
//   );
// };

// export default PracticeSection;



// import Card from "../common/Card";

// const PracticeSection = () => {
//   return (
//     <div className="mt-10 px-4">
      
//       {/* Header */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         🧠 Online Practice
//       </h2>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
//         <Card
//           title="Mock Tests"
//           icon="📝"
//           path="/exams"   // ✅ NOW WORKS
//         />

//         <Card
//           title="Daily Quiz"
//           icon="❓"
//           path="/daily-quiz"
//         />

//         <Card
//           title="Study Notes"
//           icon="⌨️"
//           path="/study-notes"   // ✅ NOW WORKS
//         />

//       </div>
//     </div>
//   );
// };

// export default PracticeSection;



// ==============================
// src/components/home/PracticeSection.jsx
// ==============================

import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Mock Tests",
    icon: "📝",
    desc: "Full syllabus mock tests with detailed analytics and rankings.",
    path: "/exams",
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Daily Quiz",
    icon: "❓",
    desc: "Improve speed and accuracy with daily exam-level quizzes.",
    path: "/daily-quiz",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Study Notes",
    icon: "📘",
    desc: "Exam-wise handwritten notes and PDF study material.",
    path: "/study-notes",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Current Affairs",
    icon: "📰",
    desc: "Daily & monthly current affairs for all government exams.",
    path: "/current-affairs",
    color: "from-pink-500 to-purple-500"
  },
  {
    title: "Previous Papers",
    icon: "📄",
    desc: "Practice real previous year questions from actual exams.",
    path: "/exams",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Performance Analytics",
    icon: "📊",
    desc: "AI-powered insights, rank prediction and weak area analysis.",
    path: "/dashboard",
    color: "from-yellow-500 to-orange-500"
  }
];

const PracticeSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-20">

      {/* Heading */}
      <div className="text-center mb-14">

        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          🚀 Everything You Need
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-gray-900">
          Smart Preparation Tools
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          Practice smarter with advanced tools specially built for
          government exam aspirants.
        </p>

      </div>

      {/* Cards */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {features.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="
              group cursor-pointer
              bg-white border border-gray-100
              rounded-3xl p-8
              shadow-sm hover:shadow-2xl
              transition-all duration-500
              hover:-translate-y-2
              relative overflow-hidden
            "
          >

            {/* Glow */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-10
              bg-gradient-to-br ${item.color}
              transition duration-500
            `} />

            {/* Icon */}
            <div className={`
              w-20 h-20 rounded-2xl
              bg-gradient-to-br ${item.color}
              flex items-center justify-center
              text-4xl shadow-xl
            `}>
              {item.icon}
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mt-6 text-gray-800">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-3 leading-relaxed">
              {item.desc}
            </p>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-2 text-indigo-600 font-semibold">
              Explore
              <span className="group-hover:translate-x-2 transition">
                →
              </span>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default PracticeSection;