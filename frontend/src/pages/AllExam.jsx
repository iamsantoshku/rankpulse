




// import { useEffect, useState } from "react";
// import {
//   getExams,
//   getTestSeriesByExam,
//   getTestsBySeries,
//   getPYPByExam,
// } from "../services/test.service";
// import ExamCard from "../components/exams/ExamCard";

// const AllExam = () => {
//   const [groupedExams, setGroupedExams] = useState({});
//   const [counts, setCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     try {
//       const res = await getExams();
//       const exams = res.data || [];

//       // ✅ GROUP FAST (no delay)
//       const grouped = exams.reduce((acc, exam) => {
//         const category = exam.title.split(" ")[0];
//         if (!acc[category]) acc[category] = [];
//         acc[category].push(exam);
//         return acc;
//       }, {});

//       setGroupedExams(grouped); // 🔥 show UI early

//       // ✅ PARALLEL COUNT FETCH (BIG OPTIMIZATION)
//       const countPromises = exams.map(async (exam) => {
//         const slug = exam.slug;

//         try {
//           // parallel calls
//           const [seriesRes, pypRes] = await Promise.all([
//             getTestSeriesByExam(slug),
//             getPYPByExam(slug),
//           ]);

//           // get all test series IDs
//           const seriesList = seriesRes.data || [];

//           // fetch tests in parallel
//           const testPromises = seriesList.map((s) =>
//             getTestsBySeries(s._id)
//           );

//           const testResults = await Promise.all(testPromises);

//           let totalMocks = 0;
//           testResults.forEach((t) => {
//             totalMocks += t.data?.length || 0;
//           });

//           return {
//             slug,
//             mocks: totalMocks,
//             pyp: pypRes.data?.length || 0,
//           };
//         } catch {
//           return {
//             slug,
//             mocks: 0,
//             pyp: 0,
//           };
//         }
//       });

//       const results = await Promise.all(countPromises);

//       // ✅ convert array → object
//       const countMap = {};
//       results.forEach((item) => {
//         countMap[item.slug] = {
//           mocks: item.mocks,
//           pyp: item.pyp,
//         };
//       });

//       setCounts(countMap);

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">

//       {/* HEADER */}
//       <div className="mb-10 text-center">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Latest Online Test Series by RankPulse
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Online Test Series for Government Exams
//         </p>
//       </div>

//       {/* LOADING */}
//       {loading && Object.keys(groupedExams).length === 0 ? (
//         <p className="text-center">Loading exams...</p>
//       ) : (
//         Object.keys(groupedExams).map((category) => (
//           <div key={category} className="mb-12">

//             {/* CATEGORY */}
//             <h2 className="text-xl font-bold text-gray-800 mb-6">
//               {category}
//             </h2>

//             {/* GRID */}
//             <div className="
//               grid gap-6
//               grid-cols-1
//               sm:grid-cols-2
//               md:grid-cols-3
//               lg:grid-cols-4
//             ">
//               {groupedExams[category].map((exam) => {
//                 const data = counts[exam.slug] || {
//                   mocks: 0,
//                   pyp: 0,
//                 };

//                 return (
//                   <ExamCard
//                     key={exam._id}
//                     exam={exam}
//                     mocks={data.mocks}
//                     pyp={data.pyp}
//                   />
//                 );
//               })}
//             </div>

//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default AllExam;





import { useEffect, useMemo, useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Grid3X3,
  LayoutGrid,
  BookOpen,
  FileText,
  ArrowRight,
  Star,
} from "lucide-react";

import {
  getExams,
  getTestSeriesByExam,
  getTestsBySeries,
  getPYPByExam,
} from "../services/test.service";

/* =========================================================
   EXAM CARD
========================================================= */

