// import { useNavigate } from "react-router-dom";
// import Card from "../common/Card";

// const CurrentAffairs = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="mt-6">
      
//       {/* Heading */}
//       <h2
//         onClick={() => navigate("/current-affairs")}
//         className="text-xl font-bold mb-4 cursor-pointer hover:text-indigo-600"
//       >
//         📢 Current Affairs Updates
//       </h2>

//       {/* Cards */}
//       <div className="grid grid-cols-2 gap-4">

//         <div onClick={() => navigate("/current-affairs")} className="cursor-pointer">
//           <Card title="Daily Current Affairs" icon="📰" />
//         </div>

//         <div onClick={() => navigate("/current-affairs")} className="cursor-pointer">
//           <Card title="CA Monthly Magazine" icon="📘" />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CurrentAffairs;



// ==============================
// src/components/home/CurrentAffairs.jsx
// ==============================

import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Daily Current Affairs",
    desc: "Stay updated with important national & international events.",
    icon: "📰",
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Monthly Magazine",
    desc: "Revision PDFs and one-liner magazines for exam preparation.",
    icon: "📘",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Quiz Based CA",
    desc: "Practice current affairs through MCQ quizzes daily.",
    icon: "❓",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Important PDFs",
    desc: "Download important current affairs notes & PDFs instantly.",
    icon: "📄",
    color: "from-pink-500 to-purple-500"
  }
];

const CurrentAffairs = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>

          <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-3">
            📢 Daily Updates
          </div>

          <h2 className="text-4xl font-black text-gray-900">
            Current Affairs Hub
          </h2>

          <p className="text-gray-500 mt-2">
            Daily updates, quizzes, PDFs and monthly magazines.
          </p>

        </div>

        <button
          onClick={() => navigate("/current-affairs")}
          className="
            bg-indigo-600 hover:bg-indigo-700
            text-white px-6 py-3 rounded-2xl
            font-semibold transition
          "
        >
          Explore Current Affairs
        </button>

      </div>

      {/* Grid */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">

        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate("/current-affairs")}
            className="
              group cursor-pointer
              bg-white rounded-3xl p-6
              border border-gray-100
              shadow-sm hover:shadow-2xl
              transition-all duration-500
              hover:-translate-y-2
              relative overflow-hidden
            "
          >

            {/* Background Glow */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-10
              bg-gradient-to-br ${card.color}
              transition duration-500
            `} />

            {/* Icon */}
            <div className={`
              w-16 h-16 rounded-2xl
              bg-gradient-to-br ${card.color}
              flex items-center justify-center
              text-3xl shadow-lg
            `}>
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mt-5 text-gray-800">
              {card.title}
            </h3>

            {/* Desc */}
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              {card.desc}
            </p>

            {/* CTA */}
            <div className="mt-5 text-indigo-600 font-semibold flex items-center gap-2">
              Read More
              <span className="group-hover:translate-x-1 transition">
                →
              </span>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default CurrentAffairs;