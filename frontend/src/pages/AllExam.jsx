// import { useEffect, useState } from "react";
// import { getExams } from "../services/test.service";
// // import ExamCard from "../components/exams/ExamCard";
// import ExamCard from "../components/exams/ExamCard";
// const AllExam = () => {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     try {
//       const res = await getExams();
//       setExams(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
      
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Explore Exams
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Choose your exam and start practicing
//         </p>
//       </div>

//       {/* LOADING */}
//       {loading ? (
//         <p>Loading exams...</p>
//       ) : exams.length === 0 ? (
//         <p>No exams available</p>
//       ) : (
//         <div className="grid gap-6 
//           grid-cols-1 
//           sm:grid-cols-2 
//           md:grid-cols-3 
//           lg:grid-cols-4"
//         >
//           {exams.map((exam) => (
//             <ExamCard key={exam._id} exam={exam} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllExam;




// import { useEffect, useState } from "react";
// import { getExams } from "../services/test.service";
// import ExamCard from "../components/exams/ExamCard";

// const AllExam = () => {
//   const [groupedExams, setGroupedExams] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     try {
//       const res = await getExams();

//       // 🔥 Group by category (SSC, RRB, etc.)
//       const grouped = {};

//       res.data.forEach((exam) => {
//         const category = exam.category || "Other";

//         if (!grouped[category]) {
//           grouped[category] = [];
//         }

//         grouped[category].push(exam);
//       });

//       setGroupedExams(grouped);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">

//       {/* Header */}
//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Latest Online Test Series by Test Ranking
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Online Test Series for Government Exams
//         </p>
//       </div>

//       {/* Loading */}
//       {loading ? (
//         <p className="text-center">Loading exams...</p>
//       ) : (
//         Object.keys(groupedExams).map((category) => (
//           <div key={category} className="mb-10">

//             {/* Category Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {category}
//               </h2>

//               <button className="text-indigo-600 text-sm font-medium hover:underline">
//                 View All →
//               </button>
//             </div>

//             {/* Cards Grid */}
//             <div className="grid gap-6 
//               grid-cols-1 
//               sm:grid-cols-2 
//               md:grid-cols-3 
//               lg:grid-cols-3"
//             >
//               {groupedExams[category].map((exam) => (
//                 <ExamCard key={exam._id} exam={exam} />
//               ))}
//             </div>

//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default AllExam;




import { useEffect, useState } from "react";
import {
  getExams,
  getTestSeriesByExam,
  getTestsBySeries,
  getPYPByExam,
} from "../services/test.service";
import ExamCard from "../components/exams/ExamCard";

const AllExam = () => {
  const [groupedExams, setGroupedExams] = useState({});
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await getExams();

      const grouped = {};
      const countMap = {};

      for (let exam of res.data) {
        const slug = exam.slug;

        // 🔥 GROUP BY FIRST WORD (SSC, RRB, etc.)
        const category = exam.title.split(" ")[0];

        if (!grouped[category]) {
          grouped[category] = [];
        }

        grouped[category].push(exam);

        // 🔥 FETCH COUNTS (same as PopularTests)
        const seriesRes = await getTestSeriesByExam(slug);

        let totalMocks = 0;

        for (let s of seriesRes.data) {
          const tRes = await getTestsBySeries(s._id);
          totalMocks += tRes.data.length;
        }

        const pypRes = await getPYPByExam(slug);

        countMap[slug] = {
          mocks: totalMocks,
          pyp: pypRes.data.length,
        };
      }

      setGroupedExams(grouped);
      setCounts(countMap);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Latest Online Test Series by RankPulse
        </h1>
        <p className="text-gray-500 mt-1">
          Online Test Series for Government Exams
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center">Loading exams...</p>
      ) : (
        Object.keys(groupedExams).map((category) => (
          <div key={category} className="mb-12">

            {/* Category Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {category}
            </h2>

            {/* Grid */}
            <div className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4   /* ✅ 4 cards in large screen */
            ">
              {groupedExams[category].map((exam) => {
                const data = counts[exam.slug] || { mocks: 0, pyp: 0 };

                return (
                  <ExamCard
                    key={exam._id}
                    exam={exam}
                    mocks={data.mocks}
                    pyp={data.pyp}
                  />
                );
              })}
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default AllExam;