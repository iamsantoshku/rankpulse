




// import { useEffect, useState } from "react";

// import { getTestSeriesByExam, getTestsBySeries, getPYPByExam } from "../../services/test.service";
// import { useParams } from "react-router-dom";
// import TestListCard from "./TestListCard";
// import PYPCard from "./PYPCard";

// const TestSeriesList = () => {
//   const { slug } = useParams();

//   const [activeTab, setActiveTab] = useState("mock");

//   const [tests, setTests] = useState([]);
//   const [pyp, setPyp] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, [slug]);



// const fetchData = async () => {
//   try {
//     const seriesRes = await getTestSeriesByExam(slug);

//     let allTests = [];

//     for (let s of seriesRes.data) {
//       const tRes = await getTestsBySeries(s._id);
//       allTests = [...allTests, ...tRes.data];
//     }

//     setTests(allTests);

//     const pypRes = await getPYPByExam(slug);
//     setPyp(pypRes.data);

//   } catch (err) {
//     console.error(err);
//   }
// };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//         <h1>ssc</h1>

//       {/* HEADER */}
//       <h2 className="text-2xl font-bold mb-6">
//         Test Series
//       </h2>

//       {/* 🔥 TABS */}
//       <div className="flex gap-4 mb-6">
        
//         <button
//           onClick={() => setActiveTab("mock")}
//           className={`px-5 py-2 rounded-full font-medium ${
//             activeTab === "mock"
//               ? "bg-indigo-600 text-white"
//               : "bg-white border"
//           }`}
//         >
//           Mocks ({tests.length})
//         </button>

//         <button
//           onClick={() => setActiveTab("pyp")}
//           className={`px-5 py-2 rounded-full font-medium ${
//             activeTab === "pyp"
//               ? "bg-indigo-600 text-white"
//               : "bg-white border"
//           }`}
//         >
//           PYP ({pyp.length})
//         </button>

//       </div>

//       {/* 🔥 CONTENT */}
//       <div className="space-y-4">

//         {activeTab === "mock" &&
//           (tests.length > 0 ? (
//             tests.map((test) => (
//               <TestListCard key={test._id} test={test} />
//             ))
//           ) : (
//             <p>No Mock Tests Available</p>
//           ))}

//           {activeTab === "pyp" &&
//   (pyp.length > 0 ? (
//     pyp.map((item) => (
//       <PYPCard key={item._id} test={item} />
//     ))
//   ) : (
//     <p>No PYP Available</p>
//   ))}

//       </div>
//     </div>
//   );
// };

// export default TestSeriesList;




// import { useEffect, useState } from "react";
// import {
//   getTestSeriesByExam,
//   getTestsBySeries,
//   getPYPByExam,
//   getTestsByPYP,
//   getExams, // 🔥 add this
// } from "../../services/test.service";
// import { useParams } from "react-router-dom";
// import TestListCard from "./TestListCard";
// import PYPCard from "./PYPCard";

// const TestSeriesList = () => {
//   const { slug } = useParams();

//   const [activeTab, setActiveTab] = useState("mock");

//   const [tests, setTests] = useState([]);
//   const [pyp, setPyp] = useState([]);
//   const [exam, setExam] = useState(null); // 🔥 store exam details

//   useEffect(() => {
//     fetchData();
//   }, [slug]);

//   const fetchData = async () => {
//     try {
//       // 🔥 1. Get exam details
//       const examRes = await getExams();
//       const foundExam = examRes.data.find((e) => e.slug === slug);
//       setExam(foundExam);

//       // 🔥 2. Get mock tests
//       const seriesRes = await getTestSeriesByExam(slug);

//       let allTests = [];

//       for (let s of seriesRes.data) {
//         const tRes = await getTestsBySeries(s._id);
//         allTests = [...allTests, ...tRes.data];
//       }

//       setTests(allTests);

//       // 🔥 3. Get PYP

//        for (let s of seriesRes.data) {
//         const tRes = await getTestsByPYP(s._id);
//         allTests = [...allTests, ...tRes.data];
//       }
//       // const pypRes = await getPYPByExam(slug);
//       // setPyp(pypRes.data);
//       setTests(allTests);

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔥 Dynamic Subheading Generator
//   const getSubheading = () => {
//     if (!exam) return "";

//     return `Boost your ${exam.title} preparation with RankPulse. Practice ${tests.length} mock tests and ${pyp.length} previous year papers to improve speed, accuracy, and confidence.`;
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       {/* 🔥 HEADER SECTION */}
//       <div className="bg-gradient-to-b from-indigo-50 to-white border-b px-6 py-10 mb-8">

//   <div className="max-w-4xl mx-auto text-center">

//     {/* Logo */}
//     <div className="flex justify-center mb-4">
//       <img
//         src={exam?.logo || "https://via.placeholder.com/60"}
//         alt={exam?.title}
//         className="w-16 h-16 object-contain rounded-full shadow-md bg-white p-2"
//       />
//     </div>

//     {/* Title */}
//     <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//       {exam?.title || "Loading..."}
//     </h1>

//     {/* Subheading */}
//     <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed max-w-2xl mx-auto">
//       {getSubheading()}
//     </p>

//     {/* Optional Stats (🔥 makes it look pro) */}
//     <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
//       <span className="bg-white px-4 py-1 rounded-full shadow">
//         📝 {tests.length} Mocks
//       </span>
//       <span className="bg-white px-4 py-1 rounded-full shadow">
//         📄 {pyp.length} PYP
//       </span>
//     </div>

