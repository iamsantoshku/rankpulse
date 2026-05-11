

// import { useEffect, useState } from "react";
// import {
//   getPopularTests,
//   getTestSeriesByExam,
//   getTestsBySeries,
//   getPYPByExam,
// } from "../../services/test.service";
// import TestCard from "./TestCard";
// import { useNavigate } from "react-router-dom";

// const PopularTests = () => {
//   const [tests, setTests] = useState([]);
//   const [counts, setCounts] = useState({}); // 🔥 store counts per exam
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTests();
//   }, []);


   

//   const fetchTests = async () => {
//   try {
//     const res = await getPopularTests();

//     console.log("API RESPONSE:", res.data);

//     const testArray = Array.isArray(res.data)
//       ? res.data
//       : res.data.data;

//     setTests(testArray || []);

//     const countMap = {};

//     for (let exam of testArray || []) {
//       const slug = exam.slug;

//       const seriesRes = await getTestSeriesByExam(slug);

//       let totalMocks = 0;

//       for (let s of seriesRes.data || []) {
//         const tRes = await getTestsBySeries(s._id);
//         totalMocks += tRes.data?.length || 0;
//       }

//       const pypRes = await getPYPByExam(slug);

//       countMap[slug] = {
//         mocks: totalMocks,
//         pyp: pypRes.data?.length || 0,
//       };
//     }

//     setCounts(countMap);

//   } catch (err) {
//     console.error(err);
//   }
// };
//   return (
//     <div className="mt-10">
//       <h2 className="text-3xl font-bold text-center mb-8">
//         Popular Test Series
//       </h2>

//       <div className="flex flex-wrap justify-center gap-8">
//         {tests.map((item) => {
//           const data = counts[item.slug] || { mocks: 0, pyp: 0 };

//           return (
//             <TestCard
//               key={item._id}
//               title={item.title}
//               logo={item.logo}
//               slug={item.slug}
//               examName={item.title}
//               features={[
//                 `${data.mocks} Full Mock Tests`,
//                 `${data.pyp} Previous Papers`,
//               ]}
//             />
//           );
//         })}
//       </div>

//       <div className="flex justify-center mt-8">
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

import { getPopularTests } from "../../services/test.service";

import TestCard from "./TestCard";

import { useNavigate } from "react-router-dom";

const PopularTests = () => {

  const [tests, setTests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {

    try {

      const res = await getPopularTests();

      setTests(res.data || []);

    } catch (err) {

      console.error(err);
    }
  };

  return (
    <div className="mt-10">

      {/* Heading */}
      <div className="text-center mb-10">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Popular Test Series
        </h2>

        <p className="text-gray-500 mt-2">
          Prepare smarter with India's best mock tests
        </p>

      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8">

        {tests.map((item) => (

          <TestCard
            key={item._id}

            title={item.title}
            logo={item.logo}
            slug={item.slug}
            examName={item.title}

            mockCount={item.mockCount}
            pypCount={item.pypCount}
            seriesCount={item.seriesCount}
          />
        ))}

      </div>

      {/* Explore Button */}
      <div className="flex justify-center mt-10">

        <button
          onClick={() => navigate("/exams")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
        >
          Explore All Exams
        </button>

      </div>
    </div>
  );
};

export default PopularTests;