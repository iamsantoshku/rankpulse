// import { useEffect, useState } from "react";

// import { getExams }
// from "../../services/test.service";

// import { useNavigate } from "react-router-dom";

// const StudyNotesPage = () => {

//   const [exams, setExams] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     const res = await getExams();
//     setExams(res.data);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <h1 className="text-5xl font-bold text-center mb-4">
//         Access all Exam Study Notes
//       </h1>

//       <div className="flex justify-center gap-8 mb-14 mt-6">

//         <div>✅ Created by Toppers</div>
//         <div>✅ Vetted by Experts</div>
//         <div>✅ Includes all Exams</div>

//       </div>

//       <h2 className="text-3xl font-bold text-center mb-10">
//         Select Your Exam
//       </h2>

//       <div className="grid grid-cols-4 gap-6">

//         {exams.map((exam) => (

//           <div
//             key={exam._id}
//             onClick={() =>
//               navigate(`/study-notes/${exam._id}`)
//             }
//             className="bg-white p-5 rounded-2xl shadow hover:shadow-xl cursor-pointer flex items-center justify-between"
//           >

//             <div className="flex items-center gap-3">

//               <img
//                 src={exam.logo}
//                 className="w-12 h-12 rounded-full object-cover"
//               />

//               <p className="font-bold">
//                 {exam.title}
//               </p>

//             </div>

//             <span>➜</span>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudyNotesPage;



import { useEffect, useState } from "react";
import { getExams } from "../../services/test.service";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  GraduationCap,
  ChevronRight,
  Search,
  Sparkles
} from "lucide-react";

const StudyNotesPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredExams(exams);
    } else {
      const filtered = exams.filter((exam) =>
        exam.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

      setFilteredExams(filtered);
    }
  }, [search, exams]);

  const fetchExams = async () => {
    try {
      setLoading(true);

      const res = await getExams();

      setExams(res.data || []);
      setFilteredExams(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const FeatureCard = ({ icon, title, subtitle }) => {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
          {icon}
        </div>

        <h3 className="font-bold text-lg text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white py-16 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <div className="flex justify-center mb-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <BookOpen size={40} />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Study Notes for Every Exam
          </h1>

          <p className="mt-5 text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
            Access handwritten notes, topper notes, PDFs,
            formulas, shortcuts and complete study materials
            for all competitive examinations.
          </p>

          {/* SEARCH */}
          <div className="max-w-2xl mx-auto mt-10 relative">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />

            <input
              type="text"
              placeholder="Search exam notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-black text-lg outline-none shadow-lg"
            />

          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <FeatureCard
            icon={<GraduationCap className="text-indigo-600" />}
            title="Created by Toppers"
            subtitle="Detailed notes prepared by successful aspirants."
          />

          <FeatureCard
            icon={<Sparkles className="text-yellow-500" />}
            title="Expert Verified"
            subtitle="Every note is checked and verified by mentors."
          />

          <FeatureCard
            icon={<FileText className="text-green-600" />}
            title="PDF Notes"
            subtitle="Downloadable high-quality PDFs for revision."
          />

        </div>
      </div>

      {/* EXAMS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Select Your Exam
            </h2>

            <p className="text-gray-500 mt-2">
              Choose your exam and access subject-wise notes.
            </p>
          </div>

          <div className="bg-white px-5 py-3 rounded-xl shadow border text-sm font-medium">
            Total Exams:{" "}
            <span className="text-indigo-600 font-bold">
              {filteredExams.length}
            </span>
          </div>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center py-20">

            <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

          </div>
        ) : filteredExams.length === 0 ? (

          <div className="bg-white rounded-3xl shadow p-16 text-center">

            <BookOpen
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-2xl font-bold text-gray-700">
              No Exams Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {filteredExams.map((exam) => (

              <div
                key={exam._id}
                onClick={() =>
                  navigate(`/study-notes/${exam._id}`)
                }
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
              >

                {/* TOP */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 flex justify-center">

                  <div className="bg-white rounded-2xl shadow p-4">

                    <img
                      src={
                        exam.logo ||
                        "https://via.placeholder.com/80"
                      }
                      alt={exam.title}
                      className="w-20 h-20 object-contain"
                    />

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-2">
                    <BookOpen size={16} />
                    Study Material
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-[60px]">
                    {exam.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Subject-wise notes, formulas, revision PDFs
                    and practice materials.
                  </p>

                  {/* BUTTON */}
                  <button
                    className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                  >
                    View Notes
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-all"
                    />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* BOTTOM SECTION */}
      <div className="bg-white border-t py-14 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            One Platform for Complete Preparation
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Notes + Mock Tests + PYQs + Daily Quiz +
            Current Affairs — Everything in one place.
          </p>

          <button
            onClick={() => navigate("/exams")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all"
          >
            Explore Test Series
          </button>

        </div>

      </div>

    </div>
  );
};

export default StudyNotesPage;