//   </div>
// </div>

//       {/* 🔥 CONTENT */}
//       <div className="p-6">

//         {/* Tabs */}
//         <div className="flex gap-4 mb-6">
          
//           <button
//             onClick={() => setActiveTab("mock")}
//             className={`px-5 py-2 rounded-full font-medium ${
//               activeTab === "mock"
//                 ? "bg-indigo-600 text-white"
//                 : "bg-white border"
//             }`}
//           >
//             Mocks ({tests.length})
//           </button>

//           <button
//             onClick={() => setActiveTab("pyp")}
//             className={`px-5 py-2 rounded-full font-medium ${
//               activeTab === "pyp"
//                 ? "bg-indigo-600 text-white"
//                 : "bg-white border"
//             }`}
//           >
//             PYP ({pyp.length})
//           </button>

//         </div>

//         {/* Content */}
//         <div className="space-y-4">

//           {activeTab === "mock" &&
//             (tests.length > 0 ? (
//               tests.map((test) => (
//                 <TestListCard key={test._id} test={test} />
//               ))
//             ) : (
//               <p>No Mock Tests Available</p>
//             ))}

//           {activeTab === "pyp" &&
//             (pyp.length > 0 ? (
//               pyp.map((test) => (
//                 <PYPCard key={test._id} test={test} />
//               ))
//             ) : (
//               <p>No PYP Available</p>
//             ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestSeriesList;




import { useEffect, useState } from "react";

import {
  getTestSeriesByExam,
  getTestsBySeries,
  getPYPByExam,
  getTestsByPYP,
  getExams
} from "../../services/test.service";

import { useParams } from "react-router-dom";

import TestListCard from "./TestListCard";
import PYPCard from "./PYPCard";

const TestSeriesList = () => {

  const { slug } = useParams();

  const [activeTab, setActiveTab] =
    useState("mock");

  const [tests, setTests] = useState([]);
  const [pyp, setPyp] = useState([]);

  const [exam, setExam] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH DATA
  // =========================================
  useEffect(() => {

    fetchData();

  }, [slug]);

  const fetchData = async () => {

    try {

      setLoading(true);

      // =====================================
      // EXAM DETAILS
      // =====================================
      const examRes = await getExams();

      const foundExam =
        examRes.data.find(
          (e) => e.slug === slug
        );

      setExam(foundExam);

      // =====================================
      // MOCK TESTS
      // =====================================
      const seriesRes =
        await getTestSeriesByExam(slug);

      let mockTests = [];

      for (let s of seriesRes.data) {

        const tRes =
          await getTestsBySeries(s._id);

        mockTests = [
          ...mockTests,
          ...tRes.data
        ];
      }

      setTests(mockTests);

      // =====================================
      // GET ALL PYP
      // =====================================
      const pypRes =
        await getPYPByExam(slug);

      let pypTests = [];

      // =====================================
      // GET TESTS OF EACH PYP
      // =====================================
      for (let p of pypRes.data) {

        const tRes =
          await getTestsByPYP(p._id);

        pypTests = [
          ...pypTests,
          ...tRes.data
        ];
      }

      console.log("PYP TESTS:", pypTests);

      setPyp(pypTests);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // SUBHEADING
  // =========================================
  const getSubheading = () => {

    if (!exam) return "";

    return `Boost your ${exam.title} preparation with RankPulse. Practice ${tests.length} mock tests and ${pyp.length} previous year papers to improve speed, accuracy, and confidence.`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-b from-indigo-50 to-white border-b px-6 py-10 mb-8">

        <div className="max-w-4xl mx-auto text-center">

          {/* LOGO */}
          <div className="flex justify-center mb-4">

            <img
              src={
                exam?.logo ||
                "https://via.placeholder.com/60"
              }
              alt={exam?.title}
              className="w-16 h-16 object-contain rounded-full shadow-md bg-white p-2"
            />

          </div>

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {exam?.title || "Loading..."}
          </h1>

          {/* SUBHEADING */}
          <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed max-w-2xl mx-auto">
            {getSubheading()}
          </p>

          {/* STATS */}
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">

            <span className="bg-white px-4 py-1 rounded-full shadow">
              📝 {tests.length} Mocks
            </span>

            <span className="bg-white px-4 py-1 rounded-full shadow">
              📄 {pyp.length} PYP
            </span>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* TABS */}
        <div className="flex gap-4 mb-6">

          <button
            onClick={() =>
              setActiveTab("mock")
            }
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "mock"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            Mocks ({tests.length})
          </button>

          <button
            onClick={() =>
              setActiveTab("pyp")
            }
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "pyp"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            PYP ({pyp.length})
          </button>

        </div>

        {/* MOCK */}
        {activeTab === "mock" && (

          <div className="space-y-4">

            {tests.length > 0 ? (

              tests.map((test) => (

                <TestListCard
                  key={test._id}
                  test={test}
                />

              ))

            ) : (

              <p>No Mock Tests Available</p>

            )}

          </div>

        )}

        {/* PYP */}
        {activeTab === "pyp" && (

          <div className="space-y-4">

            {pyp.length > 0 ? (

              pyp.map((test) => (

                <PYPCard
                  key={test._id}
                  test={test}
                />

              ))

            ) : (

              <p>No PYP Available</p>

            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default TestSeriesList;