const ExamCard = memo(({ exam, mocks = 0, pyp = 0, view = "grid" }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/exam/${exam.slug}`);
  }, [navigate, exam.slug]);

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl border border-gray-200
        bg-white shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
        ${
          view === "list"
            ? "flex items-center justify-between p-5"
            : "flex flex-col p-5"
        }
      `}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-50 via-transparent to-blue-50 pointer-events-none" />

      {/* TOP */}
      <div
        className={`relative z-10 ${
          view === "list"
            ? "flex items-center gap-4"
            : "flex flex-col items-center text-center"
        }`}
      >
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gray-50 border flex items-center justify-center overflow-hidden shadow-sm">
          <img
            src={exam.logo || "https://via.placeholder.com/80"}
            alt={exam.title}
            loading="lazy"
            className="w-full h-full object-contain p-2 transition duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80";
            }}
          />
        </div>

        <div className={view === "list" ? "flex-1" : "mt-4"}>
          {/* Title */}
          <h2
            className={`
              font-bold text-gray-800 line-clamp-2
              ${view === "list" ? "text-lg" : "text-xl"}
            `}
          >
            {exam.title}
          </h2>

          {/* Category */}
          <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
              {exam.title.split(" ")[0]}
            </span>

            {exam.isPopular && (
              <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                <Star size={12} />
                Popular
              </span>
            )}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        className={`
          relative z-10 mt-6 grid gap-3
          ${view === "list" ? "grid-cols-2 w-80" : "grid-cols-2"}
        `}
      >
        <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
          <BookOpen className="mx-auto text-indigo-600 mb-2" size={20} />
          <p className="text-sm text-gray-500">Mock Tests</p>
          <h3 className="text-xl font-bold text-indigo-700">
            {mocks}
          </h3>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
          <FileText className="mx-auto text-blue-600 mb-2" size={20} />
          <p className="text-sm text-gray-500">PYP Papers</p>
          <h3 className="text-xl font-bold text-blue-700">
            {pyp}
          </h3>
        </div>
      </div>

      {/* BUTTONS */}
      <div
        className={`
          relative z-10 mt-6 flex gap-3
          ${view === "list" ? "w-80" : ""}
        `}
      >
        <button
          onClick={handleNavigate}
          className="
            flex-1 bg-indigo-600 hover:bg-indigo-700
            text-white py-3 rounded-2xl font-semibold
            transition-all duration-300 shadow-md
            hover:shadow-indigo-200
          "
        >
          View Tests
        </button>

        <button
          className="
            flex-1 bg-gray-100 hover:bg-gray-200
            text-gray-700 py-3 rounded-2xl font-semibold
            transition-all duration-300
          "
        >
          Buy Now
        </button>
      </div>

      {/* Bottom Arrow */}
      <button
        onClick={handleNavigate}
        className="
          absolute top-5 right-5 w-10 h-10 rounded-full
          bg-white shadow border flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition duration-300
        "
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
});

/* =========================================================
   MAIN PAGE
========================================================= */

