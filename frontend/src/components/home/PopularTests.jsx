

// import { useEffect, useState } from "react";
// import { getPopularTests } from "../../services/test.service";
// import TestCard from "./TestCard";
// import { useNavigate } from "react-router-dom";

// const PopularTests = () => {
//   const [tests, setTests] = useState([]);
//    const navigate = useNavigate();

//   useEffect(() => {
//     fetchTests();
//   }, []);

//   const fetchTests = async () => {
//     const res = await getPopularTests();
//     setTests(res.data);
//   };

//   return (
//     <div className="mt-10">
//       <h2 className="text-3xl font-bold text-center mb-8">
//         Popular Test Series
//       </h2>

//       <div className="flex flex-wrap justify-center gap-8">
//         {tests.map((item) => (




// <TestCard
//   key={item._id}
//   title={item.title}
//   logo={item.logo}   // ✅ FIXED
//   slug={item.slug}
  
//   examName={item.title} // fallback
//   features={[
//     `${item.totalTests || 0} Full Mock Tests`,
//     `${item.previousPapers || 0} Previous Papers`
//   ]}
// />
//         ))}
//       </div>

//             <div className="flex justify-center mt-8">
//         <button
//           onClick={() => navigate("/exams")}
//           className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
//         >
//           Explore All Exams
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PopularTests;






import { useEffect, useState } from "react";
import {
  getPopularTests,
  getTestSeriesByExam,
  getTestsBySeries,
  getPYPByExam,
} from "../../services/test.service";
import TestCard from "./TestCard";
import { useNavigate } from "react-router-dom";

const PopularTests = () => {
  const [tests, setTests] = useState([]);
  const [counts, setCounts] = useState({}); // 🔥 store counts per exam
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await getPopularTests();
      setTests(res.data);

      // 🔥 fetch counts for each exam
      const countMap = {};

      for (let exam of res.data) {
        const slug = exam.slug;

        // get all test series
        const seriesRes = await getTestSeriesByExam(slug);

        let totalMocks = 0;

        for (let s of seriesRes.data) {
          const tRes = await getTestsBySeries(s._id);
          totalMocks += tRes.data.length;
        }

        // get PYP
        const pypRes = await getPYPByExam(slug);

        countMap[slug] = {
          mocks: totalMocks,
          pyp: pypRes.data.length,
        };
      }

      setCounts(countMap);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Popular Test Series
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {tests.map((item) => {
          const data = counts[item.slug] || { mocks: 0, pyp: 0 };

          return (
            <TestCard
              key={item._id}
              title={item.title}
              logo={item.logo}
              slug={item.slug}
              examName={item.title}
              features={[
                `${data.mocks} Full Mock Tests`,
                `${data.pyp} Previous Papers`,
              ]}
            />
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/exams")}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Explore All Exams
        </button>
      </div>
    </div>
  );
};

export default PopularTests;