const AllExam = () => {
  const [groupedExams, setGroupedExams] = useState({});
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  useEffect(() => {
    fetchExams();
  }, []);

  /* =========================================================
     FETCH EXAMS
  ========================================================= */

  const fetchExams = async () => {
    try {
      setLoading(true);

      const res = await getExams();

      const exams = Array.isArray(res.data)
        ? res.data
        : [];

      /* GROUP EXAMS */
      const grouped = exams.reduce((acc, exam) => {
        const category =
          exam.title?.split(" ")[0] || "Others";

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(exam);

        return acc;
      }, {});

      setGroupedExams(grouped);

      /* FETCH COUNTS PARALLEL */
      const countResults = await Promise.allSettled(
        exams.map(async (exam) => {
          try {
            const [seriesRes, pypRes] = await Promise.all([
              getTestSeriesByExam(exam.slug),
              getPYPByExam(exam.slug),
            ]);

            const series = seriesRes.data || [];

            const testPromises = series.map((s) =>
              getTestsBySeries(s._id)
            );

            const testRes = await Promise.allSettled(
              testPromises
            );

            let totalMocks = 0;

            testRes.forEach((r) => {
              if (r.status === "fulfilled") {
                totalMocks += r.value.data?.length || 0;
              }
            });

            return {
              slug: exam.slug,
              mocks: totalMocks,
              pyp: pypRes.data?.length || 0,
            };
          } catch {
            return {
              slug: exam.slug,
              mocks: 0,
              pyp: 0,
            };
          }
        })
      );

      const map = {};

      countResults.forEach((r) => {
        if (r.status === "fulfilled") {
          map[r.value.slug] = {
            mocks: r.value.mocks,
            pyp: r.value.pyp,
          };
        }
      });

      setCounts(map);
    } catch (err) {
      console.error("Exam Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FILTERED EXAMS
  ========================================================= */

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groupedExams;

    const result = {};

    Object.keys(groupedExams).forEach((category) => {
      const filtered = groupedExams[category].filter(
        (exam) =>
          exam.title
            .toLowerCase()
            .includes(search.toLowerCase())
      );

      if (filtered.length > 0) {
        result[category] = filtered;
      }
    });

    return result;
  }, [groupedExams, search]);

  /* =========================================================
     LOADING SKELETON
  ========================================================= */

  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl p-5 shadow animate-pulse">
      <div className="w-20 h-20 rounded-2xl bg-gray-200 mx-auto mb-4" />

      <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3" />

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="h-20 rounded-2xl bg-gray-200" />
        <div className="h-20 rounded-2xl bg-gray-200" />
      </div>

      <div className="flex gap-3 mt-6">
        <div className="h-12 flex-1 rounded-2xl bg-gray-200" />
        <div className="h-12 flex-1 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl font-extrabold">
            RankPulse Test Series
          </h1>

          <p className="mt-5 text-lg text-indigo-100 max-w-2xl mx-auto">
            Practice with real exam-level mock tests,
            previous year papers, quizzes, and complete
            analysis.
          </p>

          {/* SEARCH */}
          <div className="max-w-2xl mx-auto mt-8 relative">
            <Search
              size={20}
              className="absolute left-5 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full pl-14 pr-4 py-4 rounded-2xl
                text-gray-700 outline-none shadow-xl
              "
            />
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-4 items-center">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            All Exams
          </h2>

          <p className="text-gray-500 mt-1">
            Explore all available exam categories
          </p>
        </div>

        {/* VIEW TOGGLE */}
        <div className="flex bg-white rounded-2xl shadow border overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`
              px-5 py-3 flex items-center gap-2
              ${
                view === "grid"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }
            `}
          >
            <Grid3X3 size={18} />
            Grid
          </button>

          <button
            onClick={() => setView("list")}
            className={`
              px-5 py-3 flex items-center gap-2
              ${
                view === "list"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }
            `}
          >
            <LayoutGrid size={18} />
            List
          </button>
        </div>
      </div>

      {/* EXAMS */}
      <div className="max-w-7xl mx-auto px-6 pb-16">

        {loading ? (
          <div
            className={`
              grid gap-6
              ${
                view === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1"
              }
            `}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : Object.keys(filteredGroups).length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow">
            <h3 className="text-2xl font-bold text-gray-700">
              No Exams Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching another keyword.
            </p>
          </div>
        ) : (
          Object.keys(filteredGroups).map((category) => (
            <div key={category} className="mb-14">

              {/* CATEGORY */}
              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {category}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {filteredGroups[category].length} Exams
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold">
                  Explore
                  <ArrowRight size={18} />
                </div>
              </div>

              {/* GRID/LIST */}
              <div
                className={`
                  grid gap-6
                  ${
                    view === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-1"
                  }
                `}
              >
                {filteredGroups[category].map((exam) => {
                  const data = counts[exam.slug] || {
                    mocks: 0,
                    pyp: 0,
                  };

                  return (
                    <ExamCard
                      key={exam._id}
                      exam={exam}
                      mocks={data.mocks}
                      pyp={data.pyp}
                      view={view}
                    />
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllExam;